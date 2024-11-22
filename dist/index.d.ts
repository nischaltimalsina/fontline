import * as React from 'react';

type FontConfig = {
    className: string;
    style: {
        fontFamily: string;
    };
};
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

export { type FontConfig, FontProvider, type FontProviderProps, type FontValues, type UseFontProps, useFont };
