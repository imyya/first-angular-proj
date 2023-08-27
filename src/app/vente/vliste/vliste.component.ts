import { Component } from '@angular/core';
import { Vente } from 'src/app/interface/vente';
import { Input } from '@angular/core';

@Component({
  selector: 'app-vliste',
  templateUrl: './vliste.component.html',
  styleUrls: ['./vliste.component.css']
})
export class VlisteComponent {
@Input() liste:Vente[]=[]
}
