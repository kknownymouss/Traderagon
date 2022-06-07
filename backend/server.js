const path = require('path')
const express = require('express')
const colors = require("colors")
const dotenv = require('dotenv').config()
const connectDB = require("./config/db")

// set port
const PORT = process.env.PORT || 5000

// connect db
connectDB()

// init express app
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : false}))

// start listening on the server
app.listen(PORT, () => console.log("server started here"))

// set routes files 
app.use("/api/user", require("./routes/userRoutes"))
app.use("/api/wallet", require("./routes/walletRoutes"))

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      )
    )
  } else {
    app.get('/', (req, res) => res.send('Please set to production'))
  }