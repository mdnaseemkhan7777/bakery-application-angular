
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  postDataItem(data: any) {
    return this.http.post<any>('http://localhost:3000/items', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  postDataCustomer(data: any) {
    return this.http.post<any>('http://localhost:3000/posts', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  postDataOrder(data: any) {
    return this.http.post<any>('http://localhost:3000/order', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  

  getDataItems() {
    return this.http.get<any>('http://localhost:3000/items').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getDataCustomer() {
    return this.http.get<any>('http://localhost:3000/posts').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getDataOrdersList() {
    return this.http.get<any>('http://localhost:3000/order').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getDataOrdersListAllValue() {
    return this.http.get<any>('http://localhost:3000/order').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateDataItems(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/items/' + id, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  updateDataCustomer(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/posts/' + id, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateDataOrderListValue(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/order/' + id, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deleteDataItems(id: number) {
    return this.http.delete<any>('http://localhost:3000/items/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  deleteDataCustomer(id: number) {
    return this.http.delete<any>('http://localhost:3000/posts/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  
  deleteDataOrderList(id: number) {
    return this.http.delete<any>('http://localhost:3000/order/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
