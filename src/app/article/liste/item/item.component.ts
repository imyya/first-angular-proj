import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Article } from 'src/app/interface/article';
import { Category } from 'src/app/interface/category';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
@Input() item!:Article
itemId:number=0
@Output() editArticleClicked = new EventEmitter<number>();
@Input() listes:any=[]
// ...

onEditArticleClick(articleId: number) {
  this.editArticleClicked.emit(articleId);
}


}
