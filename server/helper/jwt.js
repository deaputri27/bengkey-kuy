const jwt = require('jsonwebtoken');
const { error } = require('../utils/response/json.utils');

module.exports = {
    verifyToken: async (req, res, next) => {
        const authHeaders = req.headers['authorization'];
        const token = authHeaders && authHeaders.split(' ')[1];

        jwt.verify(token, process.env.SECRET || 'secret', (err, user) => {
            if (err) {
                return error(res, 401, 'unauthorized', err);
            }

            req.user = user;
            next();
        });
    },
    signToken: async (req, res, next) => {
        return jwt.sign(data, SECRET)
    }
};