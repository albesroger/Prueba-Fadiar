import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProductPage } from './pages/productPage/productPage';
import { FaqQuestions } from './components/faqQuestions/faqQuestions';
import { FaqPage } from './pages/faqPage/faqPage';
import { AboutusPage } from './pages/aboutusPage/aboutusPage';
import { ContactoPage } from './pages/contactoPage/contactoPage';
import { CartPage } from './pages/cartPage/cartPage';
import { PaymentPage } from './pages/paymentPage/paymentPage';
import { DeliveryPage } from './pages/deliveryPage/deliveryPage';
import { SummaryPage } from './pages/summaryPage/summaryPage';
import { DetailProductPage } from './pages/detailProductPage/detailProductPage';
import { PerfilPage } from './pages/perfilPage/perfilPage';

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
    path: 'product/:id',
    component: DetailProductPage,
    data: { breadcrumb: 'Product Details' },
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
    data: { breadcrumb: 'Carrito de Compras' },
  },
  {
    path: 'cart/payment',
    component: PaymentPage,
    data: { breadcrumb: 'Datos de Pago' },
  },
  {
    path: 'cart/delivery',
    component: DeliveryPage,
    data: { breadcrumb: 'Datos de Pago' },
  },
  {
    path: 'cart/summary',
    component: SummaryPage,
    data: { breadcrumb: 'Datos de Pago' },
  },
  {
    path: 'perfil',
    component: PerfilPage,
  },
];
