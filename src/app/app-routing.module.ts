import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessfulComponent } from './order-successful/order-successful.component';
import { LoginComponent } from './login/login.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AccessDeniendComponent } from './access-deniend/access-deniend.component';
import { AuthGurdService } from './services/auth-gurd.service';
import { AdminAuthGurdService } from './services/admin-auth-gurd.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';


const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"products",component:ProductsComponent},
  {path:"shopping-cart",component:ShoppingCartComponent},
  {path:"check-out",component:CheckOutComponent ,canActivate :[AuthGurdService]},
  {path:"order-success",component:OrderSuccessfulComponent,canActivate :[AuthGurdService]},
  {path:"myOrders", component:MyOrdersComponent,canActivate :[AuthGurdService]},
  {path:"admin/products/new",component:ProductFormComponent,canActivate :[AuthGurdService,AdminAuthGurdService]},
  {path:"admin/products/:id",component:ProductFormComponent,canActivate :[AuthGurdService,AdminAuthGurdService]},
  {path:"admin/products",component:AdminProductsComponent,canActivate :[AuthGurdService,AdminAuthGurdService]},
  {path:"admin/orders",component:AdminOrdersComponent,canActivate :[AuthGurdService,AdminAuthGurdService]},
  {path:"**",component:AccessDeniendComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
