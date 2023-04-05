import { Component, Input } from '@angular/core';

@Component({
  selector: 'adler32-table',
  templateUrl: './adler32-table.component.html',
  styleUrls: ['./adler32-table.component.scss'],
})
export class Adler32TableComponent {
  @Input() letters: string[];
  @Input() values: number[][];
  @Input() asciiRepresentation: number[];
  @Input() hex: string[];
  @Input() mod: string[][];
}
