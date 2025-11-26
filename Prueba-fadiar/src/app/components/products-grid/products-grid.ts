import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../model/products.model';
import { ProductCardComponent } from '../card/card';
import { SidebarFilters } from '../sidebarFilter/sidebarFilter';

@Component({
  selector: 'app-products-grid',
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './products-grid.html',
})
export class ProductsGrid {
  @Input() products: Product[] = [];
  @Input() searchTerm: string = '';
  @Input() filters?: SidebarFilters | null;

  pageSize = 10; // productos por página
  currentPage = 1;

  get filteredProducts(): Product[] {
    if (!this.products) return [];

    const term = this.searchTerm?.trim().toLowerCase() ?? '';

    return this.products.filter((p) => {
      // 🔍 Filtro por nombre (búsqueda)
      const matchesName = term ? p.name?.toLowerCase().includes(term) : true;

      // 🏷️ Filtro por categorías
      let matchesCategory = true;
      if (this.filters?.categories?.length) {
        const catId = String((p as any).categoria?.id ?? p.categoria);
        matchesCategory = this.filters.categories.includes(catId);
      }

      // 🏭 Filtro por marca
      let matchesBrand = true;
      if (this.filters?.brands?.length) {
        const brand = (p.brand || '').toLowerCase();
        matchesBrand = this.filters.brands.some((b: any) =>
          brand.includes(b.toLowerCase())
        );
      }

      // 💲 Filtro por precio
      let matchesPrice = true;
      if (typeof this.filters?.minPrice === 'number') {
        matchesPrice = p.price >= this.filters.minPrice!;
      }
      if (matchesPrice && typeof this.filters?.maxPrice === 'number') {
        matchesPrice = p.price <= this.filters.maxPrice!;
      }

      return matchesName && matchesCategory && matchesBrand && matchesPrice;
    });
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.products.length / this.pageSize));
  }

  get visiblePages(): number[] {
    const maxVisible = 4;
    const total = this.totalPages;

    // Si hay 4 páginas o menos, muéstralas todas
    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    // Ventana deslizante de 4 páginas
    let start = this.currentPage - Math.floor(maxVisible / 2); // centro en la actual
    let end = start + maxVisible - 1;

    // Ajustar si se pasa por abajo
    if (start < 1) {
      start = 1;
      end = maxVisible;
    }

    // Ajustar si se pasa por arriba
    if (end > total) {
      end = total;
      start = total - maxVisible + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get paginatedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredProducts.slice(start, end);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  prevPage() {
    this.goToPage(this.currentPage - 1);
  }
}
