import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Article } from 'src/app/interface/article';
import { Category } from 'src/app/interface/category';

@Component({
  selector: '[app-item]',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
@Input() item!:Article
itemId:number=0
@Output() editArticleClicked = new EventEmitter<number>()
@Output() deleteArticleClicked = new EventEmitter<number>()
@Input() listes:any=[]
// ...
deleteButtonText:string='Supprimer'
countDownActive:boolean=false
countDown:number=3
countDownInterval:any
deleteButtonDisabled:boolean=false

onEditArticleClick(articleId: number) {
  this.editArticleClicked.emit(articleId);
  console.log(articleId)
}

onDeleteArticleClick(artilcleId:number){
 if(this.countDownActive){
  this.stopCountDown()
 }
 else{
  this.countDownActive=true
  this.deleteButtonDisabled=true
  this.deleteButtonText=this.countDown.toString()
  
  this.countDownInterval= setInterval(()=>{
    this.countDown--
    if(this.countDown===0){
      this.stopCountDown()
      this.deleteArticleClicked.emit(artilcleId)


    }
    else{
      this.deleteButtonText=this.countDown.toString()
    }
  },1000)
 }

}

stopCountDown(){
  this.countDownActive=false
  this.deleteButtonDisabled=false
  this.countDown=3
  clearInterval(this.countDownInterval)
  this.countDownInterval=null
  this.deleteButtonText='Supprimer'

}
}
