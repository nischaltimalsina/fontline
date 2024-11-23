"use client";import*as t from"react";var F=()=>`
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
`;var p=t.createContext(void 0),S=(e,n)=>{if(typeof window=="undefined")return n;try{let o=localStorage.getItem(e);return o!=null?o:n}catch(o){return n}},h={setFont:()=>{},fonts:[],font:"",resolvedFont:""},b=()=>{var e;return(e=t.useContext(p))!=null?e:h},x=({forcedFont:e,disableTransitionOnChange:n=!1,storageKey:o="font",fonts:s,defaultFont:a,values:c,children:l,nonce:d})=>{let[i,g]=t.useState(()=>S(o,a)),u=t.useCallback(r=>{if(!r||!s[r])return;let m=n?E(d):null,f=document.documentElement;Object.keys(s).forEach(y=>{let C=(c==null?void 0:c[y])||s[y].className;f.classList.remove(C)});let P=(c==null?void 0:c[r])||s[r].className;f.classList.add(P),f.style.setProperty("--font-primary",s[r].style.fontFamily),m==null||m()},[s,c,d,n]);t.useEffect(()=>{if(i)try{localStorage.setItem(o,i)}catch(r){}},[i,o]),t.useEffect(()=>{let r=m=>{if(m.key!==o)return;let f=m.newValue||a;g(f)};return window.addEventListener("storage",r),()=>window.removeEventListener("storage",r)},[o,a]),t.useEffect(()=>{u(e!=null?e:i)},[e,i,u]);let N=t.useMemo(()=>({font:i,setFont:g,forcedFont:e,resolvedFont:e!=null?e:i,fonts:Object.keys(s)}),[i,e,s]);return t.createElement(p.Provider,{value:N},t.createElement(R,{storageKey:o,defaultFont:a,forcedFont:e,fonts:s,values:c,nonce:d}),l)},R=t.memo(({storageKey:e,defaultFont:n,forcedFont:o,fonts:s,values:a,nonce:c})=>{let l=JSON.stringify({storageKey:e,defaultFont:n,forcedFont:o,fonts:s,values:a});return t.createElement("script",{nonce:c,dangerouslySetInnerHTML:{__html:`(${F()})(${l})`}})}),E=e=>{let n=document.createElement("style");return e&&n.setAttribute("nonce",e),n.appendChild(document.createTextNode("*,*::before,*::after{transition:none!important}")),document.head.appendChild(n),()=>{window.getComputedStyle(document.body),setTimeout(()=>{document.head.removeChild(n)},1)}},L=e=>t.useContext(p)?t.createElement(t.Fragment,null,e.children):t.createElement(x,{...e});export{L as FontProvider,b as useFont};
