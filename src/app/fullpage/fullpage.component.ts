import { Component, OnInit } from '@angular/core';
import { DatabaseGetterService } from '../database-getter.service';
@Component({
  selector: 'app-fullpage',
  templateUrl: './fullpage.component.html',
  styleUrls: ['./fullpage.component.css']
})
export class FullpageComponent implements OnInit {

  constructor(private _databaseService:DatabaseGetterService) { }

  ngOnInit() {
    this._databaseService.getMatchups();

  }

  selectData(index){
    this._databaseService.matchupindex = index;
    this._databaseService.testComponentCallback(this._databaseService);
  }
  
}
