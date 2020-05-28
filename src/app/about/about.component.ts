import { Component, OnInit,Inject } from '@angular/core';
import { Feature } from '../shared/feature';
import { FeatureService } from '../services/feature.service';
import { flyInOut,expand } from '../animations/app.animation'; 
import { baseURL } from "../shared/baseurl";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  host:{
    '[@flyInOut]':'true',
    'style': 'display:block;'
  },
  animations:[
    flyInOut(),expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders:Feature[];

  constructor(private featureService:FeatureService, @Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void {

    this.featureService.getFeatures()
    .subscribe( (val) => this.leaders=val );
  } 

}
