import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/products.model';
import { ProductService } from '../../services/product.service';
import {
  SidebarFilters,
  SidebarFilterComponent,
} from '../sidebarFilter/sidebarFilter';
import { ProductsGrid } from '../products-grid/products-grid';
import { ProductSearch } from '../product-search/product-search';


@Component({
  selector: 'app-home-products-section',
  imports: [SidebarFilterComponent, ProductsGrid, ProductSearch],
  templateUrl: './home-products-section.html',
})
export class HomeProductsSection implements OnInit {
  allProducts: Product[] = [];
  searchTerm: string = '';
  sidebarFilters?: SidebarFilters | null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getInventory().subscribe({
      next: (products) => {
        this.allProducts = products;
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
