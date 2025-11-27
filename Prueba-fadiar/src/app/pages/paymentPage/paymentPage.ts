import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { map, Observable } from 'rxjs';
import { CheckoutService, PaymentMethod, PayerData } from '../../services/checkout.service';
import { DownloadAppBanner } from "../../components/DownloadAppBanner/DownloadAppBanner";
import { CartRutaEnvio } from "../../components/cartRutaEnvio/cartRutaEnvio";
import { BreadcrumbComponent } from "../../components/breadcrumb/breadcrumb";

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [CommonModule, FormsModule, DownloadAppBanner, CartRutaEnvio, BreadcrumbComponent],
  templateUrl: './paymentPage.html',
})
export class PaymentPage {
  paymentMethod: PaymentMethod = 'card';

  buyer: PayerData = {
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+53',
    phone: '',
    address: '',
    note: '',
  };

  countryCodes = [
    { code: '+53', label: '🇨🇺 +53' },
    { code: '+34', label: '🇪🇸 +34' },
    { code: '+1', label: '🇺🇸 +1' },
    { code: '+52', label: '🇲🇽 +52' },
  ];

  subtotal$!: Observable<number>;

  constructor(
    private cartService: CartService,
    private router: Router,
    private checkoutService: CheckoutService
  ) {
    // rellenar con lo que hubiese ya en el servicio (por si vuelve atrás)
    this.paymentMethod = this.checkoutService.paymentMethod;
    this.buyer = { ...this.checkoutService.payer };

    this.subtotal$ = this.cartService.cartItems$.pipe(
      map(items =>
        items.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        )
      )
    );
  }

  getCommission(subtotal: number): number {
    return this.paymentMethod === 'card'
      ? +(subtotal * 0.04).toFixed(2)
      : 0;
  }

  getTotal(subtotal: number): number {
    return subtotal + this.getCommission(subtotal);
  }

  goBack() {
    this.router.navigate(['/cart']);
  }

  continue() {
    // guardar en el servicio
    this.checkoutService.setPaymentData(this.paymentMethod, this.buyer);
    // ir a datos de entrega
    this.router.navigate(['/cart/delivery']);
  }
}
