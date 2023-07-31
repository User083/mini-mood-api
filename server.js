require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")

// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
// const db = mongoose.connection

// db.on("error", (error)=> console.error(error))
app.use(express.json())

const port = 8000;

app.listen(port, ()=> console.log("Server running on http://localhost:" + port)) 