"use strict";"use client";var x=Object.create;var l=Object.defineProperty;var R=Object.getOwnPropertyDescriptor;var E=Object.getOwnPropertyNames;var w=Object.getPrototypeOf,O=Object.prototype.hasOwnProperty;var b=(t,e)=>{for(var o in e)l(t,o,{get:e[o],enumerable:!0})},N=(t,e,o,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let c of E(e))!O.call(t,c)&&c!==o&&l(t,c,{get:()=>e[c],enumerable:!(s=R(e,c))||s.enumerable});return t};var L=(t,e,o)=>(o=t!=null?x(w(t)):{},N(e||!t||!t.__esModule?l(o,"default",{value:t,enumerable:!0}):o,t)),M=t=>N(l({},"__esModule",{value:!0}),t);var A={};b(A,{FontProvider:()=>D,useFont:()=>k});module.exports=M(A);var n=L(require("react"));var P=()=>`
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
`;var g=n.createContext(void 0),V=(t,e)=>{if(typeof window=="undefined")return e;try{let o=localStorage.getItem(t);return o!=null?o:e}catch(o){return e}},j={setFont:()=>{},fonts:[],font:"",resolvedFont:""},k=()=>{var t;return(t=n.useContext(g))!=null?t:j},I=({forcedFont:t,disableTransitionOnChange:e=!1,storageKey:o="font",fonts:s,defaultFont:c,values:r,children:d,nonce:p})=>{let[a,u]=n.useState(()=>V(o,c)),y=n.useCallback(i=>{if(!i||!s[i])return;let m=e?v(p):null,f=document.documentElement;Object.keys(s).forEach(F=>{let h=(r==null?void 0:r[F])||s[F].className;f.classList.remove(h)});let S=(r==null?void 0:r[i])||s[i].className;f.classList.add(S),f.style.setProperty("--font-primary",s[i].style.fontFamily),m==null||m()},[s,r,p,e]);n.useEffect(()=>{if(a)try{localStorage.setItem(o,a)}catch(i){}},[a,o]),n.useEffect(()=>{let i=m=>{if(m.key!==o)return;let f=m.newValue||c;u(f)};return window.addEventListener("storage",i),()=>window.removeEventListener("storage",i)},[o,c]),n.useEffect(()=>{y(t!=null?t:a)},[t,a,y]);let C=n.useMemo(()=>({font:a,setFont:u,forcedFont:t,resolvedFont:t!=null?t:a,fonts:Object.keys(s)}),[a,t,s]);return n.createElement(g.Provider,{value:C},n.createElement(U,{storageKey:o,defaultFont:c,forcedFont:t,fonts:s,values:r,nonce:p}),d)},U=n.memo(({storageKey:t,defaultFont:e,forcedFont:o,fonts:s,values:c,nonce:r})=>{let d=JSON.stringify({storageKey:t,defaultFont:e,forcedFont:o,fonts:s,values:c});return n.createElement("script",{nonce:r,dangerouslySetInnerHTML:{__html:`(${P()})(${d})`}})}),v=t=>{let e=document.createElement("style");return t&&e.setAttribute("nonce",t),e.appendChild(document.createTextNode("*,*::before,*::after{transition:none!important}")),document.head.appendChild(e),()=>{window.getComputedStyle(document.body),setTimeout(()=>{document.head.removeChild(e)},1)}},D=t=>n.useContext(g)?n.createElement(n.Fragment,null,t.children):n.createElement(I,{...t});0&&(module.exports={FontProvider,useFont});
