import type { FontConfig, FontManagerConfig } from './types'

export const generateCssVariables = (fonts: Record<string, FontConfig>) => {
  return Object.entries(fonts).reduce((acc, [name, font]) => {
    acc[`--font-${name}`] = font.style.fontFamily
    return acc
  }, {} as Record<string, string>)
}

export const createFontManager = (config: FontManagerConfig) => {
  return {
    config,
    getDefaultFont: () => config.defaultFont || Object.keys(config.fonts)[0],
    getFontList: () => Object.keys(config.fonts),
  }
}
