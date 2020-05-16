import { Component, OnInit } from '@angular/core';
import { Feature } from '../shared/feature';
import { FeatureService } from '../services/feature.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  leaders:Feature[];

  constructor(private featureService:FeatureService) { }

  ngOnInit(): void {

    this.featureService.getFeatures()
    .then( (val) => this.leaders=val );
  }

}
