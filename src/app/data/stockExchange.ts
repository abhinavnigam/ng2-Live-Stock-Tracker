import {Stock} from './stock'
import {Subject} from '../../../node_modules/rxjs/Subject';

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
    
    static stockObserver  = new Subject<Stock>();

    static initialize() {
        setInterval(() => {
           let index = Math.floor((Math.random() * this.STOCKLIST.length) );
           let price = (Math.random() * 1000000)/100;
           this.STOCKLIST[index].value = price;
           this.stockObserver.next(this.STOCKLIST[index]);

        }, 2000)
    }

   

    static getAllStock(): Stock[] 
    {
        return this.STOCKLIST;
    }
}

StockExchange.initialize();