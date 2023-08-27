import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Input } from '@angular/core';
import { Category } from 'src/app/interface/category';
import { Article } from 'src/app/interface/article';

@Component({
  selector: 'app-vform',
  templateUrl: './vform.component.html',
  styleUrls: ['./vform.component.css']
})
export class VformComponent implements OnInit {
constructor(private groupmdr: FormBuilder){}
@Input() typeVenteCategories:Category[]=[]
@Input() articlesConfectionTab:Article[]=[]
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

ngOnInit(): void {
  this.formgrp=this.groupmdr.group({
    confections:this.groupmdr.array([]),
    libelle:['',Validators.required],
    categorie_id:['',Validators.required],
    promoValue:[''],
    coutFabrication:[''],
    marge:['',[Validators.required, this.margeValidator()]],
    prix:[''],
    ref:[''],
    image:['',Validators.required]


  })
  this.confections.valueChanges.subscribe(() => {
    const totalCost = this.calculateTotalCost();
    this.formgrp.get('coutFabrication')?.patchValue(totalCost);
    this.fabricationCout=totalCost
  });
}
toggleCheck(){
  this.promoChecked=!this.promoChecked
}



get confections():FormArray{
  return this.formgrp.controls['confections'] as FormArray
}

addConfection(){
  const newConfecForm=this.groupmdr.group({
    libelle:['',Validators.required],
    quantite:['',Validators.required]
  })
  this.confections.push(newConfecForm)
}
logFormValues() {
  for (let i = 0; i < this.confections.length; i++) {
    const confectionGroup = this.confections.at(i) as FormGroup;
    console.log(`Confection ${i + 1} - Libellé: ${confectionGroup.get('libelle')?.value}, Quantité: ${confectionGroup.get('quantite')?.value}`);
  }
}

updateRef(event?:Event){
  if(!event && this.editArticleId!==0){
    // this.labelTaken = this.allArticles.some(elem=>elem.libelle===this.articleForm.get('libelle')?.value) 
    // let refSuffix= this.editRef.slice(7)
    // console.log(refSuffix)
    // let libellePrefix = this.articleForm.value.libelle.slice(0,3).toUpperCase()
    // const refBase = libellePrefix ? `REF_${libellePrefix}${refSuffix}` : ''
    // this.articleForm.get('ref')?.patchValue(refBase);
    // return


  }
  let id!:number
  if(event){

     id = +(event?.target as HTMLSelectElement).value
  }
  // this.labelTaken = this.allArticles.some(elem=>elem.libelle===this.articleForm.get('libelle')?.value) 

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
  console.log('le gars',selectedFile.name);
  if(!this.extensions.includes(selectedFile.name.slice(-3))){
   // this.labelTaken=true
    return
  }
  
  this.formgrp.get('image')?.setValue(selectedFile)
 // this.selectedToEditImage=selectedFile

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

isUlActive(index:number){
  return this.ulActive===index
}
searchConfection(searchTerm: any, index:number) {
    
  let search = searchTerm.target.value
  this.ulActive=index
  if(search===''){
   // console.log('tired')
    this.filteredConfections=[]
    return
  }
  console.log('filtrd',this.articlesConfectionTab)

   this.filteredConfections =this.articlesConfectionTab.filter(
   confection => confection.libelle.toLowerCase().includes(search.toLowerCase()) && !this.selectedConfection.some(conf=>conf.id===confection.id))
  
}

selectConfection(confection:Article, index:number){
  this.confections.at(index).get('libelle')?.patchValue(confection.libelle)
  this.selectedConfection.push(confection)
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

margeValidator()  {
  return (control: AbstractControl):ValidationErrors | null=>{

    const margeValue = control.value
    if(!margeValue){
      return null;
    }
    const coutFabricationValue =+ this.formgrp.get('coutFabrication')?.value;
    const oneThird = coutFabricationValue / 3
    const isValid=margeValue >= 5000 && margeValue <= oneThird
    return !isValid? { margeRange: true }:null
    // if (margeValue >= 5000 && margeValue <= oneThird) {
    //   return null
    // } else {
    //   return { margeRange: true }
    // }
  }
}



submit(){
console.log('babe',this.formgrp.value)
this.formattedConfections = this.confections.controls.map(control => {
  const libelle = control.get('libelle')?.value;
  const quantite = control.get('quantite')?.value;
  const matchingArticle = this.articlesConfectionTab.find(article => article.libelle === libelle);

  return {
    article_id: matchingArticle ? matchingArticle.id : null,
    quantite: quantite || null
  };
});
console.log('heww', this.fabricationCout)
}

}
