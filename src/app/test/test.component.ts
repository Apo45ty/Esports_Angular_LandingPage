import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { DatabaseGetterService } from '../database-getter.service';
import {Chart} from 'chart.js';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  public errorMsg;
  public dbService;
  public graphVals;
  constructor(private _databaseService:DatabaseGetterService,
			  private router:Router) { 
		this._databaseService.testComponentCallback = this.getPlotData;
		this.dbService = this._databaseService;
  }
  ngOnInit() {
	}
  setGraph(value){
	this.graphVals = value;
	console.log(this.graphVals)
	this.getPlotData(this.dbService);
	}
  getPlotData(dbService){
	let chartColors = {
		red: 'rgb(255, 99, 132)',
		orange: 'rgb(255, 159, 64)',
		yellow: 'rgb(255, 205, 86)',
		green: 'rgb(75, 192, 192)',
		blue: 'rgb(54, 162, 235)',
		purple: 'rgb(153, 102, 255)',
		grey: 'rgb(201, 203, 207)'
	};
	let config = {
		type: 'line',
		data: {
			labels: ['1', '2', '3', '4', '5', '6', '7'],
			datasets: [{
				label: 'Runtime Plot',
				fill: false,
				backgroundColor: chartColors.blue,
				borderColor: chartColors.blue,
				data: [
				10,11
				],
			}]
		},
		options: {
			responsive: true,
			title: {
				display: true,
				text: 'Line Graph'
			},
			tooltips: {
				mode: 'index',
				intersect: false,
			},
			hover: {
				mode: 'nearest',
				intersect: true
			},
			scales: {
				xAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Periods'
					}
				}],
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Miliseconds'
					}
				}]
			}
		}
	};
	//Remove the line graph from dom and add a new element with same id
	let para = document.createElement("canvas");
	let att = document.createAttribute("id");       
	att.value = "canvas";                           
	para.setAttributeNode(att);
	let element = document.getElementById("canvasParrent");
	let child = document.getElementById("canvas");
	const myNode = document.getElementById("canvasParrent");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}
	element.appendChild(para);
	
	//Get the data for the graphs
	config.data.labels[0]='0-10 minutes';
	config.data.labels[1]='10-20 minutes';
	config.data.labels[2]='20-30 minutes';
	config.data.labels[3]='30-40 minutes';
	config.data.labels[4]='40-50 minutes';
	config.data.labels[5]='50-60 minutes';
	let a = [5];
	if(this.graphVals == "Gold"){
		a[0] = parseFloat(dbService.listData[dbService.matchupindex]["goldpermindeltas010"]);
		a[1] = parseFloat(dbService.listData[dbService.matchupindex]["goldpermindeltas1020"]);
		a[2] = parseFloat(dbService.listData[dbService.matchupindex]["goldpermindeltas2030"]);
		a[3] = parseFloat(dbService.listData[dbService.matchupindex]["goldpermindeltas4050"]);
		a[4] = parseFloat(dbService.listData[dbService.matchupindex]["goldpermindeltas5060"]);
	} else if(this.graphVals == "CS"){
		a[0] = parseFloat(dbService.listData[dbService.matchupindex]["creepspermindeltas010"]);
		a[1] = parseFloat(dbService.listData[dbService.matchupindex]["creepspermindeltas1020"]);
		a[2] = parseFloat(dbService.listData[dbService.matchupindex]["creepspermindeltas2030"]);
		a[3] = parseFloat(dbService.listData[dbService.matchupindex]["creepspermindeltas4050"]);
		a[4] = parseFloat(dbService.listData[dbService.matchupindex]["creepspermindeltas5060"]);
	} else if(this.graphVals == "CS Diff"){
		a[0] = parseFloat(dbService.listData[dbService.matchupindex]["csdiffpermindeltas010"]);
		a[1] = parseFloat(dbService.listData[dbService.matchupindex]["csdiffpermindeltas1020"]);
		a[2] = parseFloat(dbService.listData[dbService.matchupindex]["csdiffpermindeltas2030"]);
		a[3] = parseFloat(dbService.listData[dbService.matchupindex]["csdiffpermindeltas4050"]);
		a[4] = parseFloat(dbService.listData[dbService.matchupindex]["csdiffpermindeltas5060"]);
	} else {
		a[0] = parseFloat(dbService.listData[dbService.matchupindex]["xppermindeltas010"]);
		a[1] = parseFloat(dbService.listData[dbService.matchupindex]["xppermindeltas1020"]);
		a[2] = parseFloat(dbService.listData[dbService.matchupindex]["xppermindeltas2030"]);
		a[3] = parseFloat(dbService.listData[dbService.matchupindex]["xppermindeltas4050"]);
		a[4] = parseFloat(dbService.listData[dbService.matchupindex]["xppermindeltas5060"]);
	}
	//Setup line chart
	var canvas : any = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	config.data.datasets[0].data = a;
	let myLine = new Chart(ctx, config);
	myLine.update();
		
  }
  
}
