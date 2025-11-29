import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-search.html',
})
export class ProductSearch {
  term: string = '';
  @Input() showFilterButton = false;

  @Output() termChange = new EventEmitter<string>();
  @Output() filterClick = new EventEmitter<void>();

  onTermChange(value: string) {
    this.term = value;
    this.termChange.emit(value);
  }

  onFilterClick(): void {
    this.filterClick.emit();
  }
}
