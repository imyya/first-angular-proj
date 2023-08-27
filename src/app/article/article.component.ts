import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CategoryService} from '../category.service';
import { ArticleService } from '../article.service';
import { Category } from '../interface/category';
import { Articleresponse } from '../interface/articleresponse';
import { Response } from '../interface/response';
import { Article } from '../interface/article';
import { Fournisseur } from '../interface/fournisseur';
import { Articlefournisseur } from '../interface/articlefournisseur';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers:[CategoryService, ArticleService]

})
export class ArticleComponent implements OnInit  {
  totalp:number=1
  article:Article[]=[]
  currentPage: number = 1
  lastPage: number = 0
  selectedArticle: any = null
  categories:Category[]=[]
  fournisseurs:Fournisseur[]=[]
  all?:Articleresponse
  articleFournisseurs:Articlefournisseur[]=[]
  editArticleId:number=0
  loading:boolean=false
  per_page:number=3

  fetchedArticles:Article[]=[]


constructor(private breukh:FormBuilder, private categoryService:CategoryService, private articleService:ArticleService){

}

ngOnInit(): void {
this.fetchArticle()
}


fetchArticle(){
  this.loading=true
  setTimeout(()=>{

    this.articleService.index().subscribe((response:Response<Articleresponse>)=>{
      this.all=response.data
      this.fetchedArticles=response.data.articles
      this.fournisseurs=response.data.providers
      this.categories=response.data.categories
      this.loading=false
      this.totalp = Math.ceil(this.fetchedArticles.length / 3);
      this.display(this.currentPage)

  })
},1000)

}

// Pagination functions

display(currentp:number){
  //nbre de page deja depassees=> current_page - 1 x  nbre delement par page
  //ceci represente lindex a partir duquel on va print les elem de cette page ensuite on print a partir de cette index et jusqua nbre d'elem par page
  const startingIndex = ((currentp-1)* this.per_page)
  const endingIndex=startingIndex+this.per_page
  this.article= this.fetchedArticles.slice(startingIndex,endingIndex);
 return this.article
}

next() {
  if (this.currentPage + 1 >= this.totalp) return;
  //this.currentPage++;
  this.display(this.currentPage++)
}

previous() {
  console.log(this.currentPage)
  if (this.currentPage - 1 < 1) return;
  //this.currentPage--;
  this.display(this.currentPage--)
}

goToPage(page: number) {
  console.log(this.currentPage)

  this.currentPage = page;
  this.display(this.currentPage)
}


onEditArticle(articleId: number) {
  this.editArticleId=articleId
  this.selectedArticle = this.article.find(art => art.id === articleId);
  console.log('rahoof',this.selectedArticle)

}

onDeleteArticle(id:number){
  console.log('to be deleted', id)
  this.articleService.delete(id).subscribe((resp:Response<Article>)=>{
    console.log(resp)
  })
  this.article=this.article.filter(ac=>ac.id!=id)
}

submitArticle(article:FormData){
//let  submittedArticle = article
  if(this.editArticleId!=0){
    console.log('she herezz')
    this.loading=true
    this.articleService.update(this.editArticleId,article).subscribe((resp:Response<Article>)=>{
      console.log(resp)
      this.fetchArticle()
      this.article
      this.loading=false

    })
    console.log('fuck',this.editArticleId)
    return

   }
   this.loading=true
  this.articleService.create(article).subscribe((resp:Response<Article>)=>{   
    console.log(resp)
    this.fetchArticle()
    this.article
    this.loading=false
 })
 }

}

