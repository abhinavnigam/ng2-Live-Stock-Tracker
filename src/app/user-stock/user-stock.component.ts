

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Observable} from 'rxjs/Observable';



import {StockService} from '../services/stock-service.service';
import {Stock} from '../data/stock';
import {UserStock} from '../data/userStockDetail';

@Component({
  selector: 'user-stock',  
  templateUrl: './user-stock.component.html',
  styleUrls: ['./user-stock.component.css'],
  providers :[StockService],
 
})
export class UserStockComponent implements OnInit {
  stockCompanyList: string[] = [];
  userStockList: UserStock[] = [];
  slectedStock: Stock;
  recentUpdatedStockIndex : number = -1;
  constructor(private stockservice: StockService, private changeRef:ChangeDetectorRef) { 
   
    
  }

  ngOnInit() {
    this.stockCompanyList = this.stockservice.getAllListedCompany();
    if(this.stockCompanyList.length > 0)
      this.loadStock(this.stockCompanyList[0]);

    this.stockservice.getStockWatcher().subscribe(st => {
       this.changeRef.detectChanges();
       let index = this.userStockList.findIndex(us=> us.company == st.company);
       if( index >= 0)
       {
         this.userStockList[index].currentValue = st.value;
         this.userStockList[index].lastUpdatedDate = st.priceUdateDate;
         this.recentUpdatedStockIndex = index;        
       }
      
    });
          
  }

  loadStock(selectedStock:string)
  {
    this.slectedStock = this.stockservice.getStockByCompanyName(selectedStock);    
  }

  addCompanyStock()
  {
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

  removeUserStock(index: number){
    if(confirm ("Want to remove " + this.userStockList[index].company + " stock"))
    {
      this.userStockList.splice(index,1);
    }
  }

}
