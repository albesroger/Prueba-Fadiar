import { Component } from '@angular/core';
import { CategoriaSeccionComponent } from '../../components/categoriaSeccion/categoriaSeccion';
import { OfertasSeccion } from '../../components/ofertasSeccion/ofertasSeccion';
import { UltimosProductos } from '../../components/ultimosProductos/ultimosProductos';
import { MasVendidos } from '../../components/masVendidos/masVendidos';

@Component({
  selector: 'app-home',
  imports: [
    CategoriaSeccionComponent,
    OfertasSeccion,
    UltimosProductos,
    MasVendidos,
  ],
  templateUrl: './home.html',
})
export class Home {}
