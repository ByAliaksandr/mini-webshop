import type { PurchaseRequest } from '../interfaces/purchase.interfaces';

const BASE = '/api/purchases';

export const submitPurchase = async (
  request: PurchaseRequest,
  signal?: AbortSignal
): Promise<void> => {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
    signal,
  });
  if (!res.ok) throw new Error(`Purchase failed: ${res.status}`);
};
