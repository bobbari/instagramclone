const express = require("express");

const mongoose = require("mongoose");
//schema
//user schema
const userSchema = require("./model/user.schema");
// post schema
const postsSchema = require("./model/post.schema");
const multer = require("multer");

const app = express();
// dotenv
require("dotenv").config();

// mongodb connection url
const mongodburl = require("./config/dbconfig");
// route
const postRoute = require("./routes/post");
//auth
const auth = require("./routes/auth");
// cors
const cors = require("cors");
// bodyparsing
const bodyParser = require("body-parser");

//mongodb connection with mongoos
mongoose
  .connect(mongodburl, {
    auth: { authdb: "admin" },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    createIndexes: true,
  })
  .then((data) => {
    console.log("mongodb connected ");
  })
  .catch((err) => {
    console.log("error ", err);
  });
const mongoConnection = mongoose.connection;
mongoConnection.on("connected", () => {
  console.log("database connection establised");
});
mongoConnection.on("error", (err) => {
  console.log("error ", err);
});
// for debug mongodb
// mongoose.set('debug', true);

// cors
app.use(cors());

// middleware for bodyparsing
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// for parsing multipart/form-data
const upload = multer({ dest: "uploads/" });

// app.use(upload.array());

// configure the app to use bodyParser()
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("./uploads"));

app.use("/api/v1/auth", auth);
app.use("/api/v1/post", postRoute);

app.listen("5000", () => {
  console.log("app is listing on 5000");
});

//db.createUser({user:"mahi", pwd:"mahi", roles:["readWrite", "dbAdmin"]})
