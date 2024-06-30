import { body } from 'express-validator';

export const sanitizeUser = [
    body('firstname').trim().escape(),
    body('lastname').trim().escape(),
    body('phonenumber').trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }).escape(),
    body('gender').trim().escape(),
    body('birthdate').trim().escape(),
    body('promotions').toBoolean(),
    body('terms').toBoolean(),
];

export const sanitizeProduct = [
    body('name').trim().escape(),
    body('price').isFloat({ min: 0 }).toFloat(),
    body('description').trim().escape(),
    body('image').trim().escape(),
    body('stock').isInt({ min: 0 }).toInt(),
    body('category').trim().escape()
];
