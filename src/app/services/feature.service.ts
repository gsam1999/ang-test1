import { Injectable } from '@angular/core';
import { Feature } from '../shared/feature';
import { Features } from '../shared/features';

@Injectable({
  providedIn: 'root'
})

export class FeatureService {

  constructor() { }

  getFeatures():Feature[]
  {
    return Features;
  }
  getFeature(id:string):Feature
  {
    return Features.filter((feature) => id ===feature.id )[0];
  }

  getFeaturedLeader():Feature
  {

    return Features.filter((feature)=> feature.featured === true )[0];
  }

}
