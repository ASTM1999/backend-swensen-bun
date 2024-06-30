import express, { Request, Response, NextFunction } from 'express';
import { decryptData } from '../utils/encryption';


const app = express();
app.use(express.json())

export const decryptInput = (req: any, res: Response, next: NextFunction) => {
    
    try {
        // console.log(req.body.data)
        const decryptedData = JSON.parse(decryptData(req.body.data));
        // console.log("decryptInput", decryptedData)
        req.body = decryptedData;
        // console.log(req.body)
        next();
    } catch (error) {
        // console.log(error)
        return res.status(400).json({ message: 'Invalid encrypted data' });
    }
};
