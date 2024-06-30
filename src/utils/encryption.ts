import CryptoJS from 'crypto-js';

// const ENCRYPTION_KEY = "3fTpeTLaDN73/4tBFmaPssoAPM9y+FtNV/TIF6vWefc="
const ENCRYPTION_KEY = Bun.env.ENCRYPTION_KEY || '';
const IV_LENGTH = 16;



export function encryptData(data: string): string {
    const iv = CryptoJS.lib.WordArray.random(IV_LENGTH);
    const encrypted = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY), {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Hex.stringify(iv) + ':' + encrypted.toString();
}

export function decryptData(data: string): string {
    try {
        // console.log("decryptData work");
        const parts = data.split(':');
        if (parts.length !== 2) {
            throw new Error('Invalid data format');
        }

        const iv = CryptoJS.enc.Hex.parse(parts[0]);
        const encryptedData = parts[1];

        const decrypted = CryptoJS.AES.decrypt(encryptedData, CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY), {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
        if (!decryptedText) {
            throw new Error('Decryption failed, no output');
        }

        // console.log("decrypted", decryptedText);
        return decryptedText;
    } catch (error) {
        // console.error('Error during decryption:', error);
        throw new Error('Decryption failed');
    }
}