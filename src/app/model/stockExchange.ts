import {Stock} from './stock'
import {Subject} from '../../../node_modules/rxjs/Subject';

// Mimics the stock exchange containing listed stock and updating stock values at interval of times
export class StockExchange{
     static STOCKLIST: Stock[] = [
        new Stock ('Reliance Group', 6100.00),
        new Stock ('Maruti Suzki', 2235.80),
        new Stock ('LG Applicances', 830.40),
        new Stock ('TechMahindra', 3450.10),
        new Stock ('Bharat Petroleum', 8720.15),
        new Stock ('Tata Steels', 1689.40),
        new Stock ('Bajaj Motors', 3985.45),
        new Stock ('Patanjali', 6420.00),
        new Stock ('Infosys', 1100.00),
        new Stock ('Nescafe', 5450.00) 
    ];
    
    //Observerable on the Stock
    static stockObserverable  = new Subject<Stock>();
    
    // Method randomly pick a stock in the list and upadte its price/value every 1 second.
    static initialize() {
        setInterval(() => {
           let index = Math.floor((Math.random() * this.STOCKLIST.length)); //random index for Stock list           
           this.STOCKLIST[index].value = (Math.random() * 1000000)/100; //update stock value
           // Call next method on price change.
           this.stockObserverable.next(this.STOCKLIST[index]); 

        }, 1000)
    }   

    static getAllStock(): Stock[] {
        return this.STOCKLIST;
    }
}
//Start updating the stock price
StockExchange.initialize();