import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';
import { ItemsComponent } from './items/items.component';
import { OrderComponent } from './order/order.component';
import { OrdersComponent } from './orders/orders.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: 'login',
    component: ReactiveFormComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'customer',
    component: CustomerComponent,
  },

  {
    path: 'items',
    component: ItemsComponent,
  },
  {
    path: 'signup',
    component: SignupPageComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'order',
    component: OrderComponent,
  },
  {
    path: 'order/:id',
    component: OrderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
