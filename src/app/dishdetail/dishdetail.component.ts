import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  private _dish:Dish;

  @Input()
  set dish(dish:Dish){
      this._dish = dish;
  }

  get dish():Dish
  {
    return this._dish;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
