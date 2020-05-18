import { Injectable } from '@angular/core';
import { Feature } from '../shared/feature';
import { Features } from '../shared/features';
import { promise } from 'protractor';
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})

export class FeatureService {

  constructor() { }

  getFeatures(): Promise<Feature[]>
  {
    return new Promise(resolve => {
      setTimeout( ()=>resolve(Features), 2000);
    } );
  }

  getFeature(id:string): Promise <Feature>
  {
    return new Promise( resolve => {
      setTimeout(() => resolve( Features.filter( (feature) => id ===feature.id )[0] ) , 2000)
    });
    }

  getFeaturedLeader():Promise<Feature>
  {
    return Promise.resolve(Features.filter((feature)=> feature.featured === true )[0]);
  }

}
