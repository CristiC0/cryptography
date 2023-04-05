import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  result: any;

  setResult(result: any) {
    this.result = result;
    console.log('RESULT', this.result);
  }
}
