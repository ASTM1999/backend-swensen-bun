import Users from "../models/userModel";
import Bun from 'bun';


export const authenticateUser = async (email: string, password: string) => {
    const user = await Users.findOne({ email })
    // console.log(user)
    // console.log(password)
    // console.log(user.password)
    if (!user) {
        throw new Error('User not found')
    }
    const isMatch = await Bun.password.verify(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials')
    }
    return user
}

export const createUser = async (data: any) => {
    // console.log(data.email)
    const findUser = await Users.findOne({ email: data.email })
    if (findUser) {
        throw new Error('This email is already in use')
    }

    const hashedPassword = await Bun.password.hash(data.password, {
        algorithm: "argon2d",
        memoryCost: 4,
        timeCost: 5,
    })
    // console.log(hashedPassword)
    const user = new Users({ ...data, password: hashedPassword });
    return await user.save();
}

export const getAllUser = async () => {
    return await Users.find({});
}

export const getUserById = async (id: string) => {
    return await Users.findById(id);
}

export const updateUser = async (id: string, data: any) => {
    if (data.password) {
        data.password = await Bun.password.hash(data.password, {
            algorithm: "argon2d",
            memoryCost: 4,
            timeCost: 5,
        })
    }
    return await Users.findByIdAndUpdate(id, data, { new: true });
}

export const deleteUser = async (id: string) => {
    return await Users.findByIdAndDelete(id)
}