import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductSearchService } from '../../../services/product-search.service';
import { CartService } from '../../../services/cart.service';
import { Observable } from 'rxjs/internal/Observable';
import { ProductSearch } from '../../product-search/product-search';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    FormsModule,
    CommonModule,
    RouterLinkActive,
    ProductSearch,
  ],
  templateUrl: './navbar.html',
})
export class Navbar {
  mobileMenuOpen = false;
  searchTerm = '';
  cartCount$: Observable<number>;
  constructor(
    private productSearchService: ProductSearchService,
    private cartService: CartService,
    private router: Router
  ) {
    this.cartCount$ = this.cartService.cartCount$; // ✅ aquí
  }

  navItems = [
    { label: 'Inicio', url: '/', exact: true },
    { label: 'Productos', url: '/product', exact: false },
    { label: 'About Us', url: '/about', exact: false },
    { label: 'FAQ', url: '/faq', exact: false },
    { label: 'Contacto', url: '/contacto', exact: false },
  ];

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  onTermChange(term: string) {
    this.productSearchService.setTerm(term);
  }
  onSearch() {
    // aquí metes la lógica de búsqueda
    // por ejemplo emitir un evento o navegar con query params
    console.log('Buscar:', this.searchTerm);
  }
  goToCart() {
    this.router.navigate(['/cart']); // cambia '/cart' si tu ruta es otra
  }
}
