import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductSearchService } from '../../../services/product-search.service';
import { ProductSearch } from '../../product-search/product-search';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, FormsModule, CommonModule, ProductSearch, RouterLinkActive],
  templateUrl: './navbar.html',
})
export class Navbar {
  constructor(private productSearchService: ProductSearchService) {}

  onTermChange(term: string) {
    this.productSearchService.setTerm(term);
  }
}
