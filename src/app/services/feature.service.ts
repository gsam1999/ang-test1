import { Injectable } from '@angular/core';
import { Feature } from '../shared/feature';
import { Features } from '../shared/features';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})

export class FeatureService {

  constructor() { }

  getFeatures(): Promise<Feature[]>
  {
    return Promise.resolve(Features);
  }
  getFeature(id:string): Promise <Feature>
  {
    return Promise.resolve(Features.filter((feature) => id ===feature.id )[0]);
  }

  getFeaturedLeader():Promise<Feature>
  {
    return Promise.resolve(Features.filter((feature)=> feature.featured === true )[0]);
  }

}
