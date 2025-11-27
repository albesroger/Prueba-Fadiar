import { Injectable } from '@angular/core';

export type PaymentMethod = 'card' | 'tropipay';

export interface PayerData {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  address: string;
  note: string;
}

export interface BeneficiaryData {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  idCard: string;
  address: string;
  note: string;
}

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  paymentMethod: PaymentMethod = 'card';

  payer: PayerData = {
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+53',
    phone: '',
    address: '',
    note: '',
  };

  beneficiary: BeneficiaryData = {
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+53',
    phone: '',
    idCard: '',
    address: '',
    note: '',
  };

  // por ahora fijo; luego lo puedes cambiar según provincia, etc.
  shippingCost = 10;

  setPaymentData(method: PaymentMethod, payer: PayerData) {
    this.paymentMethod = method;
    this.payer = { ...payer };
  }

  setDeliveryData(beneficiary: BeneficiaryData) {
    this.beneficiary = { ...beneficiary };
  }
}
