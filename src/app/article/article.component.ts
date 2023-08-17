import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CategoryService} from '../category.service';
import { ArticleService } from '../article.service';
import { Category } from '../interface/category';
import { Articleresponse } from '../interface/articleresponse';
import { Response } from '../interface/response';
import { Article } from '../interface/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers:[CategoryService, ArticleService]

})
export class ArticleComponent implements OnInit  {
  currentp:number=1
  totalp:number=1
  article:Article[]=[]
  currentPage: number = 1;
  lastPage: number = 0;
  selectedArticle: any = null;
  categories:Category[]=[]
  fournisseurs:Category[]=[]


constructor(private breukh:FormBuilder, private categoryService:CategoryService, private articleService:ArticleService){

}

ngOnInit(): void {
  this.fetchArticle()
  this.fetchcategs()
  this.fetchFournisseur()
  
  
}

fetchArticle(){
  this.articleService.getArticleData(this.currentPage).subscribe((response:Response<Articleresponse>)=>{
    this.article=response.data.articles
    this.totalp=response.data.last_page
})
}


fetchcategs(){
  this.categoryService.allcategs().subscribe((response:any)=>{
  this.categories=response.data
  console.log(this.categories)
  })
  }


   fetchFournisseur(){
    this.articleService.getFournisseur().subscribe((response:Response<Category[]>)=>{
      this.fournisseurs=response.data

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
