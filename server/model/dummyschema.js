var
Mongoose = require('mongoose'),
Bcrypt   = require('bcrypt'),
ObjectID = Mongoose.Schema.Types.ObjectId,

UserSchema = new Mongoose.Schema({
    active        : { type: Boolean, default: true },
    created       : { type: Date, required: true, default: Date.now },
    modified      : { type: Date, required: true, default: Date.now },
    createdBy     : { type: ObjectID, ref: 'User' },
    modifiedBy    : { type: ObjectID, ref: 'User' },
    email         : { type: String, required: true },
    salt          : { type: String },
    hash          : { type: String },
    session       : String,

    group         : { type: ObjectID, ref: 'Group', required: true },
    currentPlayer : { type: ObjectID, ref: 'Player' },

    validated     : { type: Boolean, default: false },
    ipAddress     : String,
    lastIp        : String,
    notes         : String
});

var _checkPassword = function (password) {  };

UserSchema.pre('validate', function (next) {
    if (this.password && !_checkPassword(this.password)) {
        this.invalidate('password', 'invalid', "Six character minimum, must contain at least one letter and one number or special character.");
    }
    next();
});
UserSchema.pre('save', function (next) {
    this.modified = Date.now();
    next();
});
UserSchema.virtual('password')
    .get(function () { return this._password; })
    .set(function (passwd) {
        this.salt = Bcrypt.genSaltSync(10);
        this._password = passwd;
        this.hash = Bcrypt.hashSync(passwd, this.salt);
    });

UserSchema.method('verifyPassword', function (password, done) {
    Bcrypt.compare(password, this.hash, done);
});
UserSchema.static('authenticate', function (email, password, done) {
    
});

module.exports = UserSchema;
