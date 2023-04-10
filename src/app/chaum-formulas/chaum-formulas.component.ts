import { Component, Input } from '@angular/core';
import { ChaumVariables } from '../chaum.service';

@Component({
  selector: 'chaum-formulas',
  templateUrl: './chaum-formulas.component.html',
  styleUrls: ['./chaum-formulas.component.scss'],
})
export class ChaumFormulasComponent {
  @Input() results: any;
}
