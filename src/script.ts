import { FontConfig, FontValueObject } from "./types"

export const script = (
  storageKey: string,
  defaultFont: string,
  forcedFont: string | undefined,
  fonts: Record<string, FontConfig>,
  value: FontValueObject | undefined
) => {
  const el = document.documentElement

  function updateDOM(font: string) {
    const fontConfig = fonts[font]
    if (!fontConfig) return

    // Remove all previous font classes
    Object.keys(fonts).forEach(name => {
      const className = value?.[name] || fonts[name].className
      el.classList.remove(className)
    })

    // Add new font class
    const className = value?.[font] || fontConfig.className
    el.classList.add(className)

    // Update CSS custom property
    el.style.setProperty('--font-primary', fontConfig.style.fontFamily)
  }

  if (forcedFont) {
    updateDOM(forcedFont)
  } else {
    try {
      const fontName = localStorage.getItem(storageKey) || defaultFont
      updateDOM(fontName)
    } catch (e) {
      // Unsupported
    }
  }
}
