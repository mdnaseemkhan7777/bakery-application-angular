import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import {
  FormControl,
  FormGroup,
  Validator,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { OrderModel } from '../order/order';
import { CustomerModel } from '../customer/customer';
import { itemsModel } from '../items/items';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-orders',
  providers: [ApiService],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  customerData!: any;
  orderModelObj: OrderModel = new OrderModel();
  CustomerModelObj: CustomerModel = new CustomerModel();
  itemsModelObj: itemsModel = new itemsModel();
  itemsData!: any;
  // order!: FormArray;
  formValue!: FormGroup;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      id: [''],
      cusName: [''],
      city: [''],
      email: [''],
      address: [''],
      phone: [''],
      items: this.formBuilder.array([]),
    });
    this.getAllOrderList();
  }

  getAllOrderList() {
    this.api.getDataOrdersList().subscribe((a) => {
      this.customerData = a;
    });
  }
  

  
  

  // onSelectItem(event: any, index:number) {
  //   const control = this.formValue.get('items')?.get([index]);
  //   let row = this.itemsData.find(
  //     (items: any) => items.id == event.target.value
  //   );
  //   control?.get('item')?.setValue(row.id);
  //   // control?.get('quantity')?.setValue(row.quantity);
  //   control?.get('price')?.setValue(row.price);
  //   this.calculateTotalAmount();
  // }

  deleteOrderList(row: any) {
    if (confirm('Are You Shure You want to delete!') == true) {
      this.api.deleteDataOrderList(row.id).subscribe((a) => {
        alert('Record Deleted Succesfully');
        this.getAllOrderList();
      });
    } else {
    }
  }

  onActivate(id: any) {
    if (true) {
      this.router.navigate(['order', id]);
    
    }
  }
}
