import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  result: any;
  algorithm: any;

  setResult(result: any) {
    this.result = result;
    // console.log('RESULT', this.result);
  }

  setAlgorithm(algorithm: any) {
    this.algorithm = algorithm;
    // console.log('RESULT', this.result);
  }
}
