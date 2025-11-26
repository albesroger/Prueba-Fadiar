import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProductPage } from './pages/productPage/productPage';
import { FaqQuestions } from './components/faqQuestions/faqQuestions';
import { FaqPage } from './pages/faqPage/faqPage';
import { AboutusPage } from './pages/aboutusPage/aboutusPage';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'product',
    component: ProductPage,
  },
  {
    path: 'about',
    component: AboutusPage,
  },
  {
    path: 'faq',
    component: FaqPage,
  },
];
