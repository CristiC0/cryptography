import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OperationsService {
  constructor() {}

  hexEncode(string: string) {
    let completeHex = '';
    const result = [];

    for (let i = 0; i < string.length; i++) {
      completeHex = '';
      let hex = string.charCodeAt(i).toString(16);
      completeHex += ('0' + hex).slice(-2) + ' ';
      result.push(completeHex);
    }
    return result;
  }

  hex2Text(hex: string) {
    return String.fromCharCode(parseInt(hex, 16));
  }

  hex2bin(hex: string) {
    return parseInt(hex, 16).toString(2).padStart(8, '0');
  }

  bin2hex(bin: string) {
    return parseInt(bin, 2).toString(16).padStart(2, '0');
  }

  XOR(first: string, second: string) {
    first = this.hex2bin(first);
    second = this.hex2bin(second);
    return this.bin2hex(
      first
        .split('')
        .map((bit, index) => (bit === second[index] ? '0' : '1'))
        .join('')
    );
  }

  galoisMult(hex1: string, hex2: string) {
    let x = parseInt(hex1, 16);
    let y = parseInt(hex2, 16);
    let result = 0;
    while (y > 0) {
      if (y & 1) {
        result ^= x;
      }
      x <<= 1;
      if (x & 0x100) {
        x ^= 0x11b;
      }
      y >>= 1;
    }
    return result.toString(16).padStart(2, '0');
  }
}
