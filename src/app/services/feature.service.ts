import { Injectable } from '@angular/core';
import { Feature } from '../shared/feature';
import { Features } from '../shared/features';
import { promise } from 'protractor';
import { resolve } from 'dns';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { baseURL } from "../shared/baseurl";
import { ProcessHTTPMsgService } from "./process-httpmsg.service";

@Injectable({
  providedIn: 'root'
})

export class FeatureService {

  constructor( private http:HttpClient , private processHTTPMsgService:ProcessHTTPMsgService ) { }

  getFeatures(): Observable<Feature[]>
  {
    // return new Promise(resolve => {
    //   setTimeout( ()=>resolve(Features), 2000);
    // } );
    return this.http.get<Feature[]>(baseURL+'leadership')
    .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  getFeature(id:string): Promise <Feature>
  {
    return new Promise( resolve => {
      setTimeout(() => resolve( Features.filter( (feature) => id ===feature.id )[0] ) , 2000)
    });
    }

  getFeaturedLeader():Observable<Feature>
  {
    //return Promise.resolve(Features.filter((feature)=> feature.featured === true )[0]);
    return this.http.get<Feature>(baseURL+'leadership?featured=true')
    .pipe(catchError(this.processHTTPMsgService.handleError));

  }

}
