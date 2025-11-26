import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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

  quantity = 1;

  constructor(private cartService: CartService){}
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
}
