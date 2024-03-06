var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
mongoose.connect("mongodb://127.0.0.1/Database");
var db = mongoose.connection;
db.on("error", () => console.log("Error in Connecting to Database"));
db.once("open", () => console.log("Connected to Database"));
app.post("/sign_up", async (req, res) => {
  try {
    var name = req.body.name;
    var age = req.body.age;
    var designation = req.body.designation;
    var email = req.body.email;
    var phno = req.body.phno;
    var gender = req.body.gender;
    var userId = req.body.userId;
    var password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    var data = {
      name: name,
      age: age,
      email: email,
      phno: phno,
      gender: gender,
      password: hashedPassword,
      userId: userId,
      designation: designation,
    };
    await db.collection("users").insertOne(data);
    console.log("Record Inserted Successfully");
    res.redirect("signup_successful.html");
  } catch (err) {
    console.error("Error inserting record:", err);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/", (req, res) => {
  res.set({
    "Allow-access-Allow-Origin": "*",
  });
  res.redirect("index.html");
});
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
