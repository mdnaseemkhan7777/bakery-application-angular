export class OrderModel{
    id:number=0;
    cusName:string='';
    city:string='';
    email:string='';
    address:string='';
    phone: string='';
    items: Item[] = [];
}

export class Item{
    id: number = 0;    
    items: string = '';
    quantity: any='';
    price: any='';
    total: any='';
}