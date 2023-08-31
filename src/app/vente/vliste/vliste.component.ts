import { Component, EventEmitter, Output } from '@angular/core';
import { Vente } from 'src/app/interface/vente';
import { Input } from '@angular/core';

@Component({
  selector: 'app-vliste',
  templateUrl: './vliste.component.html',
  styleUrls: ['./vliste.component.css']
})
export class VlisteComponent {
@Input() liste:Vente[]=[]
@Output() deleteEvent=new EventEmitter<number>
@Output() editEvent=new EventEmitter<number>


onDeleteClicked(id:number){
this.deleteEvent.emit(id)
}
onEditClicked(id:number){
this.editEvent.emit(id)
}
}