import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validator,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { itemsModel } from './items';

@Component({
  selector: 'app-items',
  providers: [ApiService],
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  itemsModelObj: itemsModel = new itemsModel();
  itemsValue!: FormGroup;
  itemsData!: any;
  showUpdate!: boolean;
  showAdd!: boolean;
  showUpdateTitle!: boolean;
  showAddTitle!: boolean;

  constructor(private formBuilder: FormBuilder, private api: ApiService) {
    setTimeout(() => {
      this.itemsValue.reset();
      this.showUpdate = false;
      this.showAdd = true;
    }, 100);

   
  }

  addButton(){
    this.itemsValue.reset();
    this.showUpdate=false;
    this.showAdd=true;
    
    this.showUpdateTitle=false;
    this.showAddTitle=true;
  }
  ngOnInit(): void {
    this.itemsValue = this.formBuilder.group({
      items: [''],
      quantity: [''],
      price: [''],
    });
    this.getAllItems();
  }

  getAllItems() {
    this.api.getDataItems().subscribe((a) => {
      this.itemsData = a;
    });
  }

  addItems() {
    this.itemsModelObj.id = this.itemsValue.value.id;

    this.itemsModelObj.items = this.itemsValue.value.items;
    this.itemsModelObj.quantity = this.itemsValue.value.quantity;
    this.itemsModelObj.price = this.itemsValue.value.price;

    this.api.postDataItem(this.itemsModelObj).subscribe((a: any) => {
      console.log(a);
      alert('Record inserted successfully');

      this.itemsValue.reset();
      this.getAllItems();
    });
  }

  deleteItems(row: any) {
    if (confirm('Are You Shure You want to delete!') == true) {
      this.api.deleteDataItems(row.id).subscribe((a) => {
        alert('Record Deleted Succesfully');
        this.getAllItems();
      });
    } else {
    }
  }

  updateItems(row: any) {
    this.showUpdate = true;
    this.showAdd = false;

    this.itemsModelObj.id = row.id;
    this.itemsValue.controls['items'].setValue(row.items);
    this.itemsValue.controls['quantity'].setValue(row.quantity);
    this.itemsValue.controls['price'].setValue(row.price);
  }

  updateItemsDetails() {
    this.showUpdate = false;
    this.showAdd = true;
    this.itemsModelObj.items = this.itemsValue.value.items;
    this.itemsModelObj.quantity = this.itemsValue.value.quantity;
    this.itemsModelObj.price = this.itemsValue.value.price;
    this.api
      .updateDataItems(this.itemsModelObj, this.itemsModelObj.id)
      .subscribe((a) => {
        alert('Record updated Succesfully');

        let cancel = document.getElementById('cancel');

        cancel?.click();
        this.itemsValue.reset();
        this.getAllItems();
      });
  }
}
