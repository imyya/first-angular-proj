import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent {
  @Input() liste:any=[]
  selectedArticle: any = null
  @Output() editArticleClicked = new EventEmitter<number>();

  // ...

  onEditArticleClick(articleId: number) {
    console.log('here',articleId)
    this.editArticleClicked.emit(articleId);
}


   

}
