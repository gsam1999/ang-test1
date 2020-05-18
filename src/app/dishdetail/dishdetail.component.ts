import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service'
import { switchMap } from 'rxjs/operators';

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


  constructor( private dishService:DishService, private location:Location, private route:ActivatedRoute) { }

  ngOnInit(): void {
    
    this.dishService.getDishIds()
    .subscribe(val=> this.dishIds=val);

    this.route.params.pipe( switchMap( (params:Params) => this.dishService.getDish(params['id'] ) ) )
    .subscribe((dish)=> {this.dish=dish; this.setPrevNext(dish.id)} );
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

}
