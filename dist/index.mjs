// src/context.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
var FontContext = createContext(void 0);
function FontProvider({ children, config }) {
  const [currentFont, setCurrentFont] = useState(config.defaultFont || Object.keys(config.fonts)[0]);
  const [fonts, setFonts] = useState({});
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const loadFonts = async () => {
      const loadedFonts = {};
      for (const [name, definition] of Object.entries(config.fonts)) {
        const fontInstance = await definition.font(definition.options);
        loadedFonts[name] = fontInstance;
      }
      setFonts(loadedFonts);
      setMounted(true);
    };
    loadFonts();
  }, [config.fonts]);
  useEffect(() => {
    if (mounted) {
      const savedFont = localStorage.getItem("font");
      if (savedFont && savedFont in fonts) {
        setCurrentFont(savedFont);
      }
    }
  }, [mounted, fonts]);
  useEffect(() => {
    if (mounted && fonts[currentFont]) {
      document.documentElement.style.setProperty(
        "--font-primary",
        fonts[currentFont].style.fontFamily
      );
      localStorage.setItem("font", currentFont);
    }
  }, [currentFont, mounted, fonts]);
  const getFontClassName = () => {
    return Object.values(fonts).map((font) => font.className).join(" ");
  };
  return /* @__PURE__ */ React.createElement(
    FontContext.Provider,
    {
      value: {
        currentFont,
        setFont: setCurrentFont,
        fonts,
        getFontClassName
      }
    },
    children
  );
}
var useFont = () => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
};

// src/utils.ts
var generateCssVariables = (fonts) => {
  return Object.entries(fonts).reduce((acc, [name, font]) => {
    acc[`--font-${name}`] = font.style.fontFamily;
    return acc;
  }, {});
};
var createFontManager = (config) => {
  return {
    config,
    getDefaultFont: () => config.defaultFont || Object.keys(config.fonts)[0],
    getFontList: () => Object.keys(config.fonts)
  };
};

// src/index.ts
import { Inter, Roboto, Lora, Poppins, JetBrains_Mono } from "next/font/google";
export {
  FontProvider,
  Inter,
  JetBrains_Mono,
  Lora,
  Poppins,
  Roboto,
  createFontManager,
  generateCssVariables,
  useFont
};
//# sourceMappingURL=index.mjs.map