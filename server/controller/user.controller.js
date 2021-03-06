const mongoose = require("mongoose");
//constents
const configConstants = require("../config/constents");

// user schema
const User = mongoose.model(configConstants.user);
// bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;
// jwt token
const jwt = require("jsonwebtoken");

//const privateKey = "thisissecret";
// const privatekey = require("../config/constents");

//validation
const {
  signupValidation,
  signinValidation,
} = require("../validations/user.validation");

// const signinValidation = require("../validations/user.validation");

//middleware

const requireLogin = require("../middlewire/requiredLogin");

// multer

const multer = require("multer");

const upload = multer();

// signup
const signupController = (req, resp, next) => {
  const { name, email, password } = req.body;
  try {
    const { error } = signupValidation(req.body);
    //if (!name || !email || !password) {
    if (error) {
      return resp.status(400).json({ error: error.details[0].message });
    } else {
      User.findOne({ email: email })
        .then((userData) => {
          //console.log("user", userData);
          if (userData) {
            return resp.status(422).json({ message: "user already exist" });
          }
          bcrypt.hash(password, saltRounds, (err, hashPassword) => {
            if (err) {
              return resp.status(422).json({ error: err });
            }
            const user = new User({ name, email, password: hashPassword });

            try {
              user
                .save()
                .then((saveData) => {
                  if (saveData) {
                    resp.json({ message: "user created successfully" });
                  }
                })
                .catch((error) => {
                  console.log("error", error);
                  return resp.status(422).json({ error: error.message });
                });
            } catch (error) {
              console.log("ERROR", error);
            }
          });
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  } catch (error) {
    if (error) {
      console.log("error ", error);
    }
  }
};

// signin
const signInController = (req, resp, next) => {
  const { email, password } = req.body;
  const { error } = signinValidation(req.body);
  if (error) {
    resp.status(422).json({ error: error.details[0].message });
  } else {
    User.findOne({ email })
      .then((userData) => {
        if (userData) {
          bcrypt
            .compare(password, userData.password)
            .then((data) => {
              if (data) {
                userData.password = undefined;
                const token = jwt.sign(
                  { user: userData },
                  configConstants.privateKey
                );
                resp.json({
                  message: "user login successfully",
                  token: token,
                  user: userData,
                });
              } else {
                resp
                  .status(403)
                  .json({ message: "Please check your password" });
              }
            })
            .catch((error) => {
              console.log("error ", error);
            });
        } else {
          resp.status(403).json({ message: "Please check your email" });
        }
      })
      .catch((error) => {
        console.log("error ", error);
      });
    //resp.json({ email, password });
  }
};

// private routes
const privateRoute = (req, resp, next) => {
  const tokenData = req.tokenData._id;
  const id = tokenData;
  User.findById(id)
    .then((userData) => {
      userData.password = undefined;
      userData.__v = undefined;
      resp.status(200).json({ data: userData });
    })
    .catch((error) => {
      console.log(error);
    });
};

const uploadImage = (req, resp, next) => {
  console.log("file req", req.file);
  resp.json({ message: "this is uploadImage" });
};

module.exports = {
  signupController,
  signInController,
  privateRoute,
  uploadImage,
};
