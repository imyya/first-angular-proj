import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';
import { NonNullAssert } from '@angular/compiler';
import { Response } from '../interface/response';
import { Category } from '../interface/category';
import { Data } from '../interface/data';
import { CategoryResponse } from '../interface/category-response';
@Component({
  selector: 'app-categ',
  templateUrl: './categ.component.html',
  styleUrls: ['./categ.component.css'],
  providers:[CategoryService]
})
export class CategComponent implements OnInit {
    isActive: boolean = false;
    formT!: FormGroup;

    categories:Category[]=[]
    pagination:number=1
    last:number=0
    currentPage:number=1
    categData={
      libelle:''
    }
    IdsToBeDeleted:number[]=[]
    ajoutModeControl:boolean=true;
    libelle:string=''
    
    deacButton:boolean=true
    checkedboxes:number[]=[]
    modifiedInput:string=''
    isEdit=false
    idEdit=0
    deleteBtn:boolean=true
    isChecked:number[]=[]
    activDelete=true
    allchecked=false
    head=false
    disableInput=true


    constructor(private breukh:FormBuilder, private categoryService:CategoryService){

    }

    ngOnInit():void{
    this.fetchCategs()
    console.log('ajout',this.ajoutModeControl)
    

    this.formT=this.breukh.group({
      libelle:['']
    })

    

    




  }
  
   

