const { Product, OrderDetail, User } = require("../models")

class PartControllers {
    static register(req, res, next) {
        try {

        } catch (error) {
            next(error);
            console.log(error);
        }
    }

    static login(req, res, next) {
        try {

        } catch (error) {
            next(error);
            console.log(error);
        }
    }

    static loginGoogle(req, res, next) {
        try {

        } catch (error) {
            next(error);
            console.log(error);
        }
    }

    static async createOrderDetail(req, res, next) {
        try {
            const { productId } = req.params
            const products = await Product.findByPk(productId)
            if (!products) {
                throw { name: "NotFound" }
            }

            const findUser = await User.findByPk(req.user.id)
            // console.log(findUser, ">>>>>>>>>>>>>>>>");

            const myProduct = await OrderDetail.create({
                orderId: 1,
                productId: productId,
                quantity: req.body.quantity
            })

            res.status(201).json({
                id: myProduct.id,
                orderId: myProduct.orderId,
                productId: myProduct.productId,
                quantity: myProduct.quantity
            })

        } catch (error) {
            console.log(error);
            if (error.name === "NotFound") {
                res.status(404).json({ message: "Product not found" })
            } else {
                res.status(500).json({ message: "Internal server error" })
            }
        }
    }

    static async readOrderDetail(req, res, next) {
        try {
            const myProducts = await OrderDetail.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }, include: {
                    model: Product,
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt']
                    }
                },
                where: { orderId: 1 }
            })
            // console.log(myProducts, ".>>>>>>>>>>>>>>>>");
            res.status(200).json(myProducts)

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" })
        }
    }

}

module.exports = PartControllers