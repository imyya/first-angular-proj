import { Category } from "./category";

export interface Article {
    id: number,
    libelle: string,
    prix: number,
    stock: number,
    categorie_id: number,
    REF: string,
    photo: string,
    categories:Category
}
