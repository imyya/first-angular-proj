import { Category } from "./category";
import { Fournisseur } from "./fournisseur";

export interface Article {
    id: number,
    libelle: string,
    prix: number,
    stock: number,
    categorie_id: number,
    REF: string,
    photo: string,
    categorie:Category
    
}

// libelle: this.libellecontrol.value,
//       prix: this.prixcontrol.value,
//       stock: this.stockcontrol.value,
//       fournisseurs: selectedFournisseursIDs,
//       ref: this.refcontrol.value,
//       photo: this.photocontrol.value,
//       categorie: this.categcontrol.value
