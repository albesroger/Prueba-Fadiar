import { Component, Input, OnInit } from '@angular/core';
import { ProductCardComponent } from '../card/card';
import { Product } from '../../model/products.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-ultimos-productos',
  imports: [ProductCardComponent],
  templateUrl: './ultimosProductos.html',
})
export class UltimosProductos implements OnInit {
  ultimosProd: Product[] = [];
  doubleSpanIndexes = [0, 2, 4]; // posiciones que harán col-span-2 (0-based: 3 = 4to, 6 = 7mo)
  @Input() marginLeft: string = '';

  constructor(private productService: ProductService) {
    console.log(this.ultimosProd.length);
  }

  ngOnInit(): void {
    this.getUltimosProd();
  }

  getUltimosProd() {
    this.productService.getInventory().subscribe({
      next: (products: Product[]) => {
        console.debug('Most sold images received:', products?.length ?? 0);
        const lista = products ?? [];
        this.ultimosProd = lista.slice(0, 6);
      },
      error: (err: any) => {
        console.error('Error fetching most sold images for ofertas:', err);
        this.ultimosProd = [];
      },
    });
  }
}
