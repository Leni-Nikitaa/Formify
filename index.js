var express = require("express");
var bodyParser = require("body-parser");
var mongoose = "mongoose";
const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParse.urlencoded({
    extedned: true,
  })
);
mongoose.connect("");
app
  .get("/", (req, res) => {
    res.set({ "Allow-acces-Allow-Oeigin": "*" });
  })
  .listen(3000);
console.log("Listening on port 3000");
