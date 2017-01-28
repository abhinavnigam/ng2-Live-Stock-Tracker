import { Injectable } from '@angular/core';

//import {STOCKLIST} from '../data/stockList';
import {StockExchange} from '../data/stockExchange';
import {Stock} from '../data/Stock';

@Injectable()
export class StockService {
  stocks : Stock[] = null;
  constructor() { 
    this.stocks = StockExchange.getAllStock();
  }

  getAllListedCompany(): string[]{
    return this.stocks.map(st => st.company);
  }

  getStockByCompanyName(companyName:string)
  {
    return this.stocks.find(st => st.company == companyName);
  }

  getStockWatcher(){
    return StockExchange.stockObserver;
  }

}
