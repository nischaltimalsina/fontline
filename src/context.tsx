"use client"

import * as React from 'react'
import type { FontConfig, FontProviderProps, UseFontProps, FontValues } from './types'
import { getFontScript } from './script'

const FontContext = React.createContext<UseFontProps | undefined>(undefined)

const getInitialFont = (storageKey: string, defaultFont: string): string => {
  if (typeof window === 'undefined') return defaultFont
  try {
    const stored = localStorage.getItem(storageKey)
    return stored ?? defaultFont
  } catch (e) {
    return defaultFont
  }
}
const defaultContext: UseFontProps = {
  setFont: () => {},
  fonts: [],
  font: "",
  resolvedFont: "",
}

export const useFont = () => React.useContext(FontContext) ?? defaultContext

const Font = ({
  forcedFont,
  disableTransitionOnChange = false,
  storageKey = 'font',
  fonts,
  defaultFont,
  values,
  children,
  nonce,
}: FontProviderProps) => {
  const [font, setFont] = React.useState(() => getInitialFont(storageKey, defaultFont))

  const applyFont = React.useCallback((fontName: string) => {
    if (!fontName || !fonts[fontName]) return

    const enable = disableTransitionOnChange ? disableAnimation(nonce) : null
    const d = document.documentElement

    // Remove all previous font classes
    Object.keys(fonts).forEach(name => {
      const className = values?.[name] || fonts[name].className
      d.classList.remove(className)
    })

    const className = values?.[fontName] || fonts[fontName].className
    d.classList.add(className)
    d.style.setProperty('--font-primary', fonts[fontName].style.fontFamily)

    enable?.()
  }, [fonts, values, nonce, disableTransitionOnChange])

  // Use effect to save to localStorage
  React.useEffect(() => {
    if (font) {
      try {
        localStorage.setItem(storageKey, font)
      } catch (e) {
        // Unsupported
      }
    }
  }, [font, storageKey])

  // localStorage event handling
  React.useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== storageKey) return
      const newFont = e.newValue || defaultFont
      setFont(newFont)
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [storageKey, defaultFont])

  // Apply font whenever it changes
  React.useEffect(() => {
    applyFont(forcedFont ?? font)
  }, [forcedFont, font, applyFont])

    const providerValue = React.useMemo<UseFontProps>(() => ({
    font,
    setFont,
    forcedFont,
    resolvedFont: forcedFont ?? font,
    fonts: Object.keys(fonts)
  }), [font, forcedFont, fonts])

  return (
    <FontContext.Provider value={providerValue}>
      <FontScript
        storageKey={storageKey}
        defaultFont={defaultFont}
        forcedFont={forcedFont}
        fonts={fonts}
        values={values}
        nonce={nonce}
      />
      {children}
    </FontContext.Provider>
  )
}

const FontScript = React.memo(({
  storageKey,
  defaultFont,
  forcedFont,
  fonts,
  values,
  nonce,
}: {
  storageKey: string;
  defaultFont: string;
  forcedFont?: string;
  fonts: Record<string, FontConfig>;
  values?: FontValues;
  nonce?: string;
}) => {
  const scriptArgs = JSON.stringify({
    storageKey,
    defaultFont,
    forcedFont,
    fonts,
    values,
  })

  return (
    <script
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: `(${getFontScript()})(${scriptArgs})`
      }}
    />
  )
})

const disableAnimation = (nonce?: string) => {
  const css = document.createElement('style')
  if (nonce) css.setAttribute('nonce', nonce)
  css.appendChild(
    document.createTextNode(
      `*,*::before,*::after{transition:none!important}`
    )
  )
  document.head.appendChild(css)

  return () => {
    (() => window.getComputedStyle(document.body))()
    setTimeout(() => {
      document.head.removeChild(css)
    }, 1)
  }
}

export const FontProvider = (props: FontProviderProps) => {
  const context = React.useContext(FontContext)
  if (context) return <>{props.children}</>
  return <Font {...props} />
}
