import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {StockService} from '../services/stock-service.service';
import {Stock} from '../model/stock';
import {UserStock} from '../model/userStockDetail';

@Component({
  selector: 'user-stock',  
  templateUrl: './user-stock.component.html',
  styleUrls: ['./user-stock.component.css'],
  providers :[StockService],
 
})
export class UserStockComponent implements OnInit {
  
  stockCompanyList: string[] = []; // all company name to display on Dropdown in UI
  userStockList: UserStock[] = []; //Selected stocks by user
  slectedStock: Stock; // stock selected on dropdown list
  recentUpdatedStockIndex : number = -1; // index from userStockList, which is recently updated
  
  constructor(private stockservice: StockService, private changeRef:ChangeDetectorRef) { }

  ngOnInit() {
    this.stockCompanyList = this.stockservice.getAllListedCompany();
    if(this.stockCompanyList.length > 0)
      this.loadStock(this.stockCompanyList[0]);
    
    //subscribe to StockObservable to watch for price change
    this.stockservice.getStockWatcher().subscribe(st => {       
       let index = this.userStockList.findIndex(us=> us.company == st.company);
       if(index >= 0) //check if stock upadted exist in userStock List
       {
         this.changeRef.detectChanges(); //detect the change in reload the DOM to reflect the change   
         this.userStockList[index].currentValue = st.value;
         this.userStockList[index].lastUpdatedDate = st.priceUdateDate;
         this.recentUpdatedStockIndex = index;            
       }      
    });          
  }

  loadStock = (selectedStock:string)=> {
    this.slectedStock = this.stockservice.getStockByCompanyName(selectedStock);    
  }

  addCompanyStock = () => {
    if(this.userStockList.findIndex(us=> us.company == this.slectedStock.company) >= 0)
    {
      alert("Stock for " + this.slectedStock.company + "already added.")
      return;
    } 

    let userstock = new UserStock();
    userstock.company = this.slectedStock.company;
    userstock.purchasedValue = this.slectedStock.value;
    userstock.purchasedDate = Date.now();
    userstock.lastUpdatedDate = this.slectedStock.priceUdateDate;
    userstock.currentValue = this.slectedStock.value;

    this.userStockList.push(userstock); 
  }

  removeUserStock = (index: number) => {
    if(confirm ("Want to remove " + this.userStockList[index].company + " stock"))    
      this.userStockList.splice(index,1);    
  }

}
