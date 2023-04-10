import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AESService } from '../aes.service';
import { Adler32Service } from '../adler-32.service';
import { ChaumService, ChaumVariables } from '../chaum.service';
@Component({
  selector: 'cryptography-form',
  templateUrl: './cryptography-form.component.html',
  styleUrls: ['./cryptography-form.component.scss'],
  providers: [AESService],
})
export class CryptographyFormComponent implements OnInit {
  @Output() result = new EventEmitter<any>();
  @Output() algorithm = new EventEmitter<any>();
  plainText = '';
  key = '';
  output = '';
  localResult: any;
  encryptSelection = true;
  localAlgorithm = 'AES';
  chaumVariables: ChaumVariables = {
    q: 0,
    a: 0,
    alfa: 0,
    e1: 0,
    e2: 0,
  };
  constructor(
    private AES: AESService,
    private Adler32: Adler32Service,
    private Chaum: ChaumService
  ) {}

  ngOnInit() {
    this.algorithm.emit('AES');
  }

  setResult() {
    this.encryptSelection ? this.encrypt() : this.decrypt();
    this.result.emit(this.localResult);
    this.algorithm.emit(this.localAlgorithm);
  }

  encrypt() {
    switch (this.localAlgorithm) {
      case 'AES':
        this.localResult = this.AES.AESEncryption(this.plainText, this.key);
        break;
      case 'Adler-32':
        this.localResult = this.Adler32.Adler32Hash(this.plainText);
        break;
      case 'Chaum':
        this.localResult = this.Chaum.ChaumSignature(
          this.plainText,
          this.chaumVariables
        );
        break;
    }

    this.output = this.localResult.text;
  }

  decrypt() {
    switch (this.localAlgorithm) {
      case 'AES':
        this.localResult = this.AES.AESDecryption(this.plainText, this.key);
        break;
      default:
        this.localResult = '';
        break;
    }

    this.output = this.localResult.text;
  }

  onChange(value: boolean) {
    this.encryptSelection = value;
  }

  reverse() {
    [this.plainText, this.output] = [this.output, this.plainText];
  }
}
