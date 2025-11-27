import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { count, map, Observable } from 'rxjs';
import { CartItem } from '../../model/cartItem.model';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb';
import { CartRutaEnvio } from '../../components/cartRutaEnvio/cartRutaEnvio';
import { ProductCardComponent } from '../../components/card/card';
import { DownloadAppBanner } from '../../components/DownloadAppBanner/DownloadAppBanner';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BreadcrumbComponent,
    CartRutaEnvio,
    ProductCardComponent,
    DownloadAppBanner,
    RouterLink,
  ],
  templateUrl: './cartPage.html',
})
export class CartPage {
  cartItems$!: Observable<CartItem[]>;
  subtotal$!: Observable<number>;

  customer = {
    name: '',
    phone: '',
    idCard: '',
    province: '',
    municipality: '',
    homeDelivery: false,
    countryCode: '+53', // Código de país por defecto
  };
  // Opcional: lista de códigos de país
  countryCodes = [
    { code: '+53', label: '🇨🇺 +53' },
    { code: '+34', label: '🇪🇸 +34' },
    { code: '+1', label: '🇺🇸 +1' },
    { code: '+52', label: '🇲🇽 +52' },
    // agrega los que necesites
  ];

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.cartItems$;
    this.subtotal$ = this.cartItems$.pipe(
      map((items) =>
        items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
      )
    );
  }

  increase(item: CartItem) {
    this.cartService.updateQuantity(item.product.id, item.quantity + 1);
  }

  decrease(item: CartItem) {
    this.cartService.updateQuantity(item.product.id, item.quantity - 1);
  }

  remove(item: CartItem) {
    this.cartService.removeFromCart(item.product.id);
  }

  getTotal(subtotal: number): number {
    return subtotal;
  }

  confirmOrder() {
    const fullPhone = `${this.customer.countryCode}${this.customer.phone}`;
    console.log('Orden confirmada:', {
      customer: this.customer,
      items: this.cartService.currentCart,
    });
  }
}
