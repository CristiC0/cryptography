import { Injectable } from '@angular/core';
import * as math from 'mathjs';

function modInverse(a: bigint, m: bigint) {
  for (let x = 1n; x < m; x++) if (((a % m) * (x % m)) % m == 1n) return x;
  return 0n;
}

export type ChaumVariables = {
  q: number;
  a: number;
  alfa: number;
  e1: number;
  e2: number;
};

@Injectable({
  providedIn: 'root',
})
export class ChaumService {
  constructor() {}

  ChaumSignature = (plainText: string, chaumVariables: ChaumVariables) => {
    const a = BigInt(chaumVariables.a);
    const alfa = BigInt(chaumVariables.alfa);
    const q = BigInt(chaumVariables.q);
    const e1 = BigInt(chaumVariables.e1);
    const e2 = BigInt(chaumVariables.e2);

    const p = 2n * q + 1n;
    const beta = alfa ** a % p;

    const x = BigInt(parseInt(plainText));
    const y = x ** a % p;

    const c = (y ** e1 * beta ** e2) % p;

    const d1 = c ** modInverse(a, q) % p;
    const d2 = (x ** e1 * alfa ** e2) % p;

    const result = {
      p,
      alfa,
      a,
      x,
      e1,
      e2,
      q,
      beta,
      y,
      c,
      d: [d1, d2],
      text: '',
    };
    result.text =
      d1 === d2 ? 'Semantura autentica!' : 'Semnatura nu e autentica!';

    return result;
  };
}
