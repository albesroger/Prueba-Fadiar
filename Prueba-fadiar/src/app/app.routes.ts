import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProductPage } from './pages/productPage/productPage';
import { FaqQuestions } from './components/faqQuestions/faqQuestions';
import { FaqPage } from './pages/faqPage/faqPage';
import { AboutusPage } from './pages/aboutusPage/aboutusPage';
import { ContactoPage } from './pages/contactoPage/contactoPage';
import { CartPage } from './pages/cartPage/cartPage';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    data: { breadcrumb: 'Home' },
  },
  {
    path: 'product',
    component: ProductPage,
    data: { breadcrumb: 'Product' },
  },
  {
    path: 'about',
    component: AboutusPage,
    data: { breadcrumb: 'About Us' },
  },
  {
    path: 'faq',
    component: FaqPage,
    data: { breadcrumb: 'FAQ' },
  },
  {
    path: 'contacto',
    component: ContactoPage,
    data: { breadcrumb: 'Contacto' },
  },
  {
    path: 'cart',
    component: CartPage,
    data: { breadcrumb: 'Carrito' },
  },
];
