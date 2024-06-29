import { Schema, model } from "mongoose";

const userSchema = new Schema({
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    gender: { type: String, require: true },
    birthdate: { type: String, require: true },
})

const Users = model('Users', userSchema);

export default Users;