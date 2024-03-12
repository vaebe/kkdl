import { AES, enc, mode, pad } from 'crypto-js'

/** 密钥 与后端保持一致 */
const key = enc.Utf8.parse('AD-PASSWORD-4567')

// 解密
export function Decrypt(word: string): string {
  if (!word)
    return word

  const decrypt = AES.decrypt(word, key, {
    iv: key,
    mode: mode.CBC,
    padding: pad.Pkcs7,
  })

  return decrypt.toString(enc.Utf8)
}

// 加密
export function Encrypt(word: string): string {
  if (!word)
    return word

  const encrypted = AES.encrypt(word, key, {
    iv: key,
    mode: mode.CBC,
    padding: pad.Pkcs7,
  })
  return encrypted.toString()
}
