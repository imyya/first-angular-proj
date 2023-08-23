import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent {
  @Input() liste:any=[]
  selectedArticle: any = null
  @Output() editArticle= new EventEmitter<number>();
  @Output() deleteArticle= new EventEmitter<number>()
  @Output() editId!:number

  // ...

  onEditClick(articleId: number) {
    //console.log('here',articleId)
    // this.editId=articleId
    this.editArticle.emit(articleId)


  }

  onDeleteClick(id:number){
    this.deleteArticle.emit(id)
  }



   

}
