export interface PurchaseItem {
  productId: number;
  quantity: number;
}

export interface PurchaseRequest {
  items: PurchaseItem[];
}
