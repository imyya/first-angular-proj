import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';
import { NonNullAssert } from '@angular/compiler';
@Component({
  selector: 'app-categ',
  templateUrl: './categ.component.html',
  styleUrls: ['./categ.component.css'],
  providers:[CategoryService]
})
export class CategComponent implements OnInit {
    isActive: boolean = false;
    formT!: FormGroup;

    categories:any[]=[]
    paginationLinks:any[]=[]
    //nextPageUrl: string | null = null
    pagination:number=1
    last:number=0
    currentPage:number=1
    categData={
      libelle:''
    }
    form2!:FormGroup
    IdsToBeDeleted:number[]=[]
    editModeControl: FormControl = new FormControl(false);


    constructor(private breukh:FormBuilder, private categoryService:CategoryService){

    }

    ngOnInit():void{
    //  this.form = this.breukh.group({
    //   libelle: [''],
    //   prix:['']
    //  });

    this.formT=this.breukh.group({
      libelle:['',[Validators.required,this.libelleValidator(this.categories)]]
    })
    this.fetchCategs()

    this.form2=this.breukh.group({})
    this.categories.forEach(category=>{
      category.checkedControl=new FormControl(false)
      this.form2.addControl(category.id.toString(),category.checkedControl)
      console.log(`Form control name for category ${category.id}: ${category.id.toString()}`);
    })


  }
  
   

  fetchCategs(){
    this.categoryService.getCategData(this.currentPage).subscribe((response:any)=>{
      this.categories=response.data.data
      this.paginationLinks=response.data.links
      this.last=response.data.last_page
      console.log(this.categories)
      console.log(this.last)

     
   })
   }
   renderPage(event:number){
    this.pagination=event
    this.fetchCategs()
   }


    toggleButton() {
      this.isActive = !this.isActive;
    }

    submitFn(){
      console.log(this.formT.value);
      
    }

    next(){
      
      if(this.currentPage+1>=this.last) return
      this.currentPage++
      this.fetchCategs()

    }

    previous(){
      if(this.currentPage-1<1) return
      this.currentPage--
      this.fetchCategs()

    }

    gotopage(page:number){
      this.currentPage=page
      this.fetchCategs()
    }

    submitForm(){
      console.log('lol')
      this.categoryService.postData(this.categData).subscribe(
        (resp)=>{
        console.log(resp)
        
      })
      
      
    }

    submitFormFn(){
      if(this.formT.valid){
        console.log('c valid',this.formT.value)
        this.categoryService.postData(this.formT.value).subscribe(
          (resp)=>{
          console.log(resp)
          
        })
        this.formT.reset()
      }
    }


    libelleValidator(categ:string[]){//AbstractControl allows access to the control value
      return (control:AbstractControl):ValidationErrors | null=>{
        const libelle = control.value?.trim()
        if(libelle && libelle.length>=3 && !categ.includes(libelle)){
          return null
        }
        return {libelleUniq:true}
      }
    }

  storeIdToBeDeleted(){
    this.IdsToBeDeleted=Object.keys(this.form2.controls)//extract an array of keys which here are the ids
    .filter((id)=> this.form2.controls[id].value)
    .map(id=>+id)

    //formGroup is a container for form controls. A form control is an objct and when you form2.controls you access 
    //an ojb that holds references to all the controls within the formgroup ex myForm.controls['username'] now one you do this
    //u rmyForm.controls['username']retrieve the FormControl associated with username and this FormControl (in reactiv form) contains various property and methods that provide comprehensive control over the form control's behavior and interaction
    //like value, myForm.controls.[email].value 
    console.log('they getting deleted', this.IdsToBeDeleted)
  }
}

