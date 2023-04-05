import { Injectable } from '@angular/core';
import { AESOperationsService } from './aesoperations.service';
import { OperationsService } from './operations.service';

@Injectable({
  providedIn: 'root',
})
export class AESService {
  constructor(
    private operations: OperationsService,
    private AESOperations: AESOperationsService
  ) {}

  AESEncryption = (plainText: string, key: string) => {
    const n =
      key.length === 16
        ? 10
        : key.length === 24
        ? 12
        : key.length === 32
        ? 14
        : 10;

    const keyHex = this.operations.hexEncode(key);
    const keys = this.AESOperations.RijndaelKeySchedule(keyHex);
    const result: any = {
      keys: [keyHex, ...keys],
      data: [],
      text: '',
      mode: true,
    };

    const plainTextHex = this.operations.hexEncode(plainText);
    let stateMatrix: string[] = [];
    for (let round = 0; round <= n; round++) {
      let roundResults: any = {};
      if (round === 0) {
        stateMatrix = this.AESOperations.addRoundKey(
          this.AESOperations.transpileMatrix(plainTextHex),
          this.AESOperations.transpileMatrix(keyHex)
        );

        roundResults = { addRoundKey: stateMatrix };
        result.data.push(roundResults);
        continue;
      }

      stateMatrix = this.AESOperations.subBytes(stateMatrix);
      roundResults = { subBytes: stateMatrix };

      stateMatrix = this.AESOperations.shiftRow(stateMatrix);
      roundResults = { ...roundResults, shiftRow: stateMatrix };

      if (round !== n) {
        stateMatrix = this.AESOperations.mixColumn(stateMatrix);
        roundResults = { ...roundResults, mixColumn: stateMatrix };
      }

      stateMatrix = this.AESOperations.addRoundKey(
        stateMatrix,
        this.AESOperations.transpileMatrix(keys[round - 1])
      );

      roundResults = { ...roundResults, addRoundKey: stateMatrix };
      result.data.push(roundResults);
    }

    result.text = this.AESOperations.transpileMatrix(stateMatrix).join(' ');
    return result;
  };

  AESDecryption = (string: string, key: string) => {
    const n =
      key.length === 16
        ? 10
        : key.length === 24
        ? 12
        : key.length === 32
        ? 14
        : 10;

    const keyHex = this.operations.hexEncode(key);
    const keys = this.AESOperations.RijndaelKeySchedule(keyHex).reverse();
    const result: any = {
      keys: [...keys, keyHex],
      data: [],
      text: '',
      mode: false,
    };

    let encryptedText = string.split(' ');

    for (let round = 0; round < n; round++) {
      let roundResults: any = {};
      if (round == 0) {
        encryptedText = this.AESOperations.addRoundKey(
          this.AESOperations.transpileMatrix(encryptedText),
          this.AESOperations.transpileMatrix(keys[0])
        );
        roundResults = { addRoundKey: encryptedText };

        encryptedText = this.AESOperations.invShiftRow(encryptedText);
        roundResults = { ...roundResults, invShiftRow: encryptedText };

        encryptedText = this.AESOperations.invSubBytes(encryptedText);
        roundResults = { ...roundResults, invSubBytes: encryptedText };

        result.data.push(roundResults);
        continue;
      }

      encryptedText = this.AESOperations.addRoundKey(
        encryptedText,
        this.AESOperations.transpileMatrix(keys[round])
      );
      roundResults = { addRoundKey: encryptedText };

      encryptedText = this.AESOperations.invMixColumn(encryptedText);
      roundResults = { ...roundResults, invMixColumn: encryptedText };

      encryptedText = this.AESOperations.invShiftRow(encryptedText);
      roundResults = { ...roundResults, invShiftRow: encryptedText };

      encryptedText = this.AESOperations.invSubBytes(encryptedText);
      roundResults = { ...roundResults, invSubBytes: encryptedText };
      result.data.push(roundResults);
    }

    encryptedText = this.AESOperations.addRoundKey(
      encryptedText,
      this.AESOperations.transpileMatrix(keyHex)
    );
    result.data.push({ addRoundKey: encryptedText });

    result.text = this.AESOperations.transpileMatrix(encryptedText)
      .map((l) => this.operations.hex2Text(l))
      .join('');

    return result;
  };
}
