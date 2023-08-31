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
import { LoaderComponent } from './loader/loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VenteComponent } from './vente/vente.component';
import { VformComponent } from './vente/vform/vform.component';
import { VlisteComponent } from './vente/vliste/vliste.component';
import { VitemComponent } from './vente/vliste/vitem/vitem.component';
import { VpaginationComponent } from './vente/vpagination/vpagination.component';
import { NgConfirmModule } from 'ng-confirm-box';
//import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    CategComponent,
    ArticleComponent,
    FormComponent,
    ListeComponent,
    PaginationComponent,
    ItemComponent,
    LoaderComponent,
    VenteComponent,
    VformComponent,
    VlisteComponent,
    VitemComponent,
    VpaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    //NgxPaginationModule
    FormsModule,
    BrowserAnimationsModule,
    NgConfirmModule


    
  

  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
