import { Article } from "./article";
import { BaseArticle } from "./base-article";
import { Category } from "./category";
import { Confection } from "./confection";
import { VenteResponse } from "./vente-response";

export interface Vente extends BaseArticle, VenteResponse {
    promo: number,
    marge: number,
    categorie:Category
    confections:Confection[]
}
