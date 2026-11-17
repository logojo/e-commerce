
export type PayPalCapture = {
  id?: string;
  status?: string;
  custom_id?: string;
  amount?: {
    currency_code?: string;
    value?: string;
  };
};

export type PayPalOrderResponse = {
  id: string;
  status: string;
  purchase_units?: Array<{
    custom_id?: string;
    amount?: {
      currency_code?: string;
      value?: string;
    };
    payments?: {
      captures?: PayPalCapture[];
    };
  }>;
};