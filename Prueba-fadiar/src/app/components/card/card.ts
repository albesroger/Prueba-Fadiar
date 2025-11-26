import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../model/products.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './card.html',
})
export class ProductCardComponent {
  @Input() img: string = '';
  @Input() categoria: {
    id: number | null;
    name: string | null;
    id_padre: number | null;
  } = {
    id: null,
    name: null,
    id_padre: null,
  };
  @Input() name: string = '';
  @Input() brand: string = '';
  @Input() price: number = 0;
  @Input() warranty: number = 0;
  @Input() layout: 'vertical' | 'horizontal' = 'vertical';
  @Input() product!: Product;

  // cantidad actual que viene del carrito
  @Input() quantity: number = 1;

  // mostrar o no el controlador de cantidad (para reusar la card en otras vistas)
  @Input() showQuantityControls = false;

  @Output() increment = new EventEmitter<void>();
  @Output() decrement = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();

  constructor(private cartService: CartService) {}
  increase() {
    this.quantity++;
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
  onIncrement() {
    this.increment.emit();
  }

  onDecrement() {
    this.decrement.emit();
  }

  onRemove() {
    this.remove.emit();
  }
}
