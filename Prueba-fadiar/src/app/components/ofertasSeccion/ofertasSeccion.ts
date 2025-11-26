import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../model/products.model';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../card/card';

@Component({
  selector: 'app-ofertas-seccion',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './ofertasSeccion.html',
})
export class OfertasSeccion implements OnInit {
  ofertas: Product[] = [];
  doubleSpanIndexes = [0, 1, 2]; // posiciones que harán col-span-2 (0-based: 3 = 4to, 6 = 7mo)

  constructor(private productService: ProductService) {
    console.log(this.ofertas.length);
  }

  ngOnInit(): void {
    this.getOfertas();
  }

  // Usa el endpoint /img_mas_vendido que ya devuelve las ofertas necesarias
  getOfertas() {
    this.productService.getMostSoldImages().subscribe({
      next: (products: Product[]) => {
        console.debug('Most sold images received:', products?.length ?? 0);
        this.ofertas = products ?? [];
      },
      error: (err: any) => {
        console.error('Error fetching most sold images for ofertas:', err);
        this.ofertas = [];
      },
    });
  }

  isDoubleSpan(index: number): boolean {
    return this.doubleSpanIndexes.includes(index);
  }

  getLayout(index: number): 'vertical' | 'horizontal' {
    return this.isDoubleSpan(index) ? 'horizontal' : 'vertical';
  }

  getMedidas(index: number): { altura: number; ancho: number } {
    if (this.getLayout(index) === 'horizontal') {
      return { altura: 268, ancho: 520 }; // Ejemplo de medidas para horizontal
    } else {
      return { altura: 556, ancho: 250 }; // Ejemplo de medidas para vertical
    }
  }
}
