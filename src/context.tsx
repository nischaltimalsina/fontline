import React, { createContext, useContext, useEffect, useState } from 'react'
import type { FontConfig, FontContextType, FontManagerConfig } from './types'

const FontContext = createContext<FontContextType | undefined>(undefined)

export interface FontProviderProps {
  children: React.ReactNode;
  config: FontManagerConfig;
}

export function FontProvider({ children, config }: FontProviderProps) {
  const [currentFont, setCurrentFont] = useState<string>(config.defaultFont || Object.keys(config.fonts)[0])
  const [fonts, setFonts] = useState<Record<string, FontConfig>>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const loadFonts = async () => {
      const loadedFonts: Record<string, FontConfig> = {}

      for (const [name, definition] of Object.entries(config.fonts)) {
        const fontInstance = await definition.font(definition.options)
        loadedFonts[name] = fontInstance as FontConfig
      }

      setFonts(loadedFonts)
      setMounted(true)
    }

    loadFonts()
  }, [config.fonts])

  useEffect(() => {
    if (mounted) {
      const savedFont = localStorage.getItem('font')
      if (savedFont && savedFont in fonts) {
        setCurrentFont(savedFont)
      }
    }
  }, [mounted, fonts])

  useEffect(() => {
    if (mounted && fonts[currentFont]) {
      document.documentElement.style.setProperty(
        '--font-primary',
        fonts[currentFont].style.fontFamily
      )
      localStorage.setItem('font', currentFont)
    }
  }, [currentFont, mounted, fonts])

  const getFontClassName = () => {
    return Object.values(fonts)
      .map((font) => font.className)
      .join(' ')
  }

  return (
    <FontContext.Provider
      value={{
        currentFont,
        setFont: setCurrentFont,
        fonts,
        getFontClassName
      }}
    >
      {children}
    </FontContext.Provider>
  )
}

export const useFont = () => {
  const context = useContext(FontContext)
  if (!context) {
    throw new Error('useFont must be used within a FontProvider')
  }
  return context
}
