import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategComponent } from './categ/categ.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ArticleComponent } from './article/article.component';
import { FormComponent } from './article/form/form.component';
import { ListeComponent } from './article/liste/liste.component';
import { PaginationComponent } from './article/pagination/pagination.component';
import { ItemComponent } from './article/liste/item/item.component';
//import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    CategComponent,
    ArticleComponent,
    FormComponent,
    ListeComponent,
    PaginationComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    //NgxPaginationModule
    FormsModule,
    
  

  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
