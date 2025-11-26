import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-search.html',
})
export class ProductSearch {
  term: string = '';

  @Output() termChange = new EventEmitter<string>();

  onTermChange(value: string) {
    this.term = value;
    this.termChange.emit(value);
  }
}
