import { Component, OnInit, Input ,Inject,ViewChild} from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { Params,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service'
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormControl,Validators, FormBuilder, } from "@angular/forms";

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
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

  commentForm : FormGroup;
  newComment : Comment; 

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

    this.route.params.pipe( switchMap( (params:Params) => this.dishService.getDish(params['id'] ) ) )
    .subscribe((dish)=> {this.dish=dish; this.setPrevNext(dish.id)} , errmess => this.errMess=<any>errmess);
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

    this.dish.comments.push(this.newComment);
    this.formPage.resetForm();

  }

}
