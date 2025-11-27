import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { map, Observable } from 'rxjs';
import { CheckoutService, BeneficiaryData } from '../../services/checkout.service';
import { DownloadAppBanner } from "../../components/DownloadAppBanner/DownloadAppBanner";
import { CartRutaEnvio } from "../../components/cartRutaEnvio/cartRutaEnvio";
import { BreadcrumbComponent } from "../../components/breadcrumb/breadcrumb";

@Component({
  selector: 'app-delivery-page',
  standalone: true,
  imports: [CommonModule, FormsModule, DownloadAppBanner, CartRutaEnvio, BreadcrumbComponent],
  templateUrl: './deliveryPage.html',
})
export class DeliveryPage {
  beneficiary: BeneficiaryData = {
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+53',
    phone: '',
    idCard: '',
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
    // cargar datos previos si los hay
    this.beneficiary = { ...this.checkoutService.beneficiary };

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
    return this.checkoutService.paymentMethod === 'card'
      ? +(subtotal * 0.04).toFixed(2)
      : 0;
  }

  getTotal(subtotal: number): number {
    return subtotal + this.getCommission(subtotal);
  }

  goBack() {
    this.router.navigate(['/cart/payment']);
  }

  continue() {
    // guardar datos de entrega
    this.checkoutService.setDeliveryData(this.beneficiary);
    // ir al resumen final
    this.router.navigate(['/cart/summary']);
  }
}
