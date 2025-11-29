import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Welcome } from '../../components/welcome/welcome';
import {
  SidebarFilterComponent,
  SidebarFilters,
} from '../../components/sidebarFilter/sidebarFilter';
import { ProductsGrid } from '../../components/products-grid/products-grid';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/products.model';
import { ProductSearchService } from '../../services/product-search.service';
import { Observable, Subject } from 'rxjs';
import { Billetes } from '../../components/billetes/billetes';
import { UltimosProductos } from '../../components/ultimosProductos/ultimosProductos';
import { SidebarToggleService } from '../../services/sidebar-toggle.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    CommonModule,
    Welcome,
    SidebarFilterComponent,
    ProductsGrid,
    Billetes,
    UltimosProductos

],
  templateUrl: './productPage.html',
})
export class ProductPage implements OnInit, OnDestroy {
  allProducts: Product[] = [];
  sidebarFilters?: SidebarFilters;
  public isSidebarOpen = false;

  // 👇 observable del término global
  searchTerm$: Observable<string>;

  private destroy$ = new Subject<void>();

  constructor(
    private productService: ProductService,
    private productSearchService: ProductSearchService,
    private sidebarToggleService: SidebarToggleService
  ) {
    this.searchTerm$ = this.productSearchService.term$;
  }

  ngOnInit(): void {
    this.sidebarToggleService.toggle$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.toggleSidebar());

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
    this.isSidebarOpen = false;
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
