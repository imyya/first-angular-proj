import { Articlefournisseur } from "./articlefournisseur";
import { Articleresponse } from "./articleresponse";
import { Category } from "./category";
import { Fournisseur } from "./fournisseur";

export interface Article extends Articleresponse {
    id: number,
    libelle: string,
    prix: number,
    stock: number,
    categorie_id: number,
    ref: string,
    image: string,
    categorie:Category
    fournisseurs:Articlefournisseur[]
    
}

// libelle: this.libellecontrol.value,
//       prix: this.prixcontrol.value,
//       stock: this.stockcontrol.value,
//       fournisseurs: selectedFournisseursIDs,
//       ref: this.refcontrol.value,
//       photo: this.photocontrol.value,
//       categorie: this.categcontrol.value
