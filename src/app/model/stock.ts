export class Stock{
    company: string;
    private _price: number;
    private _updateDate:number;

    get value(): number{
        return this._price;
    }

    set value(price:number){
        this._price = price;
        this._updateDate = Date.now();
    }

    get priceUdateDate():number
    {
        return this._updateDate;
    }

    constructor(name: string, price:number){
        this.company = name;
        this.value = price;
    }
}