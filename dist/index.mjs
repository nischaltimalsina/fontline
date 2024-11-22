// src/context.tsx
import * as React from "react";
var FontContext = React.createContext(void 0);
function FontProvider({ children, config }) {
  const [currentFont, setCurrentFont] = React.useState(
    config.defaultFont || Object.keys(config.fonts)[0]
  );
  React.useEffect(() => {
    const savedFont = localStorage.getItem("font");
    if (savedFont && savedFont in config.fonts) {
      setCurrentFont(savedFont);
    }
  }, [config.fonts]);
  React.useEffect(() => {
    document.documentElement.style.setProperty(
      "--font-primary",
      config.fonts[currentFont].font.style.fontFamily
    );
    localStorage.setItem("font", currentFont);
  }, [currentFont, config.fonts]);
  const getFontClassName = () => {
    return Object.values(config.fonts).map((fontData) => fontData.font.className).join(" ");
  };
  return /* @__PURE__ */ React.createElement(FontContext.Provider, { value: {
    currentFont,
    setFont: setCurrentFont,
    fonts: config.fonts,
    getFontClassName
  } }, children);
}
var useFont = () => {
  const context = React.useContext(FontContext);
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
export {
  FontProvider,
  createFontManager,
  generateCssVariables,
  useFont
};
//# sourceMappingURL=index.mjs.map