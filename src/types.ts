import * as React from 'react'

export type FontConfig = {
  className: string;
  style: {
    fontFamily: string;
  };
}

export interface FontValueObject {
  [fontName: string]: string;
}

export interface FontValues {
  [key: string]: string;
}

export interface UseFontProps {
  fonts: string[];
  forcedFont?: string;
  setFont: React.Dispatch<React.SetStateAction<string>>;
  font: string;
  resolvedFont: string;
}

export interface FontProviderProps extends React.PropsWithChildren {
  fonts: Record<string, FontConfig>;
  forcedFont?: string;
  defaultFont: string;
  storageKey?: string;
  disableTransitionOnChange?: boolean;
  values?: FontValues;
  nonce?: string;
}
