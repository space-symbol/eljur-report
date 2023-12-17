import CryptoJS from 'crypto-js'
export const encryptString = (message: string, secretKey: string) => {
  const encryptedMessage = CryptoJS.AES.encrypt(message, secretKey)
  return encryptedMessage.toString()
}

export const decryptString = (encryptedMessage: string, secretKey: string) => {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage, secretKey)
  return decryptedBytes.toString(CryptoJS.enc.Utf8)
}
