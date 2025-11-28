import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductSearchService } from '../../../services/product-search.service';
import { CartService } from '../../../services/cart.service';
import { Observable } from 'rxjs/internal/Observable';
import { ProductSearch } from '../../product-search/product-search';
import { AuthService, User } from '../../../core/auth/auth.service';
import { AuthModalComponent } from '../../auth-modal.component/auth-modal.component';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    FormsModule,
    CommonModule,
    RouterLinkActive,
    ProductSearch,
    AuthModalComponent,
  ],
  templateUrl: './navbar.html',
})
export class Navbar {
  mobileMenuOpen = false;
  searchTerm = '';
  showAuthModal = false;

  cartCount$: Observable<number>;

  currentUser$!: Observable<User | null>;

  constructor(
    private productSearchService: ProductSearchService,
    private cartService: CartService,
    private router: Router,
    private authService: AuthService
  ) {
    this.cartCount$ = this.cartService.cartCount$; // ✅ aquí
    this.currentUser$ = this.authService.currentUser$;
  }

  navItems = [
    { label: 'Inicio', url: '/', exact: true },
    { label: 'Productos', url: '/product', exact: false },
    { label: 'About Us', url: '/about', exact: false },
    { label: 'FAQ', url: '/faq', exact: false },
    { label: 'Contacto', url: '/contacto', exact: false },
  ];

  //modal de registro
  openAuth() {
    this.showAuthModal = true;
  }

  closeAuth() {
    this.showAuthModal = false;
  }

  logout() {
    this.authService.logout();
  }

  //boton de hamburguesa
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  onTermChange(term: string) {
    this.productSearchService.setTerm(term);
  }

  //barra buscar
  onSearch() {
    console.log('Buscar:', this.searchTerm);
  }

  goToCart() {
    this.router.navigate(['/cart']); // cambia '/cart' si tu ruta es otra
  }
}
