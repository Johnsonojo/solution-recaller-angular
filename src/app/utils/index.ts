/* tslint:disable */
// @ts-nocheck
import CryptoJs from 'crypto-js';
import { environment } from 'src/environments/environment';

// encryption secret key, ideally should be an environment variable
const secret = environment.APP_SECRET;

// expiry duration in milliseconds, ensure you calculate the expiry in milliseconds
const expiryDuration = environment.APP_EXPIRY_DURATION;

// encrypt data
export const encrypt = (dataToEncrypt: any) => {
  if (dataToEncrypt !== null) {
    return CryptoJs.AES.encrypt(
      JSON.stringify(dataToEncrypt),
      secret
    ).toString();
  }
  return null;
};

// decrypt encrypted data
export const decrypt = (dataToDecrypt: any) => {
  try {
    if (dataToDecrypt !== null && dataToDecrypt !== 'null') {
      let bytes = CryptoJs.AES.decrypt(dataToDecrypt.toString(), secret);
      let decrypted = bytes.toString(CryptoJs.enc.Utf8);
      return JSON.parse(decrypted);
    }
    return null;
  } catch (error) {
    return null;
  }
};

// store in localStorage
export const setToStorage = (key: string, value: any) => {
  return localStorage.setItem(key, value);
};

// read from localStorage
export const getFromStorage = (key: string) => {
  return localStorage.getItem(key);
};

// get new expiry
export const getExpiry = () => {
  return new Date().getTime() + expiryDuration;
};

// check if expired
export const isExpired = (expiry: any) => {
  return new Date().getTime() > parseInt(expiry, 10);
};

// Encrypt and store with time expiry functionality
export const storeExpiry = (key: any, value: any, expiry = false) => {
  const encryptedData = encrypt(value);
  if (expiry === true) {
    const encryptedExpiry = encrypt(getExpiry());
    setToStorage(`${key}.e`, encryptedExpiry);
  }
  return setToStorage(key, encryptedData);
};

// decrypt and read with time expiry functionality
export const readExpiry = (key: any) => {
  const expiryData = decrypt(getFromStorage(`${key}.e`));
  const data = decrypt(getFromStorage(key));
  if (data != null) {
    if (data && isExpired(expiryData)) {
      return { response: data, expired: true };
    }
    if (data && !isExpired(expiryData)) {
      return { response: data, expired: false };
    }
  }
  return { response: null, expired: true };
};

// reset localStorage
export const clearStorage = () => {
  localStorage.clear();
  return null;
};

export const getAuthToken = () => {
  const decryptedData = decrypt(getFromStorage('session'));
  return decryptedData?.accessToken;
};

export const getRefreshToken = () => {
  const decryptedData = decrypt(getFromStorage('session'));
  return decryptedData?.refreshToken;
};

/* tslint:enable */
