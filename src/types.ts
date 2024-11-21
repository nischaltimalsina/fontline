import type { NextFont } from 'next/dist/compiled/@next/font'

export type FontConfig = NextFont & {
  variable: string;
}

export type FontOptions = {
  subsets?: string[];
  weight?: string[] | number[];
  display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
  variable?: string;
}

export type FontDefinition = {
  font: (...args: any[]) => Promise<NextFont> | NextFont;
  options: FontOptions;
}

export type FontContextType = {
  currentFont: string;
  setFont: (font: string) => void;
  fonts: Record<string, FontConfig>;
  getFontClassName: () => string;
}

export type LoadedFont = {
  font: FontConfig;
  options: FontOptions;
}

export type FontManagerConfig = {
  fonts: Record<string, LoadedFont>;
  defaultFont?: string;
}
