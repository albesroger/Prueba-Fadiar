import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/products.model';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from "../card/card";

@Component({
  selector: 'app-mas-vendidos',
  imports: [ProductCardComponent],
  templateUrl: './masVendidos.html',
})
export class MasVendidos implements OnInit {
  masVendidos: Product[] = [];
  doubleSpanIndexes = [0, 2, 4]; // posiciones que harán col-span-2 (0-based: 3 = 4to, 6 = 7mo)

  constructor(private productService: ProductService) {
    console.log(this.masVendidos.length);
  }

  ngOnInit(): void {
    this.getMasVendidos();
  }

  getMasVendidos() {
    this.productService.getInventory().subscribe({
      next: (products: Product[]) => {
        console.debug('Most sold images received:', products?.length ?? 0);
        const lista = products ?? [];
        this.masVendidos = lista.slice(10, 14);
      },
      error: (err: any) => {
        console.error('Error fetching most sold images for ofertas:', err);
        this.masVendidos = [];
      },
    });
  }
}
