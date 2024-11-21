# next-font-manager

A powerful and flexible font management system for Next.js applications with TypeScript support.

## Features

- 🎯 Type-safe font configuration
- 🔄 Automatic font loading and management
- 💾 Persistent font preferences
- 🎨 CSS variables integration
- ⚛️ React hooks for font management
- 📦 Zero-config integration with Next.js
- 🔍 Optimized font loading strategies
- 🌐 Support for Google Fonts and local fonts

## Installation

```bash
# npm
npm install next-font-manager

# yarn
yarn add next-font-manager

# pnpm
pnpm add next-font-manager
```

## Quick Start

1. Configure your fonts:

```typescript
// app/font-config.ts
import { FontManagerConfig, Inter, Roboto } from 'next-font-manager'

export const fontConfig: FontManagerConfig = {
  fonts: {
    inter: {
      font: Inter,
      options: {
        subsets: ['latin'],
        variable: '--font-inter',
        display: 'swap',
      },
    },
    roboto: {
      font: Roboto,
      options: {
        subsets: ['latin'],
        weight: ['400', '500', '700'],
        variable: '--font-roboto',
        display: 'swap',
      },
    },
  },
  defaultFont: 'inter',
}
```

2. Set up the provider:

```typescript
// app/layout.tsx
import { FontProvider } from 'next-font-manager'
import { fontConfig } from './font-config'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <FontProvider config={fontConfig}>
          {children}
        </FontProvider>
      </body>
    </html>
  )
}
```

3. Use the font manager in your components:

```typescript
import { useFont } from 'next-font-manager'

export function FontSelector() {
  const { currentFont, setFont, fonts } = useFont()

  return (
    <select
      value={currentFont}
      onChange={(e) => setFont(e.target.value)}
    >
      {Object.keys(fonts).map((fontName) => (
        <option key={fontName} value={fontName}>
          {fontName}
        </option>
      ))}
    </select>
  )
}
```

## API Reference

### `FontProvider`

The main provider component that manages font state.

```typescript
interface FontProviderProps {
  children: React.ReactNode;
  config: FontManagerConfig;
}
```

### `useFont` Hook

A hook that provides access to font management functions.

```typescript
interface FontContextType {
  currentFont: string;
  setFont: (font: string) => void;
  fonts: Record<string, FontConfig>;
  getFontClassName: () => string;
}

const { currentFont, setFont, fonts, getFontClassName } = useFont()
```

### Configuration Types

```typescript
type FontManagerConfig = {
  fonts: Record<string, FontDefinition>;
  defaultFont?: string;
}

type FontDefinition = {
  font: (...args: any[]) => Promise<NextFont> | NextFont;
  options: FontOptions;
}

type FontOptions = {
  subsets?: string[];
  weight?: string[] | number[];
  display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
  variable?: string;
}
```

## Advanced Usage

### Custom Font Loading

```typescript
import localFont from 'next/font/local'

const customFont = localFont({
  src: './path/to/font.woff2',
  variable: '--font-custom',
})

const fontConfig: FontManagerConfig = {
  fonts: {
    custom: {
      font: () => customFont,
      options: {
        variable: '--font-custom',
      },
    },
  },
}
```

### Font Loading Optimization

```typescript
const fontConfig: FontManagerConfig = {
  fonts: {
    inter: {
      font: Inter,
      options: {
        subsets: ['latin'],
        variable: '--font-inter',
        display: 'swap',
        preload: true,
        fallback: ['system-ui', 'arial'],
      },
    },
  },
}
```

### CSS Integration

```css
/* globals.css */
:root {
  --font-primary: var(--font-inter);
}

body {
  font-family: var(--font-primary);
}

/* Create utility classes */
.font-inter {
  font-family: var(--font-inter);
}

.font-roboto {
  font-family: var(--font-roboto);
}
```

## Examples

### Basic Font Switcher

```typescript
import { useFont } from 'next-font-manager'

export function FontSwitcher() {
  const { currentFont, setFont, fonts } = useFont()

  return (
    <div className="font-switcher">
      <label htmlFor="font-select">Select Font:</label>
      <select
        id="font-select"
        value={currentFont}
        onChange={(e) => setFont(e.target.value)}
      >
        {Object.keys(fonts).map((fontName) => (
          <option key={fontName} value={fontName}>
            {fontName}
          </option>
        ))}
      </select>

      <div className={`preview font-${currentFont}`}>
        <p>The quick brown fox jumps over the lazy dog</p>
      </div>
    </div>
  )
}
```

### Font Preview Component

```typescript
import { useFont } from 'next-font-manager'

export function FontPreview() {
  const { currentFont } = useFont()

  return (
    <div className={`font-preview font-${currentFont}`}>
      <h3>Font Preview: {currentFont}</h3>
      <div className="preview-content">
        <p className="text-lg">
          The quick brown fox jumps over the lazy dog
        </p>
        <p className="text-sm">
          ABCDEFGHIJKLMNOPQRSTUVWXYZ
          abcdefghijklmnopqrstuvwxyz
          1234567890!@#$%^&*()
        </p>
      </div>
    </div>
  )
}
```

### Integration with UI Libraries

```typescript
import { useFont } from 'next-font-manager'
import { Select } from '@your-ui-library'

export function FontSelector() {
  const { currentFont, setFont, fonts } = useFont()

  return (
    <Select
      label="System Font"
      value={currentFont}
      onValueChange={setFont}
    >
      {Object.keys(fonts).map((fontName) => (
        <Select.Option key={fontName} value={fontName}>
          {fontName}
        </Select.Option>
      ))}
    </Select>
  )
}
```

## Best Practices

1. **Font Loading**
   - Use `display: 'swap'` for text visibility during font loading
   - Include appropriate fallback fonts
   - Preload critical fonts

2. **Performance**
   - Limit the number of font weights and styles
   - Use subset optimization for large font families
   - Implement proper font loading strategies

3. **Accessibility**
   - Ensure proper font fallbacks
   - Maintain readable font sizes
   - Consider user preferences

4. **Maintainability**
   - Keep font configurations in a separate file
   - Use consistent naming conventions
   - Document custom fonts and usage

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## License

MIT © [Your Name]
