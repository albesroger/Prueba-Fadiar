// services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { CartItem } from '../model/cartItem.model';
import { Product } from '../model/products.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  // para mostrar contador en el icono
  get cartCount$() {
    return this.cartItems$.pipe(
      // importa map de rxjs
      map((items) => items.reduce((acc, item) => acc + item.quantity, 0))
    );
  }

  get currentCart(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  addToCart(product: Product, quantity = 1) {
    const items = [...this.currentCart];
    const idx = items.findIndex((i) => i.product.id === product.id);

    if (idx > -1) {
      items[idx] = {
        ...items[idx],
        quantity: items[idx].quantity + quantity,
      };
    } else {
      items.push({ product, quantity });
    }

    this.cartItemsSubject.next(items);
  }

  removeFromCart(productId: number) {
    const items = this.currentCart.filter((i) => i.product.id !== productId);
    this.cartItemsSubject.next(items);
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const items = this.currentCart.map((i) =>
      i.product.id === productId ? { ...i, quantity } : i
    );
    this.cartItemsSubject.next(items);
  }

  clearCart() {
    this.cartItemsSubject.next([]);
  }

  getTotal(): number {
    return this.currentCart.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }
}
