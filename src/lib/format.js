export function formatDuration(minutes) {
  if (!minutes) return ''
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return rest ? `${hours}h ${rest}m` : `${hours}h`
}

export function formatPrice(originalPrice, discountedPrice) {
  const hasDiscount = discountedPrice && discountedPrice > 0 && discountedPrice < originalPrice
  return {
    hasDiscount,
    current: hasDiscount ? discountedPrice : originalPrice,
    original: hasDiscount ? originalPrice : null,
  }
}

export const GENDER_LABELS = {
  unisex: 'Unisex',
  women: 'For Women',
  men: 'For Men',
  kids: 'For Kids',
}
