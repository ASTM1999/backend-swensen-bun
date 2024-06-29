
import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'


const userSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    gender: Joi.string().required(),
    birthdate: Joi.string().required(),
})


export const validateUser = (req: Request, res: Response, next: NextFunction) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    next();
};

