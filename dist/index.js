"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  FontProvider: () => FontProvider,
  Inter: () => import_google.Inter,
  JetBrains_Mono: () => import_google.JetBrains_Mono,
  Lora: () => import_google.Lora,
  Poppins: () => import_google.Poppins,
  Roboto: () => import_google.Roboto,
  createFontManager: () => createFontManager,
  generateCssVariables: () => generateCssVariables,
  useFont: () => useFont
});
module.exports = __toCommonJS(src_exports);

// src/context.tsx
var import_react = __toESM(require("react"));
var FontContext = (0, import_react.createContext)(void 0);
function FontProvider({ children, config }) {
  const [currentFont, setCurrentFont] = (0, import_react.useState)(
    config.defaultFont || Object.keys(config.fonts)[0]
  );
  (0, import_react.useEffect)(() => {
    const savedFont = localStorage.getItem("font");
    if (savedFont && savedFont in config.fonts) {
      setCurrentFont(savedFont);
    }
  }, [config.fonts]);
  (0, import_react.useEffect)(() => {
    document.documentElement.style.setProperty(
      "--font-primary",
      config.fonts[currentFont].font.style.fontFamily
    );
    localStorage.setItem("font", currentFont);
  }, [currentFont, config.fonts]);
  const getFontClassName = () => {
    return Object.values(config.fonts).map((fontData) => fontData.font.className).join(" ");
  };
  return /* @__PURE__ */ import_react.default.createElement(FontContext.Provider, { value: {
    currentFont,
    setFont: setCurrentFont,
    fonts: config.fonts,
    getFontClassName
  } }, children);
}
var useFont = () => {
  const context = (0, import_react.useContext)(FontContext);
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
var import_google = require("next/font/google");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FontProvider,
  Inter,
  JetBrains_Mono,
  Lora,
  Poppins,
  Roboto,
  createFontManager,
  generateCssVariables,
  useFont
});
//# sourceMappingURL=index.js.map