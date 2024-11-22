import { NextFont } from 'next/dist/compiled/@next/font';
import * as React from 'react';

type FontConfig = NextFont & {
    variable: string;
};
type FontOptions = {
    subsets?: string[];
    weight?: string[] | number[];
    display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
    variable?: string;
};
type FontDefinition = {
    font: (...args: any[]) => Promise<NextFont> | NextFont;
    options: FontOptions;
};
type FontContextType = {
    currentFont: string;
    setFont: (font: string) => void;
    fonts: Record<string, FontConfig>;
    getFontClassName: () => string;
};
type LoadedFont = {
    font: FontConfig;
    options: FontOptions;
};
type FontManagerConfig = {
    fonts: Record<string, LoadedFont>;
    defaultFont?: string;
};

interface FontProviderProps {
    children: React.ReactNode;
    config: FontManagerConfig;
}
declare function FontProvider({ children, config }: FontProviderProps): React.JSX.Element;
declare const useFont: () => {
    currentFont: string;
    setFont: (font: string) => void;
    fonts: Record<string, LoadedFont>;
    getFontClassName: () => string;
};

declare const generateCssVariables: (fonts: Record<string, FontConfig>) => Record<string, string>;
declare const createFontManager: (config: FontManagerConfig) => {
    config: FontManagerConfig;
    getDefaultFont: () => string;
    getFontList: () => string[];
};

export { type FontConfig, type FontContextType, type FontDefinition, type FontManagerConfig, type FontOptions, FontProvider, type FontProviderProps, type LoadedFont, createFontManager, generateCssVariables, useFont };
