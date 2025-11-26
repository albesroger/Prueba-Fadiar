import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cart-ruta-envio',
  imports: [CommonModule],
  templateUrl: './cartRutaEnvio.html',
})
export class CartRutaEnvio {
  /**
   * Paso actual del flujo: 1 = carrito, 2 = pago, 3 = entrega, 4 = completar
   * Por ahora lo dejamos default en 1.
   */
  @Input() currentStep = 1;
}
