const express = require("express");
const mongoose = require("mongoose");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const path = require("path");
const config = require("./config.json");

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(config.mongodbConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function callback() {
  console.log("db connected...!");
  app.use("/api", require("./routes/index"));
});
db.on("disconnected", function() {
  console.log("db disconnected...!");
});

const allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(express.json());
app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(favicon(path.join(__dirname, "../", "favicon.ico")));
app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

module.exports = app;
