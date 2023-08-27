import { Injectable } from '@angular/core';
import { ResponseService } from './response.service';
import { Vente } from './interface/vente';
import { Response } from './interface/response';
import { Responsse} from './interface/rest-response';

@Injectable({
  providedIn: 'root'
})
export class ArticleVenteService extends ResponseService<Responsse<Vente>>{
protected override uri(): string {
  return '/articlesvente'
}
}
