import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProductPage } from './pages/productPage/productPage';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'product',
    component: ProductPage,
  },
];
