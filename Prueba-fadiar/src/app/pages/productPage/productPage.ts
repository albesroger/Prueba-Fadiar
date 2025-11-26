import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Welcome } from '../../components/welcome/welcome';
import { SidebarFilterComponent, SidebarFilters } from '../../components/sidebarFilter/sidebarFilter';
import { ProductsGrid } from '../../components/products-grid/products-grid';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/products.model';
import { ProductSearchService } from '../../services/product-search.service';
import { Observable } from 'rxjs';
import { Billetes } from "../../components/billetes/billetes";
import { UltimosProductos } from "../../components/ultimosProductos/ultimosProductos";

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, Welcome, SidebarFilterComponent, ProductsGrid, Billetes, UltimosProductos],
  templateUrl: './productPage.html',
})
export class ProductPage implements OnInit {
  allProducts: Product[] = [];
  sidebarFilters?: SidebarFilters;

  // 👇 observable del término global
  searchTerm$: Observable<string>;

  constructor(
    private productService: ProductService,
    private productSearchService: ProductSearchService
  ) {
    this.searchTerm$ = this.productSearchService.term$;
  }

  ngOnInit(): void {
    this.productService.getInventory().subscribe({
      next: (products) => {
        this.allProducts = products ?? [];
      },
      error: (err) => {
        console.error('Error cargando productos:', err);
        this.allProducts = [];
      },
    });
  }

  onFiltersChange(filters: SidebarFilters) {
    this.sidebarFilters = filters;
  }
}
