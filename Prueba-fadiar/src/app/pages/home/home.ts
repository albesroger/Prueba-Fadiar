import { Component } from '@angular/core';
import { CategoriaSeccionComponent } from '../../components/categoriaSeccion/categoriaSeccion';
import { OfertasSeccion } from '../../components/ofertasSeccion/ofertasSeccion';
import { UltimosProductos } from '../../components/ultimosProductos/ultimosProductos';
import { MasVendidos } from '../../components/masVendidos/masVendidos';
import { ComingSoonBannerComponent } from "../../components/coming-soon/coming-soon-banner";

@Component({
  selector: 'app-home',
  imports: [
    CategoriaSeccionComponent,
    OfertasSeccion,
    UltimosProductos,
    MasVendidos,
    ComingSoonBannerComponent
],
  templateUrl: './home.html',
})
export class Home {}
