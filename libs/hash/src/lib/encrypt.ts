import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
const algorithm = 'aes-256-cbc'; //Using AES encryption
const key = randomBytes(32);
const iv = randomBytes(16);

export type EncryptedData = {
  iv: string;
  encryptedData: string;
};

//Encrypting text
export function encrypt(text: string): EncryptedData {
  let cipher = createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

// Decrypting text
export function decrypt(text: EncryptedData) {
  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  let decipher = createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
