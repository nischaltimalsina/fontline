import * as React from 'react';

type FontConfig = {
    className: string;
    style: {
        fontFamily: string;
    };
};
interface FontValueObject {
    [fontName: string]: string;
}
interface FontValues {
    [key: string]: string;
}
interface UseFontProps {
    fonts: string[];
    forcedFont?: string;
    setFont: React.Dispatch<React.SetStateAction<string>>;
    font: string;
    resolvedFont: string;
}
interface FontProviderProps extends React.PropsWithChildren {
    fonts: Record<string, FontConfig>;
    forcedFont?: string;
    defaultFont: string;
    storageKey?: string;
    disableTransitionOnChange?: boolean;
    values?: FontValues;
    nonce?: string;
}

declare const useFont: () => UseFontProps;
declare const FontProvider: (props: FontProviderProps) => React.JSX.Element;

declare const script: (storageKey: string, defaultFont: string, forcedFont: string | undefined, fonts: Record<string, FontConfig>, value: FontValueObject | undefined) => void;
declare const getFontScript: () => string;

export { type FontConfig, FontProvider, type FontProviderProps, type FontValueObject, type FontValues, type UseFontProps, getFontScript, script, useFont };
