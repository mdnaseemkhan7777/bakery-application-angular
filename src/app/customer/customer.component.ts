import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validator,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { CustomerModel } from './customer';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-customer',
  providers: [ApiService],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  CustomerModelObj: CustomerModel = new CustomerModel();
  formValue!: FormGroup;
  showUpdate!: boolean;
  showAdd!: boolean;
  customerData!: any;
  constructor(private formBuilder: FormBuilder, private api: ApiService) {
    // setTimeout((addButtonClickFunction:any) => {
    //   this.formValue.reset();
    //   this.showUpdate = false;
    //   this.showAdd = true;
    // }, 100);
    // }

    // loginForm = new FormGroup({
    //   cusName:new FormControl('',[Validators.required]),
    //   city:new FormControl('',[Validators.required,]),
    //   email:new FormControl('',[Validators.required, Validators.email]),
    //   address : new FormControl('',[Validators.required]),
    //   phone : new FormControl('',[Validators.required,Validators.minLength(4)])
    // })

    // loginUser(){
    //   console.warn(this.loginForm.value);
    //    this.cName= this.loginForm.value.cusName
    // }
    // get cusName (){
    //   return this.loginForm.get('cusName')
    // }
    // get city (){
    //   return this.loginForm.get('city')
    // }
    // get email (){
    //   return this.loginForm.get('email')
    // }
    // get address (){
    //   return this.loginForm.get('address')
    // }
    // get phone (){
    //   return this.loginForm.get('phone')
    // }

    setTimeout(() => {
      this.formValue.reset();
      this.showUpdate = false;
      this.showAdd = true;
    }, 100);
  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      cusName: [''],
      city: [''],
      email: [''],
      address: [''],
      phone: [''],
    });
    this.getAllCustomer();
  }

  getAllCustomer() {
    this.api.getDataCustomer().subscribe((a) => {
      this.customerData = a;
    });
  }

  addCustomer() {
    this.CustomerModelObj.id = this.formValue.value.id;

    this.CustomerModelObj.cusName = this.formValue.value.cusName;
    this.CustomerModelObj.city = this.formValue.value.city;
    this.CustomerModelObj.email = this.formValue.value.email;
    this.CustomerModelObj.address = this.formValue.value.address;
    this.CustomerModelObj.phone = this.formValue.value.phone;

    let cancel = document.getElementById('cancel');
    this.api.postDataCustomer(this.CustomerModelObj).subscribe((a: any) => {
      console.log(a);
      alert('Record inserted successfully');
      cancel?.click();
      this.formValue.reset();
      this.getAllCustomer();
    });
  }

  deleteCustomer(row: any) {
    if (confirm('Are You Shure You want to delete!') == true) {
      this.api.deleteDataCustomer(row.id).subscribe((a) => {
        alert('Record Deleted Succesfully');
        this.getAllCustomer();
      });
    } else {
    }
  }

  updateCustomer(row: any) {
    this.showUpdate = true;
    this.showAdd = false;

    this.CustomerModelObj.id = row.id;
    this.formValue.controls['cusName'].setValue(row.cusName);
    this.formValue.controls['city'].setValue(row.city);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['address'].setValue(row.address);
    this.formValue.controls['phone'].setValue(row.phone);
  }

  updateCustomerDetails() {
    this.showUpdate = false;
    this.showAdd = true;
    
    this.CustomerModelObj.cusName = this.formValue.value.cusName;
    this.CustomerModelObj.city = this.formValue.value.city;
    this.CustomerModelObj.email = this.formValue.value.email;
    this.CustomerModelObj.address = this.formValue.value.address;
    this.CustomerModelObj.phone = this.formValue.value.phone;
    this.api
      .updateDataCustomer(this.CustomerModelObj, this.CustomerModelObj.id)
      .subscribe((a) => {
        alert('Record updated Succesfully');

        let cancel = document.getElementById('cancel');

        cancel?.click();
        this.formValue.reset();
        this.getAllCustomer();
      });
  }
}
