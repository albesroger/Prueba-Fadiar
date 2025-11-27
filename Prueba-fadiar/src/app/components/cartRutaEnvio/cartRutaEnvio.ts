import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cart-ruta-envio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cartRutaEnvio.html',
})
export class CartRutaEnvio {
  /**
   * Paso actual del flujo: 1 = carrito, 2 = pago, 3 = entrega, 4 = completar
   */
  @Input() currentStep = 1;

  isActive(step: number): boolean {
    return this.currentStep === step;
  }

  isCompleted(step: number): boolean {
    return this.currentStep > step;
  }
}
