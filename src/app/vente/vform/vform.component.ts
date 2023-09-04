import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { Input } from '@angular/core';
import { Category } from 'src/app/interface/category';
import { Article } from 'src/app/interface/article';
import { Vente } from 'src/app/interface/vente';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-vform',
  templateUrl: './vform.component.html',
  styleUrls: ['./vform.component.css']
})
export class VformComponent implements OnInit, OnChanges {
constructor(private groupmdr: FormBuilder){}
@Input() typeVenteCategories:Category[]=[]
@Input() articlesConfectionTab:Article[]=[]
@Input() articlesVenteTab:Vente[]=[]
@Output() submitEvent= new EventEmitter<any>
formgrp!:FormGroup
promoChecked:boolean=false
editArticleId:number=0
x:number=0
extensions:string[]=['png','jpeg']
imagePreview: string | null = null
filteredConfections: Article[]=[]
ulActive:number=0
formattedConfections: any[] = []
selectedConfection:Article[]=[]
fabricationCout:number=0
existingTypes:Article[]=[]
confectionsInvalid!:boolean
rowOrderError:boolean=false
@Input() toBeEdittedArticle!:Vente|null
modifiedConfections:any
editMode:number=0
submitButtonLabel='Save'
editRef=''
originalArticle:any
labelTaken:boolean=false
firstRowEmptyError:boolean=false
wrongFileType:boolean=false
oneThird!:number
check!:boolean
quantityError!:boolean
ngOnInit(): void {
  this.formgrp=this.groupmdr.group({
    confections:this.groupmdr.array([]),
    libelle:['',Validators.required],
    categorie_id:['',[Validators.required, this.noZeroCategoryValidator]],
    promo:['',[Validators.pattern(/^\d+$/), Validators.min(0)]],
    coutFabrication:[''],
    marge:['',[Validators.required, this.margeValidator()]],
    prix:[''],
    ref:[''],
    image:[[''],Validators.required]
  })
  //.pipe(debounceTime(200))
  this.confections.valueChanges
  .subscribe(() => {
    const totalCost = this.calculateTotalCost();
    this.formgrp.get('coutFabrication')?.patchValue(totalCost);
    this.fabricationCout=totalCost
    this.calculateAndSetPrixValue()
    
  })
  // this.formgrp.get('prix')?.valueChanges.subscribe(()=>{
  //   this.calculateAndSetPrixValue()
  // })
}

ngOnChanges(changes: SimpleChanges): void {
  if(changes['toBeEdittedArticle'] && this.toBeEdittedArticle){
    this.editMode=1
    this.originalArticle=this.toBeEdittedArticle
    console.log('good days',this.toBeEdittedArticle)
   this.modifiedConfections= this.toBeEdittedArticle?.confections.map(conf=>{
    const article = this.articlesConfectionTab.find(article=>article.id===conf.article_id)
    if(article){
      this.selectedConfection.push(article)
    }
    console.log('selc',this.selectedConfection);
    
    this.addControlConfection(conf)
    return conf
   })   
   this.toBeEdittedArticle.promo!==0? this.promoChecked=!this.promoChecked : this.promoChecked=this.promoChecked
   this.editRef=this.toBeEdittedArticle.ref
   this.formgrp?.patchValue(this.toBeEdittedArticle)
   this.submitButtonLabel = 'Edit' 
  }
}

noZeroCategoryValidator(control:FormControl){
  if(control.value==0){
    return {noZero:true}
  }
  return null
}

calculateAndSetPrixValue(): void {
  let margeValue = +this.formgrp.get('marge')?.value || 0;  
  let coutFabricationValue = +this.formgrp.get('coutFabrication')?.value || 0;
  console.log('cout fabrication',coutFabricationValue);
  let prixValue = margeValue + coutFabricationValue;
  this.formgrp.get('prix')?.patchValue(prixValue);
}

toggleCheck(){
  this.promoChecked=!this.promoChecked
}

get confections():FormArray{
  return this.formgrp.controls['confections'] as FormArray
}

remove(index:number){
  if(index===0){
    this.firstRowEmptyError=false
  }
this.confections.removeAt(index)
}

handlePrixWhenRemove(index:number){

}

handleRemove(event:any,index:number){
  
  if(!this.confections.at(index).get('libelle')?.value || !this.confections.at(index).get('quantite')?.value){
    this.remove(index)
    console.log('the index',index);
    return
  }
  console.log('the index',index)
  console.log('smol',this.confections.at(index)?.get('quantite')?.value);
  console.log('before remove',this.selectedConfection, 'index',index);
  const prix = +this.selectedConfection[index].prix 
  const qte = +this.confections.at(index).get('quantite')?.value
  console.log('boob',qte);
  
  const coutFabricationValue = +this.formgrp.get('coutFabrication')?.value || 0;
  this.formgrp.get('coutFabriaction')?.patchValue(coutFabricationValue-(prix*qte))
  this.selectedConfection.splice(index,1)
  console.log('remove handler', this.selectedConfection)
  this.remove(index)
}

addConfection(){
  for (let i = 0; i < this.confections.length; i++) {
    if(!(this.confections.at(i).get('libelle')?.value && this.confections.at(i).get('quantite')?.value)){
      this.firstRowEmptyError=true
      return
    }
  }
  this.firstRowEmptyError=false
 this.addControlConfection({article_id:'',libelle:'',quantite:'',categorie_libelle:''})
}
logFormValues() {
  for (let i = 0; i < this.confections.length; i++) {
    const confectionGroup = this.confections.at(i) as FormGroup;
    console.log(`Confection ${i + 1} - Libellé: ${confectionGroup.get('libelle')?.value}, Quantité: ${confectionGroup.get('quantite')?.value}, ID: ${confectionGroup.get('article_id')?.value}`);
  }
}

updateRef(event?:Event){
  if(!event && this.editMode!==0){
    this.labelTaken = !this.articlesVenteTab.some(elem=>elem.libelle===this.formgrp.get('libelle')?.value) 
    let refSuffix= this.editRef.slice(7)
    console.log(refSuffix)
    let libellePrefix = this.formgrp.value.libelle.slice(0,3).toUpperCase()
    const refBase = libellePrefix ? `REF_${libellePrefix}${refSuffix}` : ''
    this.formgrp.get('ref')?.patchValue(refBase);
    return
  }
  let id!:number
  if(event){
    id = +(event?.target as HTMLSelectElement).value
  }
  // this.confectionsInvalid = this.articlesConfectionTab.some(elem=>elem.libelle===this.formgrp.get('libelle')?.value) 
   this.labelTaken = this.articlesVenteTab.some(elem=>elem.libelle.toLowerCase()===this.formgrp.get('libelle')?.value.toLowerCase()) 
  let categ = this.typeVenteCategories.find(cat=>cat.id==+id); 
  let libellePrefix = this.formgrp.value.libelle.slice(0,3).toUpperCase()
  let categPrefix = categ ? categ.libelle.toUpperCase():''
  //this.x= categ?.total || 0
  const refBase = libellePrefix ? `REF_${libellePrefix}_${categPrefix}` : ''
  this.x = categ?.total || 0
  const refValue = this.x ? `${refBase}_${this.x}` : refBase;
  this.formgrp.get('ref')?.patchValue(refValue);

}
previewImage(event: any) {
  const selectedFile = event.target.files[0] 
  if(!this.extensions.includes(selectedFile.name.slice(-3))){
    this.wrongFileType=true
    return
  }
 else if (selectedFile) {
  
  this.formgrp.get('image')?.setValue(selectedFile)
   // this.selectedToEditImage=selectedFile
    const reader = new FileReader();
    reader.onload = (e: any) => {//event handler qui sexecute qd le file reading is done
      this.imagePreview = e.target.result;//assings the result of the file reading to the imgpreview
    };
    reader.readAsDataURL(selectedFile);
  } 
  else {
    this.imagePreview = null;
  }
}

isUlActive(index:number){
  return this.ulActive===index
}


searchConfection(searchTerm: any, index:number) {

 if(this.editMode!==0){
  this.ulActive=index
  console.log('index',index);
  let search = searchTerm.target.value
  if(search===''){
    this.selectedConfection.splice(index,1)
    this.confections.at(index).get('quantite')?.patchValue('')
    return
  }
  else if (/[^a-zA-Z]/.test(search)){
    this.confections.at(index).get('libelle')?.patchValue('')
    return
  }
  this.filteredConfections =this.articlesConfectionTab.filter(   
  confection => confection.libelle.toLowerCase().startsWith(search.toLowerCase())&& !this.selectedConfection.some(conf=>conf.id===confection.id))  
 }
 else{

   let search = searchTerm.target.value
   this.ulActive=index
   if (/[^a-zA-Z]/.test(search)){
    this.confections.at(index).get('libelle')?.patchValue('')
    return
  }
   else if(search===''){
     this.filteredConfections=[]
     return
   }
   
    this.filteredConfections =this.articlesConfectionTab.filter(
    confection => confection.libelle.toLowerCase().startsWith(search.toLowerCase()) && !this.selectedConfection.some(conf=>conf.id===confection.id))
   
 }
}

quantiteHandler(event:any,index:number){
  if(isNaN(event.target.value) ){
    this.confections.at(index).get('quantite')?.patchValue('')
  }
  else if(!this.confections.at(index).get('libelle')?.value){
    this.confections.at(index).get('quantite')?.patchValue('')
    this.quantityError=true
  }

}
selectConfection(confection:Article, index:number){
  console.log('bieste',confection.categorie.libelle)
  this.confections.at(index).get('libelle')?.patchValue(confection.libelle)
  this.confections.at(index).get('article_id')?.patchValue(confection.id)
  this.confections.at(index).get('categorie_libelle')?.patchValue(confection.categorie.libelle)
  this.selectedConfection.push(confection)
  this.handleConfectionsType()
  this.filteredConfections=[]  
}

calculateTotalCost(): number {
  let totalCost = 0;
  this.confections.controls.forEach(control => {
    const libelle = control.get('libelle')?.value;
    const quantite = control.get('quantite')?.value;
    const matchingArticle = this.articlesConfectionTab.find(article => article.libelle === libelle);
    if (matchingArticle) {
      totalCost += matchingArticle.prix * quantite;
    }
  });

  return totalCost;
}


handleConfectionsType(){
  //.slice(8).slice(0,-2)) 
  const types:string[]=['fils','bouton','tissu']
  this.existingTypes=this.selectedConfection.filter(conf=>types.includes(conf.categorie.libelle)
) 
  const valid = types.every(type=>this.existingTypes.some(t=>t.categorie.libelle===type))
  this.confectionsInvalid=!valid
  //this.confectionValidator()
  
}

validateConfections(){
  return (control: AbstractControl):ValidationErrors | null=>{
    const confections = control.value
    console.log('validd',this.existingTypes)
    if(!confections){
      return null
    }
    const isValid=this.existingTypes.length >=3
    return !isValid? {types:true}:null
  }
}


margeValidator()  {
  return (control: AbstractControl):ValidationErrors | null=>{

    const margeValue = control.value
    if(!margeValue){
      return null;
    }
    
    const coutFabricationValue =+ this.formgrp.get('coutFabrication')?.value;
    this.oneThird = parseFloat((coutFabricationValue / 3).toFixed(2))
    const isValid=margeValue >= 5000 && margeValue <= this.oneThird
    return !isValid? { margeRange: true }:null
    // if (margeValue >= 5000 && margeValue <= oneThird) {
    //   return null
    // } else {
    //   return { margeRange: true }
    // }
  }
}
private addControlConfection(data:any){
  const newConfecForm=this.groupmdr.group({
    article_id:[data.id],
    libelle:[data.libelle,Validators.required],
    quantite:[data.quantite,Validators.required],
    categorie_libelle:[data.categorie_libelle]
  })
  this.confections.push(newConfecForm)
}

private generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
submit(){
  let formData=new FormData()
  this.logFormValues()
  // let articleIds = [];
  // let quantities = [];
  // for (const control of this.confections.controls) {
  //   const id = control.get('article_id')?.value;
  //   let quantite = control.get('quantite')?.value;
  //   quantite = quantite ? parseInt(quantite, 10) : null;
  //   articleIds.push(id);
  //   quantities.push(quantite);
  // }
  this.formattedConfections = this.confections.controls.map(control => {
    const id = control.get('article_id')?.value
    const libelle = control.get('libelle')?.value
    let quantite = control.get('quantite')?.value
    quantite = quantite ? parseInt(quantite,10):null
    //const matchingArticle = this.articlesConfectionTab.find(article => article.libelle === libelle);
    return {
      article_id: id,
      quantite: quantite || null
    };
  });
  if(this.editMode!==0){
    let updatedFields=new FormData()
    for(let key in this.formgrp.value){
      if(this.originalArticle[key as keyof typeof this.originalArticle]!==this.formgrp.value[key]){
        if (key === 'confections') {
          updatedFields.append('confection',JSON.stringify(this.formattedConfections))
        } else if (key !== 'coutFabrication') { // skip coutFabrication
          updatedFields.append(key, this.formgrp.value[key]);
      }
      }
    }
    updatedFields.append('_method', "PUT");
    updatedFields.forEach((value, key) => {
         console.log(`${key}: ${value}`);
        
       })
    this.submitEvent.emit(updatedFields)
    return
  }
this.formattedConfections = this.confections.controls.map(control => {
  const id = control.get('article_id')?.value
  const libelle = control.get('libelle')?.value
  let quantite = control.get('quantite')?.value
  quantite = quantite ? parseInt(quantite,10):null
  return {
    article_id: id,
    quantite: quantite || null
  };
});

formData.append('libelle', this.formgrp.get('libelle')?.value);
formData.append('prix', this.formgrp.get('prix')?.value);
formData.append('marge', this.formgrp.get('marge')?.value);
formData.append('stock', this.generateRandomNumber(1,400).toString() );
formData.append('ref', this.formgrp.get('ref')?.value);
formData.append('categorie_id', this.formgrp.get('categorie_id')?.value);
const imageFile = this.formgrp.get('image')?.value
if (imageFile instanceof File)formData.append('image', imageFile);  
formData.append('confection',JSON.stringify(this.formattedConfections))
if(this.formgrp.get('promo')?.value)formData.append('promo', this.formgrp.get('promo')?.value);
formData.forEach((value, key) => {
console.log(`${key}: ${value}`)})
this.submitEvent.emit(formData)
}
}
