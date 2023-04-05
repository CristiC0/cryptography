import { Injectable } from '@angular/core';
import { OperationsService } from './operations.service';

@Injectable({
  providedIn: 'root',
})
export class Adler32Service {
  constructor(private operations: OperationsService) {}

  Adler32Hash = (plainText: string) => {
    const result: any = {
      letters: plainText.split(''),
      asciiRepresentation: [],
      data: [],
      mod: [],
      hex: [],
      text: '',
    };

    const asciiRepresentation = plainText
      .split('')
      .map((letter) => letter.charCodeAt(0));
    console.log(asciiRepresentation);
    result.asciiRepresentation = [...asciiRepresentation];
    let A = 1;
    let B = 0;

    for (let index = 0; index < asciiRepresentation.length; index++) {
      A += asciiRepresentation[index];
      B += A;
      result.data.push([A, B]);
    }

    const primeNumber = 65521;
    result.mod.push([A, primeNumber, A % primeNumber]);
    result.mod.push([B, primeNumber, B % primeNumber]);
    A = A % primeNumber;
    B = B % primeNumber;

    result.hex.push([A, this.operations.dec2hex(A)]);
    result.hex.push([B, this.operations.dec2hex(B)]);

    result.text = this.operations.dec2hex(B) + this.operations.dec2hex(A);

    return result;
  };
}
