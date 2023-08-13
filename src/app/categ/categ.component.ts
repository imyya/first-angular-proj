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
    IdsToBeDeleted:number[]=[]
    editModeControl: FormControl = new FormControl(false);
    libelle:string=''
    
    deacButton:boolean=true
    checkedboxes:number[]=[]
    modifiedInput:string=''
    isEdit=false
    idEdit=0
    deleteBtn:boolean=true


    constructor(private breukh:FormBuilder, private categoryService:CategoryService){

    }

    ngOnInit():void{
    this.fetchCategs()
    

    this.formT=this.breukh.group({
      libelle:['']
    })

    

    


  }
  
   

 fetchCategs(){
    this.categoryService.getCategData(this.currentPage).subscribe((response:any)=>{
    this.categories=response.data.data
    this.last=response.data.last_page
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
      if(!this.isEdit){
        this.categoryService.postData(this.formT.value).subscribe(
          (resp)=>{
          console.log(resp)
          this.formT.reset()
      })
      }
      else{
        this.categoryService.updateData(this.idEdit,this.formT.value).subscribe(
          (resp:any)=>{
            console.log(resp)
            this.formT.reset()
            this.fetchCategs()



          }
        )
      }
       
      
    }

  // storeIdToBeDeleted(){
  //   this.IdsToBeDeleted=Object.keys(this.form2.controls)//extract an array of keys which here are the ids
  //   .filter((id)=> this.form2.controls[id].value)
  //   .map(id=>+id)

  //   //formGroup is a container for form controls. A form control is an objct and when you form2.controls you access 
  //   //an ojb that holds references to all the controls within the formgroup ex myForm.controls['username'] now one you do this
  //   //u rmyForm.controls['username']retrieve the FormControl associated with username and this FormControl (in reactiv form) contains various property and methods that provide comprehensive control over the form control's behavior and interaction
  //   //like value, myForm.controls.[email].value 
  //   console.log('they getting deleted', this.IdsToBeDeleted)
  // }

  collectCheckedCategories() {
    const checkedCategories = this.categories.filter(category => category.checkedControl.value);
    console.log('Checked Categories:', checkedCategories);
  }



  isValid(input:any){ 
    if(input.value.length>=3  ){
    this.deacButton= this.categories.some((elem:any)=>elem.libelle===input.value)
    }
    else if(!this.deacButton){
      this.deacButton=false
    }
  }

  areChecked(event:any,id:number){
    this.deleteBtn=false

    if(event.target.checked===true)

    this.checkedboxes.push(id)
    console.log('voici id',this.checkedboxes)
  }

  delete(){
    this.categoryService.deleteData(this.checkedboxes).subscribe((resp)=>{
      console.log(resp)
      this.fetchCategs()


    })
  }

  display(event:any,id:number){
    this.idEdit=id
    let found = this.categories.find((cat)=>cat.id===id)
    this.modifiedInput=found.libelle
    this.isEdit=true
    

  }
}

