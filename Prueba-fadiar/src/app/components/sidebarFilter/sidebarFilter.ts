import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';


export interface FilterOption {
  id: string;
  label: string;
}

export interface SidebarFilters {
  categories: string[];
  brands: string[];
  relevant?: string;
  minPrice?: number;
  maxPrice?: number;
}

@Component({
  selector: 'app-sidebar-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebarFilter.html',
})
export class SidebarFilterComponent {
  // Secciones colapsables
  sectionsOpen = {
    categories: true,
    price: true,
    brands: true,
    relevant: true,
  };

  // Datos de ejemplo (luego puedes cargarlos del backend)
  categories: FilterOption[] = [
    { id: 'all', label: 'Todas las Categorías' },
    { id: 'fridges', label: 'Refrigeradores y Neveras' },
    { id: 'stoves', label: 'Cocinas y Hornos' },
    { id: 'furniture', label: 'Muebles' },
    { id: 'filters', label: 'Filtros y Repuestos' },
    { id: 'washers', label: 'Lavadoras y Secadoras' },
    { id: 'pots', label: 'Ollas y tostadoras' },
    { id: 'lighting', label: 'Iluminación' },
    { id: 'clima', label: 'Clima' },
    { id: 'fans', label: 'Ventiladores' },
    { id: 'generators', label: 'Generadores Eléctricos' },
    { id: 'tv', label: 'Televisión y Audio' },
    { id: 'dishes', label: 'Vajillas' },
    { id: 'accessories', label: 'Accesorios' },
  ];

  brands: FilterOption[] = [
    { id: 'all', label: 'Todas las Marcas' },
    { id: 'ecko', label: 'Ecko' },
    { id: 'eon', label: 'Eón' },
    { id: 'midea', label: 'Midea' },
    { id: 'desmatt', label: 'Desmatt' },
    { id: 'led', label: 'Led Drivert' },
    { id: 'columbia', label: 'Columbia' },
    { id: 'ciconet', label: 'Ciconet' },
  ];

  relevantOptions: FilterOption[] = [
    { id: 'offers', label: 'Ofertas' },
    { id: 'top-sellers', label: 'Más vendidos' },
    { id: 'coming-soon', label: 'Próximamente' },
  ];

  // estado seleccionado
  selectedCategories = new Set<string>();
  selectedBrands = new Set<string>();
  selectedRelevant?: string;

  minPrice = 0;
  maxPrice = 200;

  @Output() filtersChange = new EventEmitter<SidebarFilters>();

  toggleSection(key: keyof typeof this.sectionsOpen) {
    this.sectionsOpen[key] = !this.sectionsOpen[key];
  }

  onToggleCategory(id: string) {
    if (id === 'all') {
      // seleccionar / deseleccionar todo
      if (this.selectedCategories.has('all')) {
        this.selectedCategories.clear();
      } else {
        this.selectedCategories = new Set(this.categories.map((c) => c.id));
      }
    } else {
      if (this.selectedCategories.has(id)) {
        this.selectedCategories.delete(id);
      } else {
        this.selectedCategories.add(id);
      }
      this.selectedCategories.delete('all');
    }
    this.emitFilters();
  }

  onToggleBrand(id: string) {
    if (id === 'all') {
      if (this.selectedBrands.has('all')) {
        this.selectedBrands.clear();
      } else {
        this.selectedBrands = new Set(this.brands.map((b) => b.id));
      }
    } else {
      if (this.selectedBrands.has(id)) {
        this.selectedBrands.delete(id);
      } else {
        this.selectedBrands.add(id);
      }
      this.selectedBrands.delete('all');
    }
    this.emitFilters();
  }

  onRelevantChange(id: string) {
    this.selectedRelevant = id;
    this.emitFilters();
  }

  onPriceChange() {
    this.emitFilters();
  }

  isCategoryChecked(id: string) {
    return this.selectedCategories.has(id);
  }

  isBrandChecked(id: string) {
    return this.selectedBrands.has(id);
  }

  emitFilters() {
    this.filtersChange.emit({
      categories: Array.from(this.selectedCategories),
      brands: Array.from(this.selectedBrands),
      relevant: this.selectedRelevant,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
    });
  }
}
