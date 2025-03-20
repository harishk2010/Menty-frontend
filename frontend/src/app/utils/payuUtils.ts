import CryptoJS from 'crypto-js';

export const verifyPayUResponse = (data: { [key: string]: any }) => {
  const key = process.env.NEXT_PUBLIC_PAYU_KEY || 't4VOu4';
  const salt = process.env.NEXT_PUBLIC_PAYU_SALT || 'h1r2JIjnHkpgtJrfBkfqKOS02hi3B0UB';
  const { txnid, amount, productinfo, firstname, email, status, hash } = data;

  const hashString = `${salt}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
  const generatedHash = CryptoJS.SHA512(hashString).toString();

  return generatedHash === hash;
};