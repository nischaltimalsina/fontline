// src/context.tsx
import * as React from "react";
var FontContext = React.createContext(void 0);
var getInitialFont = (storageKey, defaultFont) => {
  if (typeof window === "undefined") return defaultFont;
  try {
    const stored = localStorage.getItem(storageKey);
    return stored != null ? stored : defaultFont;
  } catch (e) {
    return defaultFont;
  }
};
var defaultContext = {
  setFont: () => {
  },
  fonts: [],
  font: "",
  resolvedFont: ""
};
var useFont = () => {
  var _a;
  return (_a = React.useContext(FontContext)) != null ? _a : defaultContext;
};
var Font = ({
  forcedFont,
  disableTransitionOnChange = false,
  storageKey = "font",
  fonts,
  defaultFont,
  values,
  children,
  nonce
}) => {
  const [font, setFont] = React.useState(() => getInitialFont(storageKey, defaultFont));
  const applyFont = React.useCallback((fontName) => {
    if (!fontName || !fonts[fontName]) return;
    const enable = disableTransitionOnChange ? disableAnimation(nonce) : null;
    const d = document.documentElement;
    Object.keys(fonts).forEach((name) => {
      const className2 = (values == null ? void 0 : values[name]) || fonts[name].className;
      d.classList.remove(className2);
    });
    const className = (values == null ? void 0 : values[fontName]) || fonts[fontName].className;
    d.classList.add(className);
    d.style.setProperty("--font-primary", fonts[fontName].style.fontFamily);
    enable == null ? void 0 : enable();
  }, [fonts, values, nonce, disableTransitionOnChange]);
  React.useEffect(() => {
    if (font) {
      try {
        localStorage.setItem(storageKey, font);
      } catch (e) {
      }
    }
  }, [font, storageKey]);
  React.useEffect(() => {
    const handleStorage = (e) => {
      if (e.key !== storageKey) return;
      const newFont = e.newValue || defaultFont;
      setFont(newFont);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [storageKey, defaultFont]);
  React.useEffect(() => {
    applyFont(forcedFont != null ? forcedFont : font);
  }, [forcedFont, font, applyFont]);
  const providerValue = React.useMemo(() => ({
    font,
    setFont,
    forcedFont,
    resolvedFont: forcedFont != null ? forcedFont : font,
    fonts: Object.keys(fonts)
  }), [font, forcedFont, fonts]);
  return /* @__PURE__ */ React.createElement(FontContext.Provider, { value: providerValue }, /* @__PURE__ */ React.createElement(
    FontScript,
    {
      storageKey,
      defaultFont,
      forcedFont,
      fonts,
      values,
      nonce
    }
  ), children);
};
var FontScript = React.memo(({
  storageKey,
  defaultFont,
  forcedFont,
  fonts,
  values,
  nonce
}) => {
  const scriptArgs = JSON.stringify({
    storageKey,
    defaultFont,
    forcedFont,
    fonts,
    values
  });
  return /* @__PURE__ */ React.createElement(
    "script",
    {
      nonce,
      dangerouslySetInnerHTML: {
        __html: `(${getFontScript()})(${scriptArgs})`
      }
    }
  );
});
var getFontScript = () => `
function(config) {
  const el = document.documentElement;

  function updateDOM(fontName) {
    if (!fontName || !config.fonts[fontName]) return;

    // Remove previous font classes
    Object.keys(config.fonts).forEach(name => {
      const className = config.values?.[name] || config.fonts[name].className;
      el.classList.remove(className);
    });

    // Add new font class
    const className = config.values?.[fontName] || config.fonts[fontName].className;
    el.classList.add(className);

    // Update CSS custom property
    el.style.setProperty('--font-primary', config.fonts[fontName].style.fontFamily);
  }

  if (config.forcedFont) {
    updateDOM(config.forcedFont);
  } else {
    try {
      const fontName = localStorage.getItem(config.storageKey) || config.defaultFont;
      updateDOM(fontName);
    } catch (e) {
      updateDOM(config.defaultFont);
    }
  }
}
`;
var disableAnimation = (nonce) => {
  const css = document.createElement("style");
  if (nonce) css.setAttribute("nonce", nonce);
  css.appendChild(
    document.createTextNode(
      `*,*::before,*::after{transition:none!important}`
    )
  );
  document.head.appendChild(css);
  return () => {
    (() => window.getComputedStyle(document.body))();
    setTimeout(() => {
      document.head.removeChild(css);
    }, 1);
  };
};
var FontProvider = (props) => {
  const context = React.useContext(FontContext);
  if (context) return /* @__PURE__ */ React.createElement(React.Fragment, null, props.children);
  return /* @__PURE__ */ React.createElement(Font, { ...props });
};
export {
  FontProvider,
  useFont
};
//# sourceMappingURL=index.mjs.map