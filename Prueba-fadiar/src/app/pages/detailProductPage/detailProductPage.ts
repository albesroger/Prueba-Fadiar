import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../model/products.model';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-detail-product-page',
  imports: [CommonModule, BreadcrumbComponent],
  templateUrl: './detailProductPage.html',
})
export class DetailProductPage {
  product: Product | null = null;
  quantity = 1;

  /** imagen que se muestra grande (guardamos solo la ruta relativa) */
  mainImage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;

    if (!Number.isNaN(id)) {
      this.productService.getInventory().subscribe({
        next: (products: Product[]) => {
          const found = products.find((p) => p.id === id) ?? null;
          this.product = found;
          this.mainImage = found?.img ?? null;
        },
        error: (err) => {
          console.error('Error cargando producto', err);
          this.product = null;
        },
      });
    }
  }

  /** base para las imágenes (igual que en tus cards) */
  getImageUrl(path: string | null | undefined): string {
    if (!path) return '';
    return `https://app.fadiar.com:444/prueba/api/${path}`;
  }

  onIncrement() {
    this.increment.emit();
  }

  onDecrement() {
    this.decrement.emit();
  }

  @Output() increment = new EventEmitter<void>();
  @Output() decrement = new EventEmitter<void>();

  changeImage(path: string) {
    this.mainImage = path;
  }

  addToCart() {
    if (!this.product) return;
    this.cartService.addToCart(this.product, this.quantity);
  }

  /** propiedades para la tabla (si existen) */
  get productProperties(): { label: string; value: string }[] {
    return this.product?.specs?.map(spec => ({
      label: spec.name,
      value: spec.description
    })) ?? [];
  }
}
