import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategComponent } from './categ/categ.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ArticleComponent } from './article/article.component';
import { FormComponent } from './form/form.component';
import { ListeComponent } from './liste/liste.component';
import { PaginationComponent } from './pagination/pagination.component';
//import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    CategComponent,
    ArticleComponent,
    FormComponent,
    ListeComponent,
    PaginationComponent
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
