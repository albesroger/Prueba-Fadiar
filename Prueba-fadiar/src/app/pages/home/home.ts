import { Component } from '@angular/core';
import { CategoriaSeccionComponent } from '../../components/categoriaSeccion/categoriaSeccion';
import { OfertasSeccion } from "../../components/ofertasSeccion/ofertasSeccion";

@Component({
  selector: 'app-home',
  imports: [CategoriaSeccionComponent, OfertasSeccion],
  templateUrl: './home.html',
})
export class Home {}
