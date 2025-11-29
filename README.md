# Prueba Fadiar

Front-end de comercio electrónico construido con Angular 19 y Tailwind. Incluye listado de productos con filtros, páginas de detalle, carrito, perfil y secciones de marketing.

## Requisitos
- Node.js 20+ (recomendado LTS)
- npm 10+

## Instalación
```bash
npm install
```

## Scripts principales
- `npm start` — levanta el servidor de desarrollo en `http://localhost:4200/`.
- `npm run build` — genera el build de producción en `dist/`.
- `npm test` — ejecuta las pruebas unitarias con Karma.

## Estructura rápida
- `src/app/components` — UI modular (navbar, grids, banners, filtros, etc.).
- `src/app/pages` — páginas principales (productos, carrito, perfil, FAQ, etc.).
- `src/app/services` — servicios compartidos (productos, búsqueda global, sidebar toggle).
- `src/app/model` — modelos de datos.

## Desarrollo
1) Instala dependencias (`npm install`).
2) Arranca el dev server (`npm start`).
3) Ajusta estilos con Tailwind desde las clases utilitarias en los templates.

## Notas
- El buscador en el navbar sincroniza el término global para `productPage`.
- El sidebar de filtros se abre en móvil desde el botón de filtros y permanece fijo en desktop.
- Ajusta variables de precio y filtros en `sidebarFilter` según la API real.
