import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { map, Observable } from 'rxjs';
import { CartRutaEnvio } from '../../components/cartRutaEnvio/cartRutaEnvio';

@Component({
  selector: 'app-delivery-page',
  standalone: true,
  imports: [CommonModule, FormsModule, CartRutaEnvio],
  templateUrl: './deliveryPage.html',
})
export class DeliveryPage {
  // Datos del beneficiario
  beneficiary = {
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

  constructor(private cartService: CartService, private router: Router) {
    this.subtotal$ = this.cartService.cartItems$.pipe(
      map((items) =>
        items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
      )
    );
  }

  // Si quieres mantener la misma comisión que en paso 2:
  getCommission(subtotal: number): number {
    return +(subtotal * 0.04).toFixed(2);
  }

  getTotal(subtotal: number): number {
    return subtotal + this.getCommission(subtotal);
  }

  goBack() {
    this.router.navigate(['/cart/payment']);
  }

  continue() {
    // Aquí luego vas al paso 4 (completar) o haces la lógica final
    // this.router.navigate(['/cart/complete']);
    console.log('Datos de entrega', this.beneficiary);
  }
}
