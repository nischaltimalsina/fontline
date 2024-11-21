import React, { createContext, useContext, useEffect, useState } from 'react'
import type { FontManagerConfig, LoadedFont } from './types'

const FontContext = createContext<{
  currentFont: string;
  setFont: (font: string) => void;
  fonts: Record<string, LoadedFont>;
  getFontClassName: () => string;
} | undefined>(undefined)

export interface FontProviderProps {
  children: React.ReactNode;
  config: FontManagerConfig;
}

export function FontProvider({ children, config }: FontProviderProps) {
  const [currentFont, setCurrentFont] = useState<string>(
    config.defaultFont || Object.keys(config.fonts)[0]
  )

  useEffect(() => {
    const savedFont = localStorage.getItem('font')
    if (savedFont && savedFont in config.fonts) {
      setCurrentFont(savedFont)
    }
  }, [config.fonts])

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--font-primary',
      config.fonts[currentFont].font.style.fontFamily
    )
    localStorage.setItem('font', currentFont)
  }, [currentFont, config.fonts])

  const getFontClassName = () => {
    return Object.values(config.fonts)
      .map((fontData) => fontData.font.className)
      .join(' ')
  }

  return (
    <FontContext.Provider value={{
      currentFont,
      setFont: setCurrentFont,
      fonts: config.fonts,
      getFontClassName,
    }}>
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
