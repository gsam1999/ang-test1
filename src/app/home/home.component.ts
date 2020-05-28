import { Component, OnInit,Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Feature } from '../shared/feature';
import { FeatureService } from '../services/feature.service';
import { flyInOut,expand } from '../animations/app.animation'; 


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  host:{
    '[@flyInOut]':'true',
    'style': 'display:block;'
  },
  animations:[
    flyInOut(),expand()
  ]
})
export class HomeComponent implements OnInit {

  dish:Dish;
  promotion:Promotion;
  leader:Feature;
  dishErrMsg : string;

  constructor(private dishSerivce:DishService, 
    private promotionService:PromotionService,
    private featureService:FeatureService,
    @Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void {

    this.dishSerivce.getFeaturedDish()
    .subscribe((val)=>this.dish = val,err=> this.dishErrMsg=<any>err);

    this.promotionService.getFeaturedPromotion()
    .subscribe((val)=>this.promotion = val[0]);
    
    this.featureService.getFeaturedLeader()
    .subscribe((val1)=>{this.leader=val1[0];console.log(val1);});

  }

}
