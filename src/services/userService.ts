import Users from "../models/userModel";
import Bun from 'bun';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "default"
// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authenticateUser = async (email: string, password: string) => {
    // console.log(email)
    const user: any = await Users.findOne({ email })
    // console.log(user)
    if (!user) {
        throw new Error('User not found')
    }
    const isMatch = await Bun.password.verify(password, user.password);

    if (!isMatch) {
        // await user.incrementLoginAttempts();
        // await delay(user.loginAttempts * 1000);
        throw new Error('Unauthorized')
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' })
    return { user, token }
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
    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    return { user, token };
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