import { Cipher } from "feistel-cipher";

const SOURCE = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const KEY = 'af18d94ce1b3ecbf3a1787ef362a8c3487779badf353c364324696b765d3fd63'
const ROUNDS = 10

const cipher = new Cipher(KEY, ROUNDS)

export function urlSuffixGen(id: number): string{
  const idString = id.toString();

  const obfuscated = cipher.encrypt(idString)
  const obfuscatedId = BigInt('0x' + obfuscated.toString('hex'));

  return base62Encode(obfuscatedId);
}

function base62Encode(num: bigint): string {
  let s = '';
  while (num > 0) {
    s = SOURCE[Number(num % 62n)] + s;
    num /= 62n;
  }
  return s || '0';
}