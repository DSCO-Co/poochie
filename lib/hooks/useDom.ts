export const useDOM = () => {
  if (
    typeof window === 'undefined' ||
    !window.document ||
    !window.document.createElement
  ) {
    return false
  }
  return true
}
