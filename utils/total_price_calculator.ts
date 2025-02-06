export default function totalPriceCalculator<T extends { item_price: number; quantity?: number }>(items: T[]): number {
  return items.reduce((total, item) => total + item.item_price * (item.quantity ?? 1), 0);
}
