import { Component, EventEmitter, Output } from '@angular/core';
import { AESService } from '../aes.service';

@Component({
  selector: 'cryptography-form',
  templateUrl: './cryptography-form.component.html',
  styleUrls: ['./cryptography-form.component.scss'],
  providers: [AESService],
})
export class CryptographyFormComponent {
  @Output() result = new EventEmitter<any>();
  plainText = '';
  key = '';
  output = '';
  localResult: any;
  encryptSelection = true;

  constructor(private AES: AESService) {}

  setResult() {
    this.encryptSelection ? this.encrypt() : this.decrypt();
    this.result.emit(this.localResult);
  }

  encrypt() {
    this.localResult = this.AES.AESEncryption(this.plainText, this.key);
    this.output = this.localResult.text;
    // console.log(this.AES.AESEncryption(this.plainText, this.key));
  }

  decrypt() {
    this.localResult = this.AES.AESDecryption(this.plainText, this.key);
    this.output = this.localResult.text;
    // console.log(this.AES.AESEncryption(this.plainText, this.key));
  }

  onChange(value: boolean) {
    this.encryptSelection = value;
  }

  reverse() {
    [this.plainText, this.output] = [this.output, this.plainText];
  }
}
