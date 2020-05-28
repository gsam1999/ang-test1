import { Injectable,Inject } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { of,Observable } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseURL } from "../shared/baseurl";
import { ProcessHTTPMsgService } from "./process-httpmsg.service";

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(public http:HttpClient,@Inject('BaseURL') public BaseURL) { }

  getPromotions(): Promise<Promotion[]>
  {
    return Promise.resolve(PROMOTIONS);
  }

  getPromotion(id:string): Promise<Promotion>{

    return Promise.resolve(PROMOTIONS.filter((dish)=> dish.id === id )[0]);
  }

  getFeaturedPromotion(): Observable<Promotion> {
    // return Promise.resolve(PROMOTIONS.filter((dish)=> dish.featured )[0]);
    return this.http.get<Promotion>(baseURL+'promotions?featured=true');
  }


}
