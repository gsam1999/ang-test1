import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { resolve } from 'dns';
import { of,Observable } from 'rxjs';
import { delay,map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { baseURL } from "../shared/baseurl";


@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor( private http:HttpClient) { }

  //using observabless

  getDishes():Observable<Dish[]>
  {
    return this.http.get<Dish[]>(baseURL+'dishes');
  }

  getDish(id:string): Observable<Dish>
  {  
    return this.http.get<Dish>(baseURL+'dishes/'+id);
    //return of(DISHES.filter((dish)=> dish.id === id )[0]).pipe(delay(2000)) ;
  }

  getFeaturedDish(): Observable<Dish>{

    return this.http.get<Dish>(baseURL+'dishes?featured=true').pipe( map(dishes => dishes[0]) );
    //return of(DISHES.filter((dish)=> dish.featured )[0]).pipe(delay(2000)) ;
    
  }

  getDishIds(): Observable<string[] | any>
  {
    return this.getDishes().pipe(map( dishes => dishes.map( dish => dish.id) ))
    //return of( DISHES.map( dish => dish.id ) ).pipe(delay(2000));
  }
}
