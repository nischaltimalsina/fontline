import { NextFont } from 'next/dist/compiled/@next/font';
import React from 'react';
export { Inter, JetBrains_Mono, Lora, Poppins, Roboto } from 'next/font/google';

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
type FontManagerConfig = {
    fonts: Record<string, FontDefinition>;
    defaultFont?: string;
};
type FontContextType = {
    currentFont: string;
    setFont: (font: string) => void;
    fonts: Record<string, FontConfig>;
    getFontClassName: () => string;
};

interface FontProviderProps {
    children: React.ReactNode;
    config: FontManagerConfig;
}
declare function FontProvider({ children, config }: FontProviderProps): React.JSX.Element;
declare const useFont: () => FontContextType;

declare const generateCssVariables: (fonts: Record<string, FontConfig>) => Record<string, string>;
declare const createFontManager: (config: FontManagerConfig) => {
    config: FontManagerConfig;
    getDefaultFont: () => string;
    getFontList: () => string[];
};

export { type FontConfig, type FontContextType, type FontDefinition, type FontManagerConfig, type FontOptions, FontProvider, type FontProviderProps, createFontManager, generateCssVariables, useFont };
