require('./database/database')
const express  = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')

const app = express()
app.use(cors())
app.use(bodyParser())

app.use('/', authRoutes)
app.get('/', (req, res) => {
    res.send("Welcome")
})

app.listen(3000, ()=> {
    console.log("Server is running at 4000")
})