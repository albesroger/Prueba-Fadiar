import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductSearchService } from '../../../services/product-search.service';
import { ProductSearch } from '../../product-search/product-search';
import { CartService } from '../../../services/cart.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    FormsModule,
    CommonModule,
    ProductSearch,
    RouterLinkActive,
  ],
  templateUrl: './navbar.html',
})
export class Navbar {
  cartCount$: Observable<number>;
  constructor(
    private productSearchService: ProductSearchService,
    private cartService: CartService,
    private router: Router
  ) {
    this.cartCount$ = this.cartService.cartCount$; // ✅ aquí
  }

  onTermChange(term: string) {
    this.productSearchService.setTerm(term);
  }
  goToCart() {
    this.router.navigate(['/cart']); // cambia '/cart' si tu ruta es otra
  }
}
