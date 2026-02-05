const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function base62Encode(num: number): string {
  let s = '';
  while (num > 0) {
    s = ALPHABET[num % 62] + s;
    num = Math.floor(num / 62);
  }
  return s || '0';
}