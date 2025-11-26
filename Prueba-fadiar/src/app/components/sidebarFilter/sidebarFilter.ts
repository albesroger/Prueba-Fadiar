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

  // IDs alineados con la API (categoria.id)
  categories: FilterOption[] = [
    { id: 'all', label: 'Todas las Categorías' },
    { id: '1', label: 'Accesorios' },
    { id: '3', label: 'Batidoras y otros Procesadores' },
    { id: '4', label: 'Cafeteras y Teteras' },
    { id: '5', label: 'Calentadores y Motores de agua' },
    { id: '6', label: 'Cocinas y Hornos' },
    { id: '7', label: 'Generadores Eléctricos' },
    { id: '8', label: 'Iluminación' },
    { id: '9', label: 'Lavadoras y Secadoras' },
    { id: '10', label: 'Ollas y tostadoras' },
    { id: '11', label: 'Refrigeradores y Neveras' },
    { id: '12', label: 'Televisión y Audio' },
    { id: '15', label: 'Ventiladores' },
    { id: '16', label: 'Muebles' },
    { id: '17', label: 'Filtros y Respuestos' },
    { id: '18', label: 'Clima' },
    { id: '21', label: 'Vajillas' },
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
