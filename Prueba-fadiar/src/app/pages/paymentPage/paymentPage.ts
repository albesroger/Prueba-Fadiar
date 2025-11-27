import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { map, Observable } from 'rxjs';
import { CartRutaEnvio } from '../../components/cartRutaEnvio/cartRutaEnvio';
import { BreadcrumbComponent } from "../../components/breadcrumb/breadcrumb";

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [CommonModule, FormsModule, CartRutaEnvio, BreadcrumbComponent],
  templateUrl: './paymentPage.html',
})
export class PaymentPage {
  // método de pago seleccionado
  paymentMethod: 'card' | 'tropipay' = 'card';

  // datos del comprador
  buyer = {
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

  constructor(private cartService: CartService, private router: Router) {
    this.subtotal$ = this.cartService.cartItems$.pipe(
      map((items) =>
        items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
      )
    );
  }

  // 4% si paga con tarjeta, 0 si TropiPay
  getCommission(subtotal: number): number {
    return this.paymentMethod === 'card' ? +(subtotal * 0.04).toFixed(2) : 0;
  }

  getTotal(subtotal: number): number {
    return subtotal + this.getCommission(subtotal);
  }

  goBack() {
    this.router.navigate(['/cart']);
  }

  continue() {
    // más adelante aquí puedes validar el formulario, etc.
    this.router.navigate(['/cart/delivery']);
  }
}
