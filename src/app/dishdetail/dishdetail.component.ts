import { Component, OnInit, Input ,Inject,ViewChild} from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { Params,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service'
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators, FormBuilder, } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { trigger, state, style, animate, transition } from  '@angular/animations';
import { visibility,flyInOut,expand } from '../animations/app.animation'; 

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style': 'display:block;'
  },
  animations:[ visibility(),flyInOut(),expand() ]
})
export class DishdetailComponent implements OnInit {

  //private dish:Dish;
  // @Input()
  // set dish(dish:Dish){
  //     this._dish = dish;
  // }
 
  // get dish():Dish
  // {
  //   return this._dish;
  // }

  dish:Dish;
  dishIds:string[];
  prev:string;
  next:string;
  errMess:string;
  
  date:Date;

  dishCopy:Dish;

  commentForm : FormGroup;
  newComment : Comment; 
  visibility = 'shown';

  formErrors = {
    'author':'',
    'rating':'',
    'comment':''
  };

  erroeMessages={
    'author':{
      'required':'This is a required field',
      'minlength':' atleast 2 charrs',
      'maxlength':' max 20 chars'
    }, 
    'rating':{
      'required': "this is a required field"
    },
    'comment':{
      'required':'This is a required field',
      'minlength':' atleast 2 charrs',
      'maxlength':' max 20 chars'
    }
  }


  @ViewChild('cform') formPage;

  constructor( private dishService:DishService, private location:Location, private fb:FormBuilder,
    private route:ActivatedRoute,
     @Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void {
    
    this.createForm();

    this.date = new Date;

    this.dishService.getDishIds()
    .subscribe(val=> this.dishIds=val );

    this.route.params.pipe( switchMap( (params:Params) => { this.visibility='hidden'; return this.dishService.getDish(params['id']);} ) )
    .subscribe((dish)=> {this.dish=dish; this.setPrevNext(dish.id); this.dishCopy = dish;this.visibility="shown";} , errmess => this.errMess=<any>errmess);
  }

  setPrevNext(dishId: string)
  {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[ (this.dishIds.length + index-1) % this.dishIds.length ];
    this.next = this.dishIds[ (this.dishIds.length + index+1) % this.dishIds.length ];

    console.log(this.prev);
    console.log(this.next);
  }

  goBack():void{

    this.location.back();
  } 

  createForm():void{
    this.commentForm = this.fb.group({
      author : ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]] ,
      rating: ['5',Validators.required],
      comment: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]]
    });

    this.commentForm.valueChanges.subscribe(data => this.onInputChange(data));

    this.onInputChange();

  }

  onInputChange( data ?:any ):void
  {
      //console.log(data);
      if(!this.commentForm)
      {
        return;
      }

      let form = this.commentForm;
      for(const field in this.formErrors){
        if(this.formErrors.hasOwnProperty(field))
        {
          this.formErrors[field]="";
          const control = form.get(field);
          if(control && control.dirty && !control.valid)
          {
            const messages = this.erroeMessages[field];
            for(const key in control.errors)
            {
              if(control.errors.hasOwnProperty(key))
              {
                this.formErrors[field]+=messages[key]+' ';
              }
            }
          }
        }
      }
    }

  onSubmit():void{
    this.newComment = this.commentForm.value;
    //console.log(this.newComment);
    this.commentForm.reset({
      author:"",
      rating:"5",
      comment:""
    });

    this.newComment.date = this.date.toISOString();

    //console.log(this.formPage.status);
    //console.log(this.dish);

    this.dishCopy.comments.push(this.newComment);
    this.dishService.putDish(this.dishCopy).subscribe(dish=>{
      this.dish = dish;
      this.dishCopy = dish;
     }, 
     errmess => { this.dish=null; this.dishCopy = null; this.errMess = <any>errmess });
    this.formPage.resetForm();

  }

}
