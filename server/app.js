require('dotenv').config()
var cors = require('cors')
const express = require('express')
const router = require('./routes');
const app = express()
const port = process.env.PORT || 3000
const partRoute = require('./routes/partRoute')
const userRoute = require('./routes/userRoute')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/part', partRoute)
app.use('/user', userRoute)
router.use(errorHandler)

app.listen(port, () => { console.log(`=== PUSYING PALA DEA ${port} KELILING ===`) })

module.exports = app