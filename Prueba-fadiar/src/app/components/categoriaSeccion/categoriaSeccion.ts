import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categoria-seccion',
  imports: [RouterModule],
  templateUrl: './categoriaSeccion.html',
})
export class CategoriaSeccionComponent {
  categories = [
    {
      title: 'Ventiladores',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit hendrerit scelerisque.',
      buttonText: 'Ver más',
      image: 'assets/img/categorias/ventiladores.png', // cambia la ruta
      link: '/assets/images/ventiladores.png',
      align: 'left', // texto a la izquierda, imagen al centro
    },
    {
      title: 'Refrigeradores y Neveras',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit hendrerit scelerisque, blandit duis sapien.',
      buttonText: 'Ver más',
      image: 'assets/img/categorias/refrigeradores.png', // cambia la ruta
      link: '/categoria/refrigeradores',
      align: 'right', // texto al centro, imagen a la derecha
    },
  ];
}
