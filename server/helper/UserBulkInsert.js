const { User, Partner } = require('../models')
const { hashPassword } = require('./bcrypt')

async function bulkInsertCust() {

    await User.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true
    })

    return await User.create(
        {
            username: "deaimut",
            email: "deacantik@gmail.com",
            password: "inidea",
            phoneNumber: "081122333"
        }
    )
}

module.exports = bulkInsertCust