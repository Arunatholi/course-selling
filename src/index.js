const express = require('express')
const app = express()
const connectDB = require('../config/db.js')

const userRouter = require("../routes/index.js");
const cookieParser = require('cookie-parser');
const port = 3000;

app.use(express.json())
app.use(cookieParser())
app.use("/api/v1", userRouter)

connectDB()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})