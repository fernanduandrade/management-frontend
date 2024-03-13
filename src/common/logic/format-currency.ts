export function formatCurrency(price?: number): string {
  if (!price)
    return 'R$ 0'

  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
