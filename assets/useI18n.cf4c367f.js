var $=Object.defineProperty,j=Object.defineProperties;var I=Object.getOwnPropertyDescriptors;var o=Object.getOwnPropertySymbols;var s=Object.prototype.hasOwnProperty,d=Object.prototype.propertyIsEnumerable;var l=(t,r,n)=>r in t?$(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n,b=(t,r)=>{for(var n in r||(r={}))s.call(r,n)&&l(t,n,r[n]);if(o)for(var n of o(r))d.call(r,n)&&l(t,n,r[n]);return t},c=(t,r)=>j(t,I(r));var e=(t,r)=>{var n={};for(var u in t)s.call(t,u)&&r.indexOf(u)<0&&(n[u]=t[u]);if(t!=null&&o)for(var u of o(t))r.indexOf(u)<0&&d.call(t,u)&&(n[u]=t[u]);return n};import{i as g}from"./index.42b7503d.js";function h(t,r){return!t||r.startsWith(t)?r:`${t}.${r}`}function m(t){const r={t:i=>h(t,i)};if(!g)return r;const f=g.global,{t:n}=f,u=e(f,["t"]),x=(i,...F)=>i?!i.includes(".")&&!t?i:n(h(t,i),...F):"";return c(b({},u),{t:x})}export{m as u};
