import { Component } from '@angular/core';
import { CategoriaSeccionComponent } from '../../components/categoriaSeccion/categoriaSeccion';

@Component({
  selector: 'app-home',
  imports: [CategoriaSeccionComponent],
  templateUrl: './home.html',
})
export class Home {}
