const { comparePassword } = require("../helper/bcrypt");
const { signToken } = require("../helper/jwt");
const { sequelize } = require("../models");
const geolib = require("geolib");

const { User, Order, OrderDetail, Review } = require("../models");

const { OAuth2Client } = require("google-auth-library");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber } = req.body;
      const createUser = await User.create({
        username,
        email,
        password,
        phoneNumber,
      });
      res.status(201).json({
        message: `user with id ${createUser.id} and email ${createUser.email} has been created`,
      });
      // console.log(createUser, "<<<")
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "Invalid email/password" };
      }
      const user = await User.findOne({ where: { email } });

      if (!user) {
        res.status(401).json({ message: "InvalidToken" });
        return;
      }
      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) {
        res.status(401).json({
          message: "InvalidToken",
        }); // ini juga
        return;
      }
      const access_token = signToken({
        id: user.id,
        email: user.email,
      });
      // console.log(access_token, "<<<<fyfy");
      res.json({
        access_token,
        email,
      });
    } catch (error) {
      next(error);
      console.log(error, "<<err");
    }
  }

  static async loginGoogle(req, res, next) {
    try {
      const googleToken = req.headers.google_token;
      console.log(req.headers, "<<<<<");
      const client = new OAuth2Client(process.env.CLIENTID);
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.CLIENTID,
      });
      const payload = ticket.getPayload();
      const userid = payload["sub"];
      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          username: payload.name,
          password: "deacantik",
          phoneNumber: "12345",
          address: "jl.dea",
        },
        hooks: false,
      });
      const access_token = signToken({
        id: user.id,
        email: user.email,
      });
      res.json({ access_token });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static async review(req, res, next) {
    try {
      // console.log(req.user.dataValues.id);
      const user = req.user.dataValues.id;
      const { id } = req.params;
      const { review, rating } = req.body;

      // console.log(user, id, review, rating, `<<<<<<`);

      const postReview = await Review.create({
        userId: user,
        partnerId: id,
        review,
        rating,
      });
      res.status(200).json({ postReview });
    } catch (err) {
      // next(err)
      console.log(err);
    }
  }

  static async createOrder(req, res, next) {
    try {
      const { problem, lat, lng, car, carType, license } = req.body;
      const geojson = {
        type: "Point",
        coordinates: [lng, lat],
      };
      const toString = JSON.stringify(geojson);
      const response = Order.create({
        problem,
        location: toString,
        car,
        carType,
        userId: 2,
        license,
      });
      res.status(201).json(response);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getOrderAll(req, res, next) {
    try {
      const response = await Order.findAll();
      console.log(response);
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
    }
  }

  static async getOrderDetail(req, res, next) {
    try {
      const { id } = req.params;
      const response = await OrderDetail.findByPk(id);
      console.log(response);
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async findStoresByRadius(req, res, next) {
    try {
      // distance on meter unit
      const distance = req.query.distance || 10000000;
      const long = req.query.long || "-6.9439994342171225";
      const lat = req.query.lat || "107.5904275402039";

      let result = await sequelize.query(
        `select
        id,
        location
      from
        "Partners"
      where
        ST_DWithin(location,
        ST_MakePoint(:lat,
        :long),
        :distance,
      true) = true;`,
        {
          replacements: {
            distance: +distance,
            long: parseFloat(long),
            lat: parseFloat(lat),
          },
          logging: console.log,
          plain: false,
          raw: false,
          type: sequelize.QueryTypes.SELECT,
        }
      );
      console.log(result);

      const newResult = result.map((el) => {
        return {
          ...el,
          distance: geolib.getDistance(
            { latitude: lat, longitude: long },
            {
              latitude: el.location.coordinates[0],
              longitude: el.location.coordinates[1],
            }
          ),
        };
      });

      
      res.status(200).json(newResult);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}

module.exports = UserController;
