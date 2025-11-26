import { Component } from '@angular/core';
import { CategoriaSeccionComponent } from '../../components/categoriaSeccion/categoriaSeccion';
import { OfertasSeccion } from '../../components/ofertasSeccion/ofertasSeccion';
import { UltimosProductos } from '../../components/ultimosProductos/ultimosProductos';
import { MasVendidos } from '../../components/masVendidos/masVendidos';
import { ComingSoonBannerComponent } from "../../components/coming-soon/coming-soon-banner";
import { Welcome } from "../../components/welcome/welcome";

@Component({
  selector: 'app-home',
  imports: [
    CategoriaSeccionComponent,
    OfertasSeccion,
    UltimosProductos,
    MasVendidos,
    ComingSoonBannerComponent,
    Welcome
],
  templateUrl: './home.html',
})
export class Home {}
