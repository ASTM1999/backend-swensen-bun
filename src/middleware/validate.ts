
import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().positive().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    stock: Joi.number().integer().min(0).required(),
    category: Joi.string().required(),
});



const userSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    phonenumber: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    gender: Joi.string().required(),
    birthdate: Joi.string().required(),
    promotions: Joi.boolean().required(),
    terms: Joi.boolean().required(),
});

export const validateProduct = (req: Request, res: Response, next: NextFunction) => {
    const { error } = productSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
    console.log(`Recieve data: ${JSON.stringify(req.body)}`);
    const { error } = userSchema.validate(req.body);
    if (error) {
        // console.log('Validation error:', error.details[0].message); 
        // console.log(error)
        return res.status(400).json({ message: error.details[0].message })
    }
    next();
};

