import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ArticleVenteService } from '../article-vente.service';
import { Response } from '../interface/response';
import { Vente } from '../interface/vente';
import { VenteResponse } from '../interface/vente-response';
import { Responsse } from '../interface/rest-response';
import { ArticleService } from '../article.service';
import { Articleresponse } from '../interface/articleresponse';
import { Article } from '../interface/article';
import { Category } from '../interface/category';
import { VformComponent } from './vform/vform.component';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.css']
})
export class VenteComponent implements OnInit{
  constructor(private venteService :ArticleVenteService, private articleService: ArticleService){

  }



  fetchedArticlesVente:Vente[]=[]
  articlesVente:Vente[]=[]
  articlesConfections:Article[]=[]
  currentPage: number = 1
  lastPage: number = 0
  per_page=3
  totalp:number=1
  categories:Category[]=[]
  categoriesTypeVente:Category[]=[]
  toBeEdittedArticle!:Vente | null
  articleId:number=0 

  ngOnInit(): void {
    this.fetchArticleVente()
    this.fetchArticleConfection()
  }

  fetchArticleVente(){
    this.venteService.index().subscribe((resp:Responsse<Vente>)=>{
    this.fetchedArticlesVente=resp.data
    console.log('fucck',this.fetchedArticlesVente);
    
    this.totalp = Math.ceil(this.fetchedArticlesVente.length / 3);
    this.display(this.currentPage)
    })
  }
  fetchArticleConfection(){
    this.articleService.index().subscribe((response:Response<Articleresponse>)=>{
    this.articlesConfections=response.data.articles
    this.categories=response.data.categories
    this.categoriesTypeVente=response.data.categories.filter(catg=>catg.type==='VENTE')
    console.log(this.articlesConfections)
  })
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
  display(currentp:number){
    //nbre de page deja depassees=> current_page - 1 x  nbre delement par page
    //ceci represente lindex a partir duquel on va print les elem de cette page ensuite on print a partir de cette index et jusqua nbre d'elem par page
    const startingIndex = ((currentp-1)* this.per_page)
    const endingIndex=startingIndex+this.per_page
    this.articlesVente= this.fetchedArticlesVente.slice(startingIndex,endingIndex);
   return this.articlesVente
  }

  submitFn(article:FormData){
    if(this.articleId!==0){

      this.venteService.update(this.articleId, article).subscribe((resp:Responsse<Vente>)=>{
        console.log(resp)
      })
      return
    }
    this.venteService.create(article).subscribe((resp:Responsse<Vente>)=>{   
  })
  }

  onDelete(id:number){
    this.venteService.delete(id).subscribe((resp:Responsse<Vente>)=>{
      console.log(resp)
    })
    this.articlesVente=this.articlesVente.filter(ac=>ac.id!=id)

  }

  onEdit(id:number){
    this.toBeEdittedArticle=this.fetchedArticlesVente.find(art=>art.id===id) || null
    this.articleId=id
  }
}
