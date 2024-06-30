import { NextFunction, Request, Response } from 'express';
import * as UserService from "../services/userService"
import { encryptData } from '../utils/encryption';


export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log("loginUser")
    try {
        req.body.email = req.body.email?.toLowerCase();
        // console.log(req.body.email)
        const { user, token } = await UserService.authenticateUser(req.body.email, req.body.password);
        // console.log("login")
        const encryptedResponse = encryptData(JSON.stringify({ message: "Login successful", user, token }));
        res.status(200).json({ data: encryptedResponse });
    } catch (error: any) {
        if (error.message === 'User not found' || error.message === 'Unauthorized')
            res.status(401).json({ message: error.message });
        else {
            next(error);
        }
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    try {
        console.log(req.body)
        req.body.email = req.body.email?.toLowerCase();

        const user = await UserService.createUser(req.body);
        res.status(201).json(user)
    } catch (error: any) {
        console.error("Error creating user:", error);
        next(error)
    }
}

export const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allUser = await UserService.getAllUser()
        res.status(200).json(allUser);
    } catch (error: any) {
        next(error);
    }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.getUserById(req.params.id);
        res.status(200).json(user)
    } catch (error: any) {
        next(error);
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.updateUser(req.params.id, req.body);
        if (!user) {
            res.status(404).json({ message: `User Not found` });
        }
        else {
            res.status(200).json(user)
        }
        res.status(200).json(user)
    } catch (error: any) {
        next(error);
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.deleteUser(req.params.id)
        if (!user) {
            res.status(404).json({ message: `User id: ${req.params.id} Not found` })
        } else {
            res.status(200).json({ message: `User id: ${req.params.id} Deleted` })
        }
    } catch (error: any) {
        next(error);
    }
}