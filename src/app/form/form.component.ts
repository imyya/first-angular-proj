import { Component, OnChanges, OnInit,SimpleChanges, Input } from '@angular/core';
import { CategoryService } from '../category.service';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers:[CategoryService]

})
export class FormComponent implements OnInit ,OnChanges {
  articleForm!: FormGroup; 
  fournisseurs:any[]=[]
  categs:any[]=[]
  libelleInput:string=''
  categorie:number=0
  refInput:string=''
  x:any
  imagePreview: string | null = null
  filteredFournisseurs: any[] = []
  selectedFournisseurs: string[] = [];
  libellecontrol = new FormControl('',Validators.required);
  prixcontrol = new FormControl('',[Validators.required, Validators.pattern(/^\d+$/), Validators.min(0)]);
  stockcontrol = new FormControl('',[Validators.required,Validators.pattern(/^\d+$/), Validators.min(0)]);
  fournisseurcontrol = new FormControl('',Validators.required);
  refcontrol = new FormControl('',Validators.required);
  photocontrol = new FormControl('',Validators.required);
  categcontrol = new FormControl('',Validators.required);


  prixInput:number | string=''
  stockInput:number | string=''
  fournisseurInput=''


  
  @Input() articleId:number | null=null





  constructor(private breukh:FormBuilder, private categoryService:CategoryService){

  }
  
  ngOnInit(): void {
    this.fetchFournisseur()
    this.fetchcategs()
    //this.getCount()

    // this.articleForm = this.breukh.group({
    //   libelle: ['', Validators.required],
    //   prix: ['', Validators.required],
    //   stock: ['', Validators.required],
    //   category: ['', Validators.required],
    //   photo: [''] 
    // });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['articleId']) {
      const newArticle = changes['articleId'].currentValue;
      console.log('new',newArticle)
      this.libelleInput=newArticle.libelle
      this.prixInput=newArticle.prix
      this.stockInput=newArticle.stock
      this.categorie=newArticle.categorie_id
      // Effectuez les actions nécessaires ici
      // Par exemple, pré-remplissez les champs du formulaire avec les valeurs de newArticle
    }
  }

  fetchFournisseur(){
    this.categoryService.getFournisseur().subscribe((response:any)=>{
      this.fournisseurs=response.data
      console.log(this.fournisseurs)

  })
  }


 fetchcategs(){
  this.categoryService.allcategs().subscribe((response:any)=>{
  this.categs=response.data
  console.log(this.categs)
  })
  }

  getCount(){
    this.categoryService.countArticles(this.categorie).subscribe((response:any)=>{
      console.log('ha',this.categorie)
      console.log('choo',response)
      this.x= response.data + 1
      
      
  })
  }
  updateRef(){
    let categ = this.categs.find(cat=>cat.id===+this.categorie); 
    let libellePrefix = this.libelleInput.slice(0,3).toUpperCase()
    let categPrefix = categ ? categ.libelle.toUpperCase():''
    this.categoryService.countArticles(this.categorie).subscribe((response:any)=>{
      console.log('ha',this.categorie)
      console.log('choo',response)
      this.x= response.data + 1
    console.log('this x',this.x)
    this.refInput = libellePrefix ? `REF_${libellePrefix}_${categPrefix}`:''
    if (this.x > 1) {
      this.refInput += `_${this.x}`;
    }
  })
  



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
    const libelleValue = this.libellecontrol.value;
    const prixValue = this.prixcontrol.value;
    const stockValue = this.stockcontrol.value;
    const fournisseurValue = this.selectedFournisseurs;
    const refValue = this.refcontrol.value;
    const photoValue = this.photocontrol.value;
    const categValue = this.categcontrol.value;

    // console.log('Libellé:', libelleValue);
    // console.log('Prix:', prixValue);
    // console.log('Stock:', stockValue);
    // console.log('Fournisseur:', fournisseurValue);
    // console.log('Référence:', refValue);
    // console.log('Photo:', photoValue);
    // console.log('Catégorie:', categValue);

   
    const article= this.getFormValues()
    console.log(article)
    this.categoryService.addArticle(article).subscribe(resp=>{
      console.log(resp)
      this.reset()


      
    })

   
  }
  getFormValues() {
    const selectedFournisseursIDs = this.selectedFournisseurs.map(libelle => {
      const fournisseur = this.fournisseurs.find(f => f.libelle === libelle);
      return fournisseur ? fournisseur.id : null;
    });
    return {
      libelle: this.libellecontrol.value,
      prix: this.prixcontrol.value,
      stock: this.stockcontrol.value,
      fournisseurs: selectedFournisseursIDs,
      ref: this.refcontrol.value,
      photo: this.photocontrol.value,
      categorie: this.categcontrol.value
    };

}

reset(){
  this.filteredFournisseurs=[]
  this.selectedFournisseurs=[];
  this.libellecontrol =new FormControl('')
  this.prixcontrol = new FormControl('');
  this.stockcontrol = new FormControl('');
  this.fournisseurcontrol = new FormControl('');
  this.refcontrol = new FormControl('');
  this.photocontrol = new FormControl('');
  this.categcontrol = new FormControl('')
}
}