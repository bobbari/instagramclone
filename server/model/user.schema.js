const mongoose = require("mongoose");
const { Schema } = mongoose;
const dbmodel = require("../config/constents");
const objectID = mongoose.Schema.Types.ObjectId;
// bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    index: true,
    sparse: true,
  },
  password: {
    type: String,
    require: true,
    min: [4, "must be at least 4 characters"],
  },
  created: {
    type: String,
  },
});
userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(this.password, salt, null, (err, hash) => {
        if (err) {
          return next(err);
        }
        this.password = hash;
        return next(null, this);
      });
    });
  }
  return next(null, this);
});

mongoose.model(dbmodel.user, userSchema);
