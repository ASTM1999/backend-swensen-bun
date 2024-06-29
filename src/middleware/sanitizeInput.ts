import { body } from 'express-validator';

export const sanitizeUser = [
    body('firstname').trim().escape(),
    body('lastname').trim().escape(),
    body('phoneNumber').trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }).escape(),
    body('gender').trim().escape(),
    body('birthdate').trim().escape(),
]

export const sanitizeProduct = [
    
]