const errorHandle = (err, req, res, next) => {
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({
            msg: err.errors[0].message
        })
    }else if (err.name === "Invalid email/password") {
        res.status(401).json({ message: "Invalid email/password" })
    } else if(err.name === "JsonWebTokenError"){
        res.status(401).json({message: "Invalid Token"})
    }else if (err.name === "InvalidToken") {
        res.status(401).json({ message: "Email or Password is invalid" })
    } else if (err.name === "Forbidden") {
        res.status(403).json({ message: "Forbidden" })
    } else if (err.name === "NotFound") {
        res.status(404).json({message: "NotFound"})
    } else if(err.name === "Product id Not found"){
        res.status(404).json({message: "Product or Customer id Not found"})
    } else if(err.name === "SequelizeForeignKeyConstraintError"){
        res.status(404).json({ message: "Not Found"})
    }else {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = errorHandle