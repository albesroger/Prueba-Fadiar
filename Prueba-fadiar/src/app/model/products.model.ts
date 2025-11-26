// producto.ts
export interface Product {
  id: number;
  cantidad?: number;
  name: string;
  img: string;
  description: string;
  model: string;
  brand: string;
  regret: boolean;
  disabled: boolean;
  pre_venta: boolean;
  warranty: number;
  price: number;
  temporal_price: number;
  commission: number;
  count: number;
  specs: { id: number; name: string; description: string };
  categoria: { id: number; name: string; id_padre: number };
  size: [
    {
      id: number;
      size: string;
      units: number;
      mode: string;
      price_increment: number;
      delivery_commission: number;
      id_commission_currency: number;
    }
  ];
  currency: [
    {
      id: number;
      main: boolean;
      value: number;
      active: boolean;
      currency: string;
    }
  ];
}
