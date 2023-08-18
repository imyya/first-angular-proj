import { Component, OnChanges, OnInit,SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Category } from '../../interface/category';
import { Article } from '../../interface/article';
import { Fournisseur } from 'src/app/interface/fournisseur';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers:[]

})
export class FormComponent implements OnInit ,OnChanges {
  articleForm!: FormGroup; 
 @Input() allArticles:Article[]=[]
 @Input() fournisseurs:Fournisseur[]=[]
 @Input() categs:Category[]=[]
  libelleInput:string=''
  categorie:number=0
  refInput:string=''
  x: number | null =0
  imagePreview: string | null = null
  filteredFournisseurs: any[] = []
  selectedFournisseurs: string[] = [];
  
  prixInput:number | string=''
  stockInput:number | string=''
  fournisseurInput=''
  @Output() submitEvent= new EventEmitter<any>()
  @Input() articleId:number | null=null

  constructor(private breukh:FormBuilder){}
  
  ngOnInit(): void {
    this.articleForm= this.breukh.group({
      libelle: ['', Validators.required],
      prix: [null, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(0)]],
      stock: [null, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(0)]],
      fournisseur: [null, Validators.required],
      ref: ['', Validators.required],
      photo: ['', Validators.required],
      categ: [0, Validators.required]

   
    })

 
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['articleId']) {
      const newArticle = changes['articleId'].currentValue;
      console.log('new',newArticle)
      this.libelleInput=newArticle.libelle
      this.prixInput=newArticle.prix
      this.stockInput=newArticle.stock
      this.categorie=newArticle.categorie_id
      
    }
  }



  updateRef(event?:Event){
    let id=0
    if(event){

       id = +(event?.target as HTMLSelectElement).value
    }
    let categ = this.categs.find(cat=>cat.id==+id); 
    let libellePrefix = this.articleForm.value.libelle.slice(0,3).toUpperCase()
    let categPrefix = categ ? categ.libelle.toUpperCase():''
    this.x= categ?.total || 0
    const refBase = libellePrefix ? `REF_${libellePrefix}_${categPrefix}` : ''
    this.x = categ?.total || 0
    const refValue = this.x ? `${refBase}_${this.x}` : refBase;
    this.articleForm.get('ref')?.patchValue(refValue);

  }

  previewImage(event: any) {

    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {//event handler qui sexecute qd le file reading is done
        this.imagePreview = e.target.result;//assings the result of the file reading to the imgpreview
      };
      reader.readAsDataURL(selectedFile);
    } else {
      this.imagePreview = null;
    }
  }

  searchFournisseurs(searchTerm: any) {

    let search = searchTerm.target.value
    this.filteredFournisseurs = this.fournisseurs.filter(
      fournisseur => fournisseur.libelle.toLowerCase().includes(search.toLowerCase())
    );
  }

  addFournisseur(fournisseur: any) {
    if (!this.selectedFournisseurs.includes(fournisseur.libelle)) {
      this.selectedFournisseurs.push(fournisseur.libelle);
      this.filteredFournisseurs = this.filteredFournisseurs.filter(item => item !== fournisseur);
    }
  }
  getSelectedFournisseursText() {
    return this.selectedFournisseurs.join(' ');
  }
  
  recupererForm(){
    console.log(this.articleForm.value)
  }

  submitFn(){
        console.log('all articles',this.allArticles)

    // const libelleValue = this.libellecontrol.value;
    // const prixValue = this.prixcontrol.value;
    // const stockValue = this.stockcontrol.value;
    // const fournisseurValue = this.selectedFournisseurs;
    // const refValue = this.refcontrol.value;
    // const photoValue = this.photocontrol.value;
    // const categValue = this.categcontrol.value;

    // console.log('Libellé:', libelleValue);
    // console.log('Prix:', prixValue);
    // console.log('Stock:', stockValue);
    // console.log('Fournisseur:', fournisseurValue);
    // console.log('Référence:', refValue);
    // console.log('Photo:', photoValue);
    // console.log('Catégorie:', categValue);

   
    const article= this.getFormValues()
    this.submitEvent.emit(article)
    console.log(article)
    // this.categoryService.addArticle(article).subscribe(resp=>{
    //   console.log(resp)
      this.reset()


      
    // })

   
  }
  getFormValues() {
    const selectedFournisseursIDs = this.selectedFournisseurs.map(libelle => {
      const fournisseur = this.fournisseurs.find(f => f.libelle === libelle);
      return fournisseur ? fournisseur.id : null;
    });
    return {
      // libelle: this.libellecontrol.value,
      // prix: this.prixcontrol.value,
      // stock: this.stockcontrol.value,
      // fournisseurs: selectedFournisseursIDs,
      // ref: this.refcontrol.value,
      // photo: this.photocontrol.value,
      // categorie: this.categcontrol.value
    };

}

getCategoryId(event:any){
  this.categorie=event.target.value
}



reset(){
  this.filteredFournisseurs=[]
  this.selectedFournisseurs=[];
 this.articleForm.reset()
}
}