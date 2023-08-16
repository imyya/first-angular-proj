import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers:[CategoryService]

})
export class ArticleComponent implements OnInit  {
  currentp:number=1
  totalp:number=1
  article:any[]=[]
  currentPage: number = 1;
  lastPage: number = 0;
  selectedArticle: any = null;


constructor(private breukh:FormBuilder, private categoryService:CategoryService){

}

ngOnInit(): void {
  this.fetchArticle()
}

fetchArticle(){
  this.categoryService.getArticleData(this.currentPage).subscribe((response:any)=>{
    this.article=response.data.data
    this.totalp=response.data.last_page
})
}



// Pagination functions
next() {
  if (this.currentPage + 1 >= this.totalp) return;
  this.currentPage++;
  this.fetchArticle();
}

previous() {
  console.log(this.currentPage)
  if (this.currentPage - 1 < 1) return;
  this.currentPage--;
  this.fetchArticle();
}

goToPage(page: number) {
  console.log(this.currentPage)

  this.currentPage = page;
  this.fetchArticle();
}

onEditArticleClicked(articleId: number) {
  console.log('naj',articleId)
  this.selectedArticle = this.article.find(art => art.id === articleId);
}
}
