import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../shared/feedback';
import { HttpClient } from '@angular/common/http';
import { baseURL} from "../shared/baseurl";

@Injectable({
  providedIn: 'root'
})

export class FeedbackService {

  constructor(public http:HttpClient) { }

  createFeedback(feedback:Feedback):Observable<Feedback>
  {
    return this.http.post<Feedback>(baseURL+'feedback', feedback);
  }

}
