import { Injectable } from '@angular/core';
import {Subject} from '../../../node_modules/rxjs/Subject';

import {StockExchange} from '../model/stockExchange';
import {Stock} from '../model/Stock';

@Injectable()
export class StockService {
  stocks : Stock[] = null;
  constructor() { 
    this.stocks = StockExchange.getAllStock();
  }
  
  // Names of all the company in the stockExchange
  getAllListedCompany(): string[]{
    return this.stocks.map(st => st.company);
  }

  // Get Stock of the company input
  getStockByCompanyName(companyName:string)
  {
    return this.stocks.find(st => st.company == companyName);
  }
  
  // Get the Observer object that notifies stock value change
  getStockWatcher() : Subject<Stock>{
    return StockExchange.stockObserverable;
  }
}
