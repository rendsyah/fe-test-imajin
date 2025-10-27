import CryptoJS from 'crypto-js';
import { App } from '../constants/app.const';

export const encode = (data: string) => {
  const cipherValue = typeof data === 'string' ? data : JSON.stringify(data);
  const ciphertext = CryptoJS.AES.encrypt(cipherValue, App.SIGN_SECRET).toString();
  return ciphertext;
};

export const decode = (data: string) => {
  const decipherBytes = CryptoJS.AES.decrypt(data, App.SIGN_SECRET);
  const decipherText = decipherBytes.toString(CryptoJS.enc.Utf8);
  try {
    return JSON.parse(decipherText);
  } catch {
    return decipherText;
  }
};
