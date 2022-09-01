"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_avatar_url: { type: String, required: false, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false,
    }
}, {
    versionKey: false,
    timestamps: true,
});
// it is called hook it run before saving in database
userSchema.pre("save", function (next) {
    // create and update
    if (!this.isModified("password"))
        return next();
    bcrypt_1.default.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        return next();
    });
});
userSchema.methods.checkpassword = function (password) {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.compare(password, this.password, function (err, same) {
            if (err)
                return reject(err);
            return resolve(same);
        });
    });
};
const Users = (0, mongoose_1.model)("user", userSchema);
exports.default = Users;
