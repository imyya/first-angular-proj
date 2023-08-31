import { Component, OnChanges, OnInit,SimpleChanges, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Category } from '../../interface/category';
import { Article } from '../../interface/article';
import { Fournisseur } from 'src/app/interface/fournisseur';
import { Articlefournisseur } from 'src/app/interface/articlefournisseur';

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
  filteredFournisseurs: Fournisseur[] = []
  selectedFournisseurs: Fournisseur[] = [];
  
  prixInput:number | string=''
  stockInput:number | string=''
  fournisseurInput=''
  @Output() submitEvent= new EventEmitter<any>()
  @Input() article:Article | null=null
  fournisseurList:boolean=false
  @ViewChild('fournisseurUl') fournisseurUl!:ElementRef
  @ViewChild('fournisseurInput') Inputfournisseur!:ElementRef
  submitButtonLabel ='Enregistrer'
  editArticleId:number=0
  selectedToEditImage: File|null=null
  selectedFournisseurIds:number[]=[]
  originalArticle!:Article
  labelTaken:boolean=false
  editRef=''
  extensions:string[]=['png','jpeg']
  constructor(private breukh:FormBuilder){}
  
  ngOnInit(): void {
    this.articleForm= this.breukh.group({
      libelle: ['', Validators.required],
      prix: [null, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(0)]],
      stock: [null, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(0)]],
      fournisseurs: [null, Validators.required],
      ref: ['', Validators.required],
      categorie_id: [0, Validators.required],
      image:[''] 
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['article'] && this.article) {
      console.log('la photo', this.article)
      this.originalArticle=this.article
      this.editArticleId=this.article.id
      this.categorie=this.article.categorie_id
      this.editRef=this.article.ref
      this.selectedFournisseurIds=this.article.fournisseurs.map(f=>f.id)
      console.log('slctd id', this.selectedFournisseurIds)
      // let fournisseursLibelle=this.article.fournisseurs.map(f=>{
      //   const fournisseur = this.fournisseurs.find(ff=>ff.id==f.id)
      //   return fournisseur ? fournisseur.libelle :''
      // })
      this.selectedFournisseurs=this.article.fournisseurs.map(f=>{
      const fournisseur = this.fournisseurs.find(ff=>ff.id==f.id)
      return fournisseur || '' }) as Fournisseur[]
      this.articleForm.patchValue({
      libelle:this.article.libelle,
      prix:this.article.prix,
      stock:this.article.stock,
      categorie_id:this.article.categorie_id,
      //fournisseur:fournisseursLibelle.join(','),
      image:this.article.image,
      ref:this.article.ref
     }
     )
     this.submitButtonLabel = this.article ? 'Edit' : 'Enregistrer'; 
    }
  }

  // @HostListener('document:click',['$event'])
  // onClick(event:Event){
  //   if(!this.fournisseurUl.nativeElement.contains(event.target) && !this.Inputfournisseur.nativeElement.contains(event.target)  ){
  //     this.fournisseurUl.nativeElement.innerHTML=''
  //   }
  // }



  updateRef(event?:Event){
    if(!event && this.editArticleId!==0){
      this.labelTaken = this.allArticles.some(elem=>elem.libelle===this.articleForm.get('libelle')?.value) 
      let refSuffix= this.editRef.slice(7)
      console.log(refSuffix)
      let libellePrefix = this.articleForm.value.libelle.slice(0,3).toUpperCase()
      const refBase = libellePrefix ? `REF_${libellePrefix}${refSuffix}` : ''
      this.articleForm.get('ref')?.patchValue(refBase);
      return
    }
    let id!:number
    if(event){
      id = +(event?.target as HTMLSelectElement).value
    }
    this.labelTaken = this.allArticles.some(elem=>elem.libelle===this.articleForm.get('libelle')?.value) 

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
    const selectedFile = event.target.files[0]
    console.log('le gars',selectedFile.name);
    if(!this.extensions.includes(selectedFile.name.slice(-3))){
      this.labelTaken=true
      return
    }
    this.articleForm.get('image')?.setValue(selectedFile)
    this.selectedToEditImage=selectedFile
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
    if(search===''){
     // console.log('tired')
      this.filteredFournisseurs=[]
      return
    }
    console.log('filtrd',this.filteredFournisseurs)
    this.filteredFournisseurs =this.fournisseurs.filter(
      fournisseur => fournisseur.libelle.toLowerCase().includes(search.toLowerCase()) && !this.selectedFournisseurs.some(f=>f.id===fournisseur.id))
  }

  addFournisseur(fournisseur: Fournisseur) {
    console.log('filtered',this.filteredFournisseurs)
    if (!this.selectedFournisseurs.includes(fournisseur)) {
     this.selectedFournisseurs.push(fournisseur)
     this.selectedFournisseurIds.push(fournisseur.id)
     this.articleForm.get('fournisseur')?.patchValue('')
     this.filteredFournisseurs = this.filteredFournisseurs.filter(item => item.id !== fournisseur.id)
      //this.filteredFournisseurs=[]
    }
  }
  generateFournisseursElem() {
    return  this.selectedFournisseurs.join(' ')
  }

  submitFn(){
    if(this.editArticleId!=0){
      let updatedFields= new FormData
      // formData.forEach((value, key) => {
      //   console.log(`${key}: ${value}`);
        
      // })
      // let data={
      //   formvalue:this.articleForm.value,
      //   img:this.selectedToEditImage
      // }
      console.log('nuur',this.selectedFournisseurIds)
      this.articleForm.get('fournisseurs')?.patchValue(this.selectedFournisseurIds)
      this.articleForm.get('categorie')?.patchValue(this.categorie)
     // let key: keyof typeof this.originalArticle as string
      for(let key in this.articleForm.value){
        if(this.originalArticle[key as keyof typeof this.originalArticle]!==this.articleForm.value[key]){
          if (key === 'fournisseurs') {
            updatedFields.append(key, JSON.stringify(this.articleForm.value[key]));
          } else {
            updatedFields.append(key, this.articleForm.value[key]);
          }
        }
      }
      updatedFields.append('_method', "PUT");

      //updatedFields.append('_method','PUT')
      updatedFields.forEach((value, key) => {
           console.log(`${key}: ${value}`);
          
         })

      console.log('wyd', this.articleForm.value)
      console.log('wyatt', updatedFields)

      this.submitEvent.emit(updatedFields)
      this.reset()
      return
    }
    let formData = new FormData
    const formValue = this.articleForm.value;
    console.log('new label', this.articleForm.get('libelle')?.value)
    formData.append('libelle', this.articleForm.get('libelle')?.value);
    formData.append('prix', this.articleForm.get('prix')?.value);
    formData.append('stock', this.articleForm.get('stock')?.value);
    this.selectedFournisseurIds = this.selectedFournisseurs.map(fournisseur => fournisseur.id);
    formData.append('fournisseurs', JSON.stringify(this.selectedFournisseurIds))
    formData.append('ref', this.articleForm.get('ref')?.value);
    formData.append('categorie_id', this.articleForm.get('categorie_id')?.value);
    const imageFile = this.articleForm.get('image')?.value
    if (imageFile instanceof File) {
      formData.append('image', imageFile);
    }
    this.submitEvent.emit(formData)
    this.reset()


   



  
      //formData.append('prix', this.myForm.get('prix').value);
  
      
      // const article= this.getFormValues()

      // console.log(article)
      // this.categoryService.addArticle(article).subscribe(resp=>{
      //   console.log(resp)
        //this.reset()
  
  
        
      // })
    }

  
    // const selectedFournisseursIDs = this.selectedFournisseurs.map(libelle => {
    //   const fournisseur = this.fournisseurs.find(f => f.libelle === libelle);
    //   return fournisseur ? fournisseur.id : null;
    // });
  

unselectFournisseur(fournisseur:Fournisseur){
this.selectedFournisseurs=this.selectedFournisseurs.filter(item=>item.id!=fournisseur.id)
this.selectedFournisseurIds=this.selectedFournisseurIds.filter(item=>item!=fournisseur.id)


//this.filteredFournisseurs.push(fournisseur)
}
reset(){
  this.filteredFournisseurs=[]
  this.selectedFournisseurs=[];
 this.articleForm.reset()
 this.imagePreview=null
}
}