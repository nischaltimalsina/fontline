# next-font-manager

A powerful and flexible font management system for Next.js applications.

[![npm version](https://badge.fury.io/js/next-font-manager.svg)](https://badge.fury.io/js/next-font-manager)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎯 Type-safe font configuration
- 🔄 Automatic font loading and management
- 💾 Persistent font preferences
- 🎨 CSS variables integration
- ⚛️ React hooks for font management
- 📦 Zero-config integration with Next.js
- 🌓 Smooth font transitions
- 🔍 SSR support

## Installation

```bash
# npm
npm install next-font-manager

# pnpm
pnpm add next-font-manager

# yarn
yarn add next-font-manager
```

## Quick Start

1. Load your fonts using Next.js font loaders:

```typescript
// app/fonts.ts
import { Inter, Roboto } from 'next/font/google'
import type { FontProviderProps } from 'next-font-manager'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
})

export const fontConfig: FontProviderProps = {
  fonts: {
    inter: {
      className: inter.className,
      style: { fontFamily: inter.style.fontFamily }
    },
    roboto: {
      className: roboto.className,
      style: { fontFamily: roboto.style.fontFamily }
    }
  },
  defaultFont: 'inter',
  // Optional: Custom class mappings
  values: {
    inter: 'my-custom-inter',
    roboto: 'my-custom-roboto'
  },
}
```

2. Set up the provider in your layout:

```typescript
// app/layout.tsx
import { FontProvider } from 'next-font-manager'
import { fontConfig } from './fonts'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <FontProvider {...fontConfig}>
          {children}
        </FontProvider>
      </body>
    </html>
  )
}
```

3. Use the hook in your components:

```typescript
// components/font-selector.tsx
import { useFont } from 'next-font-manager'

export function FontSelector() {
  const { font, setFont, fonts } = useFont()

  return (
    <select
      value={font}
      onChange={(e) => setFont(e.target.value)}
    >
      {fonts.map((fontName) => (
        <option key={fontName} value={fontName}>
          {fontName}
        </option>
      ))}
    </select>
  )
}
```

## API Reference

### FontProvider

The main provider component for font management.

```typescript
interface FontProviderProps {
  fonts: Record<string, FontConfig>;
  defaultFont: string;
  forcedFont?: string;
  storageKey?: string;
  disableTransitionOnChange?: boolean;
  values?: FontValues;
  nonce?: string;
}
```

### useFont Hook

Hook for accessing font state and controls.

```typescript
interface UseFontProps {
  font: string;
  setFont: React.Dispatch<React.SetStateAction<string>>;
  fonts: string[];
  forcedFont?: string;
  resolvedFont: string;
}

const { font, setFont, fonts, resolvedFont } = useFont()
```

## Configuration Options

- `fonts`: Record of available fonts with their configurations
- `defaultFont`: Initial font to use
- `forcedFont`: Override user selection (optional)
- `storageKey`: LocalStorage key for persistence (default: 'font')
- `disableTransitionOnChange`: Disable transitions when changing fonts
- `values`: Custom class name mappings
- `nonce`: CSP nonce for inline scripts

## Advanced Usage

### Custom Font Classes

```typescript
const fontConfig: FontProviderProps = {
  fonts: {
    inter: {
      className: 'font-inter',
      style: { fontFamily: 'Inter' }
    }
  },
  values: {
    inter: 'my-custom-class'
  }
}
```

### Forced Font

```typescript
<FontProvider
  {...fontConfig}
  forcedFont="inter"
>
  {children}
</FontProvider>
```

### Disable Transitions

```typescript
<FontProvider
  {...fontConfig}
  disableTransitionOnChange
>
  {children}
</FontProvider>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE 11 (basic support)

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## License

[MIT](LICENSE.md)
