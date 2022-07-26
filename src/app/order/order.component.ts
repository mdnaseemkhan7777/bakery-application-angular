import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { CustomerModel } from '../customer/customer';
import { itemsModel } from '../items/items';
import { OrderModel } from './order';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  providers: [ApiService],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orderModelObj: OrderModel = new OrderModel();
  customerData: any[] = [];
  formValue!: FormGroup;
  itemsValue!: FormGroup;
  CustomerModelObj: CustomerModel = new CustomerModel();
  itemsModelObj: itemsModel = new itemsModel();
  itemsData!: any;
  order!: FormArray;
  rowDefalut: any = { item: '', quantity: '', price: '', total: '' };
  total: any = '';
  showAdd!: boolean;
  showUpdate!: boolean;
  gtotal: any;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  getAllCustomer() {
    this.api.getDataCustomer().subscribe((a) => {
      this.customerData = a;
    });
  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      id: [''],
      cusId: [''],
      cusName: [''],
      city: [''],
      email: [''],
      address: [''],
      phone: [''],
      gTotal: [''],
      items: this.formBuilder.array([]),
    });
    this.getAllCustomer();
    this.getAllItems();
    this.addRow();

    if (this.id != undefined && this.id != 0) {
      this.getAllValue(this.id);
    }
  }

  // this value get update order values

  getAllValue(id: number) {
    this.api.getDataOrdersListAllValue().subscribe((orders) => {
      let order = orders.find((order: any) => order.id == this.id);

      this.formValue.controls['id']?.setValue(order.id);
      this.formValue.controls['cusId']?.setValue(order.cusId);
      this.formValue.controls['cusName']?.setValue(order.cusName);
      this.formValue.controls['city']?.setValue(order.city);
      this.formValue.controls['email']?.setValue(order.email);
      this.formValue.controls['address']?.setValue(order.address);
      this.formValue.controls['phone']?.setValue(order.phone);
      this.formValue.controls['gTotal']?.setValue(order.gTotal);

      const control = <FormArray>this.formValue.get('items');
      control.controls = [];
      order.items.forEach((x: any) => {
        control.push(this.addRule(x));
      });
    });
  }

  updateDataOrderList() {
    this.orderModelObj = this.formValue.value;
    this.api
      .updateDataOrderListValue(this.orderModelObj, this.orderModelObj.id)
      .subscribe((a) => {
        alert('Record updated Succesfully');

        let cancel = document.getElementById('cancel');

        cancel?.click();
        this.formValue.reset();
      });
  }

  addRow(): void {
    const data = Object.assign({}, this.rowDefalut);
    const control = <FormArray>this.formValue.get('items');
    control.push(this.addRule(data));
  }

  getRows() {
    const control = <FormArray>this.formValue.get('items');
    return control.controls;
  }

  addRule(r: any): FormGroup {
    return this.formBuilder.group({
      item: [r.item],
      quantity: [r.quantity],
      price: [r.price],
      total: [r.total],
    });
  }

  getAllItems() {
    this.api.getDataItems().subscribe((a) => {
      this.itemsData = a;
    });
  }
  deleteRow(index: number) {
    const control = <FormArray>this.formValue.get('items');
    control.removeAt(index);
    // this.calculateTotalAmount();
  }

  onSelectCustomer(event: any) {
    let row = this.customerData.find(
      (customer) => customer.id == event.target.value
    );
    this.CustomerModelObj.id = row.id;
    // this.formValue.controls['id'].setValue(row.id);
    this.formValue.controls['cusName'].setValue(row.cusName);
    this.formValue.controls['city'].setValue(row.city);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['address'].setValue(row.address);
    this.formValue.controls['phone'].setValue(row.phone);
  }

  onSelectItem(event: any, index: number) {
    const control = this.formValue.get('items')?.get([index]);
    let row = this.itemsData.find(
      (items: any) => items.id == event.target.value
    );
    control?.get('item')?.setValue(row.id);
    // control?.get('quantity')?.setValue(row.quantity);
    control?.get('price')?.setValue(row.price);
  }

  onChangeQuantity(event: any, index: any) {
    const control = this.formValue.get('items')?.get([index]);
    let item = control?.value;

    let qnumber: any = event.target.value;
    let total = qnumber * item.price;
    control?.get('total')?.setValue(total);
    this.calculateTotalAmount();
  }

  calculateTotalAmount() {
  
    const controls = <FormArray>this.formValue.get('items');
    let amountTotal = '0.00';
    controls.controls.forEach((control: any) => {
      amountTotal = (
        Number(control.controls.total.value) + Number(amountTotal)
      ).toFixed(2);
      let gtotal = Number(amountTotal).toFixed(2);
      this.formValue.get('gTotal')?.setValue(gtotal);
    });
  }

  addOrder() {
    this.orderModelObj = this.formValue.value;

    let cancel = document.getElementById('cancel');
    this.api.postDataOrder(this.orderModelObj).subscribe((a: any) => {
      console.log(a);
      alert('Record inserted successfully');
      cancel?.click();
      this.formValue.reset();
      this.getAllCustomer();
    });
  }

  deleteOrder(index: number) {
    const control = <FormArray>this.formValue.get('items');
    control.removeAt(index);
    this.calculateTotalAmount();
  }
}
