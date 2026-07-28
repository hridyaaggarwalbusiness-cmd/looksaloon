const loadedImages = new Set()

export function isImageLoaded(src) {
  return Boolean(src) && loadedImages.has(src)
}

export function markImageLoaded(src) {
  if (src) loadedImages.add(src)
}

export function preloadImage(src) {
  if (!src || loadedImages.has(src)) return

  const img = new Image()
  img.onload = () => markImageLoaded(src)
  img.src = src
}
