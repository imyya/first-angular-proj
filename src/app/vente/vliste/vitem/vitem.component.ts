import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Vente } from 'src/app/interface/vente';

@Component({
  selector: '[app-vitem]',
  templateUrl: './vitem.component.html',
  styleUrls: ['./vitem.component.css']
})
export class VitemComponent {
@Input() item!:Vente
}
