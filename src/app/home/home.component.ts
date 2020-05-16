import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Feature } from '../shared/feature';
import { FeatureService } from '../services/feature.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dish:Dish;
  promotion:Promotion;
  leader:Feature;

  constructor(private dishSerivce:DishService, 
    private promotionService:PromotionService,
    private featureService:FeatureService) { }

  ngOnInit(): void {

    this.dish = this.dishSerivce.getFeaturedDish();
    this.promotion = this.promotionService.getFeaturedPromotion();
    this.leader = this.featureService.getFeaturedLeader();

  }

}
