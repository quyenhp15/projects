const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

//Face recognition
const cors = require('cors')
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));
const mongoose = require('mongoose')


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//connect mongoDB
require('dotenv').config
try {
  mongoose.connect("mongodb+srv://User:user@cluster0.dqtd4et.mongodb.net/user?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Database connected"))
} catch (error) {
  console.log("Could not connect database. Error: ", error)
}

app.use('/user', require('./routes/user.js'))
app.use('/books', require('./routes/books'))


app.use('/api/dialogflow', require('./routes/dialogflow'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});
