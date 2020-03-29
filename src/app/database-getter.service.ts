import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest,HttpHeaders,HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Router} from '@angular/router';
import { matchups } from './matchups';

@Injectable()
export class DatabaseGetterService {
	public endpoint = 'http://ec2-18-220-84-74.us-east-2.compute.amazonaws.com:8080/matchups';
	public errorMsg;
	public listData;
	public loadedData = false;
	public limitPerPage = 25;
	public testComponentCallback;
	public testComponent;
	public championData;
	public matchupindex;
	constructor(private http:HttpClient,private router:Router) { 
		this.http.get('./assets/champData.json')
				 .subscribe(data => this.championData = data); 	
		this.matchupindex = 0;
	}

	getMatchups():Observable<matchups[]>{
		let a : Observable<matchups[]> = this.http.get<matchups[]>(this.endpoint);
		a.subscribe(
		data => {
			this.listData=data;
			this.loadedData=true;
			this.testComponentCallback(this);
			console.log("loaded data");
		},
		error => {
			this.loadedData=true;
			this.errorMsg = error
		});	
		return a;
	}
	
	runTest(){
		let a = this.http.get(this.endpoint+'/runTest/');
		a.subscribe(
		data => {
		},
		error => {
			this.errorMsg = error
		});	
	}
	handleError() {
		
	}
	
}
