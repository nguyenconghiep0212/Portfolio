import{d,B as m,c as p,b as s,m as r,t as a,u as _,F as f,C as v,a as o}from"./vendor.5c4ccf16.js";import{u as g}from"./useI18n.dae69798.js";import"./index.3e91fe77.js";const h={class:"h-full mx-8 my-3"},x={class:"grid grid-cols-2 gap-2"},k=["onClick"],F=d({__name:"index",setup(y){const{t:c}=g(),t=m();console.log(t.options.routes);const i=p(()=>t.options.routes.map(e=>({title:e.meta?e.meta.title:e.name,to:e.name})));function l(e){window.open(t.resolve({name:e}).href,"_self")}return(e,B)=>(o(),s("div",h,[r("div",null,a(_(c)("view.test")),1),r("div",x,[(o(!0),s(f,null,v(i.value,(n,u)=>(o(),s("div",{key:u,class:"px-4 py-2 rounded-sm bg-slate-400",onClick:C=>l(n.to)},a(n.title),9,k))),128))])]))}});export{F as default};
