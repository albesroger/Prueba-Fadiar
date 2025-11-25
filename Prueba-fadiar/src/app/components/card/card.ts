import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './card.html',
})
export class ProductCardComponent {
  @Input() image: string = '';
  @Input() category: string = '';
  @Input() name: string = '';
  @Input() brand: string = '';
  @Input() price: number = 0;
  @Input() warranty: string = 'Garantía 1 Año';

  quantity = 1;

  increase() {
    this.quantity++;
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
