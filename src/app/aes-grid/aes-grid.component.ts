import { Component, Input } from '@angular/core';

@Component({
  selector: 'aes-grid',
  templateUrl: './aes-grid.component.html',
  styleUrls: ['./aes-grid.component.scss'],
})
export class AESGridComponent {
  @Input() data: any;
  @Input() mode: boolean;
  @Input() keys: string[][];
}
