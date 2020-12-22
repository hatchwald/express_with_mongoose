const mongoose = require("mongoose");
import bcrypt from "bcrypt"
const SALT_WORK_FACTOR = 10;
const user_format = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

user_format.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, SALT_WORK_FACTOR, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next()
    })
    // bcrypt.genSalt(SALT_WORK_FACTOR, (err, hash) => {
    //     if (err) return next(err);
    //     user.password = hash;
    //     next();
    // })
})

user_format.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        // console.log(isMatch);
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
const User = mongoose.model(
    "User", user_format
);

module.exports = User;