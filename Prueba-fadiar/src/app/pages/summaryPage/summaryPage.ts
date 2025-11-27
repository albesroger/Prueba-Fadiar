import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { map, Observable } from 'rxjs';
import { CheckoutService } from '../../services/checkout.service';
import { CartItem } from '../../model/cartItem.model';
import { CartRutaEnvio } from '../../components/cartRutaEnvio/cartRutaEnvio';
import { BreadcrumbComponent } from "../../components/breadcrumb/breadcrumb";
import { DownloadAppBanner } from "../../components/DownloadAppBanner/DownloadAppBanner";

@Component({
  selector: 'app-summary-page',
  standalone: true,
  imports: [CommonModule, CartRutaEnvio, BreadcrumbComponent, DownloadAppBanner],
  templateUrl: './summaryPage.html',
})
export class SummaryPage {
  cartItems$!: Observable<CartItem[]>;
  subtotal$!: Observable<number>;

  constructor(
    private cartService: CartService,
    public checkoutService: CheckoutService,
    private router: Router
  ) {
    this.cartItems$ = this.cartService.cartItems$;

    this.subtotal$ = this.cartItems$.pipe(
      map((items) =>
        items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
      )
    );
  }

  getCommission(subtotal: number): number {
    return this.checkoutService.paymentMethod === 'card'
      ? +(subtotal * 0.04).toFixed(2)
      : 0;
  }

  getTotal(subtotal: number): number {
    return (
      subtotal +
      this.getCommission(subtotal) +
      this.checkoutService.shippingCost
    );
  }

  editPayment() {
    this.router.navigate(['/cart/payment']);
  }

  editDelivery() {
    this.router.navigate(['/cart/delivery']);
  }

  goBack() {
    this.router.navigate(['/cart/delivery']);
  }

  confirm() {
    // aquí iría la llamada final al backend
    console.log('Confirmar compra', {
      items: this.cartService.currentCart,
      payer: this.checkoutService.payer,
      beneficiary: this.checkoutService.beneficiary,
      paymentMethod: this.checkoutService.paymentMethod,
    });
  }
}
