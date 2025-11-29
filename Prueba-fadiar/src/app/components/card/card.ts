import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Product } from '../../model/products.model';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './card.html',
})
export class ProductCardComponent implements OnChanges {
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
  private localQuantity = 1;

  // ya no necesitamos showQuantityControls si usamos mode
  // @Input() showQuantityControls = false;
  @Input() mode: 'catalog' | 'cart' = 'catalog';

  @Output() increment = new EventEmitter<void>();
  @Output() decrement = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();

  constructor(private cartService: CartService, private router: Router) {}

  get isCatalogMode() {
    return this.mode === 'catalog';
  }

  get isCartMode() {
    return this.mode === 'cart';
  }

  get currentQuantity(): number {
    return this.isCartMode ? this.quantity : this.localQuantity;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['quantity'] && this.isCartMode) {
      this.quantity = changes['quantity'].currentValue ?? 1;
    }
    if (changes['quantity'] && this.isCatalogMode) {
      this.localQuantity = changes['quantity'].currentValue ?? 1;
    }
  }

  addToCart() {
    const qtyToAdd = this.isCartMode ? this.quantity : this.localQuantity;
    this.cartService.addToCart(this.product, qtyToAdd);
  }

  onIncrement() {
    if (this.isCartMode) {
      this.increment.emit();
      return;
    }
    this.localQuantity += 1;
  }

  onDecrement() {
    if (this.isCartMode) {
      this.decrement.emit();
      return;
    }
    if (this.localQuantity > 1) {
      this.localQuantity -= 1;
    }
  }

  onRemove() {
    this.remove.emit();
  }
  goToDetail() {
    if (!this.product) return;
    this.router.navigate(['/product', this.product.id]);
  }

  // si todavía usabas increase/decrease en otros lados,
  // puedes hacerlos delegar a los eventos:
  // increase() { this.onIncrement(); }
  // decrease() { this.onDecrement(); }
}
