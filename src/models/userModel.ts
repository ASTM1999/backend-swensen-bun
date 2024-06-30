import { Schema, model } from "mongoose";

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 2 * 60 * 60 * 1000; // 2 hours

const userSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phonenumber: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    birthdate: { type: String, required: true },
    promotions: { type: Boolean, required: true },
    terms: { type: Boolean, required: true },
    // loginAttempts: { type: Number, required: true, default: 0 },
    // lockUntil: { type: Date }
});

// userSchema.methods.incrementLoginAttempts = function (callback: any) {
//     if (this.lockUntil && this.lockUntil < new Date()) {
//         return this.updateOne({ $set: { loginAttempts: 1 }, $unset: { lockUntil: 1 } }, callback);
//     }
//     // Otherwise we're incrementing
//     const updates: any = { $inc: { loginAttempts: 1 } };
//     if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
//         updates.$set = { lockUntil: new Date(Date.now() + LOCK_TIME) };
//     }
//     return this.updateOne(updates, callback);
// };

// userSchema.virtual('isLocked').get(function () {
//     return !!(this.lockUntil && this.lockUntil > new Date());
// });

const Users = model('Users', userSchema);

export default Users;
