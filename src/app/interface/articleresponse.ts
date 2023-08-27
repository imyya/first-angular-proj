import { Article } from "./article";
import { Category } from "./category";
import { Fournisseur } from "./fournisseur";

export interface Articleresponse {
    articles:Article[],
    last_page:number,
    categories:Category[],
    providers:Fournisseur[]
}