 fetchCategs(){
    this.categoryService.getCategData(this.currentPage).subscribe((response:Response<CategoryResponse>)=>{
      console.log('response',response.data.categories)
    this.categories=response.data.categories
    this.last=response.data.last_page
    console.log(this.categories)
    
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

    // submitForm(){
    //   console.log('lol')
    //   this.categoryService.postData(this.categData).subscribe(
    //     (resp)=>{
    //     console.log(resp)
        
    //   })
      
      
    // }

    submitFormFn(){
      if(this.ajoutModeControl && this.idEdit===0){
        this.categoryService.postData(this.formT.value).subscribe(
          (resp)=>{
          console.log(resp)
          this.formT.reset()
          this.fetchCategs()
      })
      }
      else{
       let toBeUpdated = this.categories.find(cat=>cat.id===this.idEdit)
       if(toBeUpdated){
        toBeUpdated.libelle=this.modifiedInput
       }
        
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

  // collectCheckedCategories() {
  //   const checkedCategories = this.categories.filter(category => category.checkedControl.value);
  //   console.log('Checked Categories:', checkedCategories);
  // }



  isValid(input:any){ 
   
    console.log('merde',input.value)
    if(input.value.length>=3 && this.ajoutModeControl){
      console.log('for too long');
      
    this.deacButton= this.categories.some((elem:any)=>elem.libelle===input.value)
    }
    else if(input.value.length>=3 && this.idEdit!=0){
      this.deacButton= this.categories.some((elem:any)=>elem.libelle===input.value)

    }
    
    else if(!this.deacButton){
      console.log('sooo');
      
      this.deacButton=true

    }
  }

  areChecked(event:any,id:number){
    console.log('one input', event)

    if(!this.ajoutModeControl  && event.target.checked===true ){

      console.log('ibrahim')

      if(!this.checkedboxes.find(boxid=>boxid===id)){
        this.checkedboxes.push(id)
      }
      if(this.checkedboxes.length===this.categories.length){
        console.log('they same length')
        this.head=true
      }
      console.log('voici id',this.checkedboxes)
      this.deleteBtn=false
  }
    else if(!this.ajoutModeControl  && event.target.checked===false){

      this.head=false
      this.checkedboxes=this.checkedboxes.filter(box=>box!=id)
      if(this.checkedboxes.length===0){
        this.deleteBtn=true
      }
      console.log('after removing',this.checkedboxes)
    }


  }

  delete(){
    this.categories=this.categories.filter(cat=>!this.checkedboxes.includes(cat.id))
   
      this.head=false
    
  }

  display(event:any,id:number){
    if(!this.ajoutModeControl){

      this.idEdit=id
      let found = this.categories.find((cat)=>cat.id===id)
      if(found){
       // this.isEdit=true
      this.modifiedInput=found.libelle
      
      // if(this.modifiedInput.length>=3  ){
        
      // this.deacButton= this.categories.some((elem:any)=>elem.libelle===this.modifiedInput)
      // }
      // else if(!this.deacButton){
        
      //   this.deacButton=true
  
      // }
      }
        
    }
  
  }

  // getChecked(event:any, id:number|null){
  //   console.log('a lentree', this.categories)
  //   if(!this.ajoutModeControl  && event.target.checked===true && !id){
  //    // this.checkedboxes=[]
  //     console.log('first case: the checkedboxes',this.checkedboxes, 'the categories',this.categories)

  //     this.categories.forEach(cat=>{
      
  //      this.checkedboxes.push(cat.id)
  //       cat.checked=true
  //     })
  //     this.categories=this.categories
  //     console.log('first case the head:',this.head)
  //   }
  //   else if(!this.ajoutModeControl  && event.target.checked===false && !id){
      
  //     console.log('uncheck dad case: the checkedboxes',this.checkedboxes, 'the categories',this.categories)
  //     this.categories.forEach(cat=>{
  //       cat.checked=false
  //       console.log(cat.id,'is checked',cat.checked )

  //     })
  //     //this.categories=this.categories
  //     this.checkedboxes=[]


  //   }
  //   else if(!this.ajoutModeControl && event.target.checked===true && id && this.checkedboxes.length==(this.categories.length-1)){
  //     if(!this.checkedboxes.includes(id)){

  //       this.checkedboxes.push(id)
  //     }
  //     this.head=true
     
  //     this.categories.forEach(cat=>{
  //        cat.checked=true
         
  //      })
  //     console.log('second case head value:',this.head)
  //     console.log('second case',this.checkedboxes)



  //   }
  //   else if(!this.ajoutModeControl && event.target.checked===false && id ){
  //     console.log('third case checkx',this.checkedboxes)
  //     this.checkedboxes=this.checkedboxes.filter(box=>box!=id)
  //     let theUnchecked= this.categories.find(cat=>cat.id==id)
  //     if(theUnchecked){
  //       theUnchecked.checked=false
  //     }
  //     console.log('third case',this.checkedboxes)
  //     //this.categories=this.categories


  //   }
  //   else if(!this.ajoutModeControl && event.target.checked===true && id){
      
  //     if(!this.checkedboxes.includes(id)){

  //       this.checkedboxes.push(id)
  //     }
  //     let newChecked= this.categories.find(cat=>cat.id==id)
  //     if(newChecked){
  //       newChecked.checked=true
  //     }
      
  //     console.log('fourth case',this.categories, this.checkedboxes)

  //   }



  // }


  getChecked(event: any, id: number | null) {

    if (!this.ajoutModeControl && !id) {
      // Clique sur la case a cocher papa
      this.head = event.target.checked;
      this.categories.forEach(cat => (cat.checked = this.head));
      this.checkedboxes = this.head ? this.categories.map(cat => cat.id) : [];
      this.deleteBtn=!this.head
    } 
    else if (!this.ajoutModeControl && id) {
      // Clique sur les cases enfants
      const clickedCategory = this.categories.find(cat => cat.id === id);
      if (clickedCategory) {
        clickedCategory.checked = event.target.checked;
        if (event.target.checked) {
          this.checkedboxes.push(id);
          this.deleteBtn=false

        } else {
          this.checkedboxes = this.checkedboxes.filter(box => box !== id);
          if(this.checkedboxes.length===0){

            this.deleteBtn=!this.deleteBtn
            console.log('im hahah');
            
          }
        }
  
        const allChildrenChecked = this.categories.every(cat => cat.checked);
        this.head = allChildrenChecked;
        if(this.head){
          this.deleteBtn=false

        }
      }
    }
  }
  



  checkAll(event:any){
    console.log('event',event)
    if(event.target.checked && !this.ajoutModeControl){
      this.head=true
      this.categories.forEach(cat=>{
      //this.isChecked.push(cat.id)
      console.log('check all')
      this.checkedboxes.push(cat.id)
      })
      this.categories.forEach(cat=>{
        cat.checked=this.checkedboxes.includes(cat.id)
      })      
      this.deleteBtn=false
    }
    else{

      this.isChecked=[]
      this.checkedboxes=[]
      this.deleteBtn=true
      this.categories.forEach(cat=>{
        cat.checked=this.checkedboxes.includes(cat.id)
      }) 
    }
  }
}
