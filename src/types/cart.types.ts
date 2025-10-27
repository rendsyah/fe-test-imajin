export type AddCart = {
  product_id: number;
  quantity: number;
};

export type ListCart = {
  id: string;
  product_id: number;
  product_name: string;
  product_price: number;
  product_image: string;
  quantity: number;
  amount: number;
  selected?: boolean;
};
