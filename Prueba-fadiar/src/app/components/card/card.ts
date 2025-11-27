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

  // cantidad (solo tiene sentido en modo carrito)
  @Input() quantity: number = 1;

  // ya no necesitamos showQuantityControls si usamos mode
  // @Input() showQuantityControls = false;
  @Input() mode: 'catalog' | 'cart' = 'catalog';

  @Output() increment = new EventEmitter<void>();
  @Output() decrement = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();

  constructor(private cartService: CartService) {}


  get isCatalogMode() {
    return this.mode === 'catalog';
  }

  get isCartMode() {
    return this.mode === 'cart';
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

  // si todavía usabas increase/decrease en otros lados,
  // puedes hacerlos delegar a los eventos:
  // increase() { this.onIncrement(); }
  // decrease() { this.onDecrement(); }
}
