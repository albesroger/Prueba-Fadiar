import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadAppBanner } from "../../components/DownloadAppBanner/DownloadAppBanner";

type OrderStatus = 'Entregado' | 'Cancelado' | 'Pendiente';

interface OrderItem {
  id: number;
  name: string;
  brand: string;
  img: string;
  price: number;
  currency: string; // 'USD', etc.
}

interface Order {
  id: number;
  code: string; // #53803
  date: string; // 2025-10-01
  time: string; // 08:39
  ci: string; // carnet
  phone: string;
  status: OrderStatus;
  items: OrderItem[];
}

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, DownloadAppBanner],
  templateUrl: './ordersPage.html',
})
export class OrdersPage {
  // en la integración real, esto vendrá del backend
  orders: Order[] = [
    {
      id: 1,
      code: '#83803',
      date: '2025-10-01',
      time: '08:39',
      ci: '82022135776',
      phone: '56131490',
      status: 'Entregado',
      items: [
        {
          id: 1,
          name: 'Ventilador De Mesa 16',
          brand: 'Desmatt',
          img: '_images/products/92/main_92_2025-09-15_00-05-29.jpg',
          price: 365,
          currency: 'USD',
        },
        {
          id: 2,
          name: 'Secadora A Vapor 8 Kg (220v)',
          brand: 'Eko',
          img: '_images/products/91/main_91_2025-09-15_00-05-29.jpg',
          price: 63,
          currency: 'USD',
        },
      ],
    },
    {
      id: 2,
      code: '#53833',
      date: '2025-10-01',
      time: '08:39',
      ci: '82022135776',
      phone: '56131490',
      status: 'Entregado',
      items: [
        {
          id: 1,
          name: 'Batidora De Mano 3 En 1',
          brand: 'Desmatt',
          img: '_images/products/10/main_10_2025-09-15_00-05-29.jpg',
          price: 365,
          currency: 'USD',
        },
        {
          id: 2,
          name: 'Cafetera De 1 Taza',
          brand: 'Eko',
          img: '_images/products/53/main_53_2025-09-15_00-05-29.jpg',
          price: 63,
          currency: 'USD',
        },
      ],
    },
    {
      id: 3,
      code: '#63803',
      date: '2025-10-01',
      time: '08:39',
      ci: '82022135776',
      phone: '56131490',
      status: 'Cancelado',
      items: [
        
      ],
    },
    {
      id: 4,
      code: '#25603',
      date: '2025-10-01',
      time: '08:39',
      ci: '82022135776',
      phone: '56131490',
      status: 'Entregado',
      items: [
        {
          id: 1,
          name: 'Ventilador De Mesa 16',
          brand: 'Desmatt',
          img: '_images/products/92/main_92_2025-09-15_00-05-29.jpg',
          price: 365,
          currency: 'USD',
        },
        {
          id: 1,
          name: 'Calentador De Agua Eléctrico 50 Lts',
          brand: 'Desmatt',
          img: '_images/products/30/main_30_2025-09-15_00-05-29.jpg',
          price: 365,
          currency: 'USD',
        },
      ],
    },
  ];

  // id del pedido expandido
  activeOrderId: number | null = null;

  toggleOrder(order: Order) {
    this.activeOrderId = this.activeOrderId === order.id ? null : order.id;
  }

  // clases del badge de estado
  getStatusClasses(status: OrderStatus): string {
    switch (status) {
      case 'Entregado':
        return 'bg-[#24CC4F] text-white';
      case 'Cancelado':
        return 'bg-[#F44336] text-white';
      default:
        return 'bg-[#FFB74D] text-white';
    }
  }
}
