import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { map, Observable } from 'rxjs';
import { CartItem } from '../../model/cartItem.model';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb';
import { CartRutaEnvio } from '../../components/cartRutaEnvio/cartRutaEnvio';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, FormsModule, BreadcrumbComponent, CartRutaEnvio],
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
  };

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
    console.log('Orden confirmada:', {
      customer: this.customer,
      items: this.cartService.currentCart,
    });
  }
}
