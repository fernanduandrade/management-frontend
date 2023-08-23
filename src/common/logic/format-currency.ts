export function formatCurrency(price: number): string {
  return price.toLocaleString('pt_BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
