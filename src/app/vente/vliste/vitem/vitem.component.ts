import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Input } from '@angular/core';
import { NgConfirmComponent, NgConfirmService } from 'ng-confirm-box';
import { Vente } from 'src/app/interface/vente';

@Component({
  selector: '[app-vitem]',
  templateUrl: './vitem.component.html',
  styleUrls: ['./vitem.component.css']
})
export class VitemComponent {
@Input() item!:Vente
@Output() deleteEvent= new EventEmitter<number>
@Output() editEvent= new EventEmitter<number>
confirmService = inject(NgConfirmService)

delete(itemId:number){
  this.confirmService.showConfirm('Etes vous sure de vouloir supprimer',()=>{
    this.deleteEvent.emit(itemId)
  },
  ()=>{
    console.log('ok coward');
  })
  
}

edit(itemId:number){
  this.editEvent.emit(itemId)
}
}
