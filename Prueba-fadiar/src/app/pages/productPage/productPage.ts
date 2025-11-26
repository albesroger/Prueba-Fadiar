import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Welcome } from '../../components/welcome/welcome';
import { SidebarFilterComponent, SidebarFilters } from '../../components/sidebarFilter/sidebarFilter';
import { ProductsGrid } from '../../components/products-grid/products-grid';
import { ProductSearch } from '../../components/product-search/product-search';

import { ProductService } from '../../services/product.service';
import { Product } from '../../model/products.model';
import { UltimosProductos } from "../../components/ultimosProductos/ultimosProductos";
import { Billetes } from "../../components/billetes/billetes";

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, Welcome, SidebarFilterComponent, ProductsGrid, ProductSearch, UltimosProductos, Billetes],
  templateUrl: './productPage.html',
})
export class ProductPage implements OnInit {
  allProducts: Product[] = [];
  searchTerm: string = '';
  sidebarFilters?: SidebarFilters;

  constructor(private productService: ProductService) {}

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

  onSearchChange(term: string) {
    this.searchTerm = term;
  }

  onFiltersChange(filters: SidebarFilters) {
    this.sidebarFilters = filters;
  }
}
