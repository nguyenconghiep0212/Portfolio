import{u as j}from"./index.9eb91c79.js";import{f as F}from"./solarSystem.67b2def9.js";import{d as A,r as C,b as $,j as o,g as e,t as l,u as c,P as u,Q as p,h as _,f as b,o as i,v as T,i as z,c as R,e as q,w as k,R as S,S as V,T as G,V as P}from"./vendor.5a26001b.js";import{_ as H}from"./index.17ae18ab.js";const w={name:"Nguy\u1EC5n C\xF4ng Hi\u1EC7p",title:"Junior Web Developer",description:"I'm engaged in innovating, designing and building a quality online experiences",contacts:[{label:"Facebook",url:"https://www.facebook.com/profile.php?id=100007686062232",url_img:"https://res.cloudinary.com/dc7jd2eeu/image/upload/v1715451695/Contacts/z7j1fiidklhzccbafg2s.png"},{label:"Linkedin",url:"https://www.linkedin.com/in/hiep-nguyen-cong-b3b32927a/",url_img:"https://res.cloudinary.com/dc7jd2eeu/image/upload/v1715451661/Contacts/aifzjukgq8e8fggm7mtd.png"},{label:"Github",url:"https://github.com/nguyenconghiep0212",url_img:"https://res.cloudinary.com/dc7jd2eeu/image/upload/v1715451684/Contacts/q2o6n63qddacauukw8zh.png"},{label:"Email",url:"mailto:nguyenconghiep0212@gmail.com?subject=Greeting&body=Let keep contact !!!",url_img:"https://res.cloudinary.com/dc7jd2eeu/image/upload/v1715451670/Contacts/egxecjvy5cwwu28fkanz.png"}]},J=[{name:"ICOMM Media & Tech., Jsc",dateOfService:["05/2022","Present"],url:"https://icomm.vn",roles:"Junior Front-End Developer",isStartUp:!1,projects:[{name:"Qu\u1EA3n l\xFD \u0111\xF4 th\u1ECB th\xF4ng minh",key:"smartcity",skills:["ts","vue","pinia","axios","tailwind","antd"],priority:2},{name:"Hu\u1EA5n luy\u1EC7n trinh s\xE1t \u1EA3o",key:"avatar",skills:["ts","vue","pinia","axios","bootstrap","el"],priority:2},{name:"Tr\u1EE3 l\xFD \u1EA3o",key:"chatbox",skills:["js","vue","axios","bootstrap","el"],priority:2},{name:"Qu\u1EA3n l\xFD thi\u1EBFt b\u1ECB gi\xE1m s\xE1t",key:"hawkice",skills:["js","vue","axios","bootstrap","el"],priority:2},{name:"Gi\xE1m s\xE1t \u0111\u1ED1i t\u01B0\u1EE3ng",key:"imint",skills:["js","vue","axios","bootstrap","el"],priority:2},{name:"Automation Extension",key:"ext",skills:["js","jq"],priority:1}]},{name:"On The Desk",url:"https://onthedesk.vn",dateOfService:["09/2023","02/2024"],roles:"Fullstack",isStartUp:!0,projects:[{name:"On The Desk",key:"onthedesk",skills:["js","react","recoil","tailwind","axios","antd"],description:"Th\u1EBB th\xF4ng minh h\xE0ng \u0111\u1EA7u Vi\u1EC7t Nam k\u1EBFt n\u1ED1i v\xE0 t\u1ED1i \u01B0u cho t\u1EEBng c\xE1 nh\xE2n v\xE0 doanh nghi\u1EC7p m\u1ED9t c\xE1ch nhanh ch\xF3ng d\u1EC5 d\xE0ng.",priority:2}]}],B=A("homePageStore",()=>{const h=C([]),n=C([]);return{skills:h,libraries:n}}),Q={class:"flex flex-col items-start justify-between h-full"},U={class:"space-y-1 text-left"},W={class:"text-4xl font-bold tracking-tight font-inter"},K={class:"text-xl font-medium tracking-tight font-inter"},X={class:"py-2 text-lg text-left opacity-60"},Y={class:"mt-6 text-left"},Z=e("div",{class:"flex items-center space-x-2"},[e("span",{class:"text-lg font-bold tracking-widest uppercase opacity-60"}," Language & frameworks "),e("span",{class:"h-[1px] bg-white opacity-60 w-32"})],-1),ee={key:0,class:"mt-3 space-y-2"},te={class:"flex flex-wrap"},se=["src"],ie={class:"text-xs font-bold tracking-widest opacity-60"},oe={class:"flex flex-wrap"},ae=["src"],re={class:"text-xs font-bold tracking-widest opacity-60"},ne={class:"flex flex-wrap"},le=["src"],ce={class:"text-xs font-bold tracking-widest opacity-60"},de={key:1},ue={class:"mt-6 text-left"},pe=e("div",{class:"flex items-center space-x-2"},[e("span",{class:"text-lg font-bold tracking-widest uppercase opacity-60"}," Libraries "),e("span",{class:"h-[1px] bg-white opacity-60 w-32"})],-1),_e={key:0,class:"mt-3 space-y-2"},he={class:"flex flex-wrap"},fe=["src"],me={class:"flex text-xs font-bold tracking-widest opacity-60"},xe={class:"flex flex-wrap"},ge=["src"],ye={class:"text-xs font-bold tracking-widest opacity-60"},ve={class:"flex flex-wrap"},be=["src"],ke={class:"text-xs font-bold tracking-widest opacity-60"},we={key:1},Ee={class:"flex mb-4 space-x-5"},je=["href"],Ce=["src"],$e=$({__name:"aboutMe",setup(h){const n=B();j(),y(),x();async function y(){const d=await F({filter:[{key:"folder",value:"Skills"}]});d&&(d.data.forEach(r=>{["js","ts","vue"].includes(r.key)?r.priority=2:["nodejs","three"].includes(r.key)?r.priority=0:r.priority=1}),n.skills=d.data)}async function x(){const d=await F({filter:[{key:"folder",value:"Libraries"}]});d&&(d.data.forEach(r=>{["pinia","tailwind","antd","el"].includes(r.key)?r.priority=2:["bootstrap","recoil"].includes(r.key)?r.priority=0:r.priority=1}),n.libraries=d.data)}return(v,d)=>{const r=b("n-skeleton");return i(),o("div",Q,[e("div",null,[e("div",U,[e("div",W,l(c(w).name),1),e("div",K,l(c(w).title),1),e("div",X,l(c(w).description),1)]),e("div",Y,[Z,c(n).skills.length?(i(),o("div",ee,[e("div",te,[(i(!0),o(u,null,p(c(n).skills.filter(t=>t.priority===2),(t,s)=>(i(),o("div",{key:s,class:"flex flex-col items-center justify-center w-20 mr-2 bg-white border-2 border-solid rounded-lg bg-opacity-10 aspect-square border-cyan-400"},[e("img",{src:t.url,class:"w-5 h-5 mb-1"},null,8,se),e("div",ie,l(t.customName),1)]))),128))]),e("div",oe,[(i(!0),o(u,null,p(c(n).skills.filter(t=>t.priority===1),(t,s)=>(i(),o("div",{key:s,class:"mr-2 w-20 flex flex-col items-center justify-center bg-white rounded-lg bg-opacity-10 aspect-square border-2 border-solid border-[silver]"},[e("img",{src:t.url,class:"w-5 h-5 mb-1"},null,8,ae),e("div",re,l(t.customName),1)]))),128))]),e("div",ne,[(i(!0),o(u,null,p(c(n).skills.filter(t=>t.priority===0),(t,s)=>(i(),o("div",{key:s,class:"flex flex-col items-center justify-center w-20 mr-2 bg-white border-2 border-solid rounded-lg bg-opacity-10 aspect-square border-slate-700"},[e("img",{src:t.url,class:"w-5 h-5 mb-1"},null,8,le),e("div",ce,l(t.customName),1)]))),128))])])):(i(),o("div",de,[_(r,{repeat:4,class:"w-3/4"}),_(r,{text:"",class:"w-2/3"})]))]),e("div",ue,[pe,c(n).libraries.length?(i(),o("div",_e,[e("div",he,[(i(!0),o(u,null,p(c(n).libraries.filter(t=>t.priority===2),(t,s)=>(i(),o("div",{key:s,class:"flex flex-col items-center justify-center w-20 mr-2 bg-white border-2 border-solid rounded-lg bg-opacity-10 aspect-square border-cyan-400"},[e("img",{src:t.url,class:"w-5 h-5 mb-1"},null,8,fe),e("div",me,l(t.customName),1)]))),128))]),e("div",xe,[(i(!0),o(u,null,p(c(n).libraries.filter(t=>t.priority===1),(t,s)=>(i(),o("div",{key:s,class:"mr-2 w-20 flex flex-col items-center justify-center bg-white rounded-lg bg-opacity-10 aspect-square border-2 border-solid border-[silver]"},[e("img",{src:t.url,class:"w-5 h-5 mb-1"},null,8,ge),e("div",ye,l(t.customName),1)]))),128))]),e("div",ve,[(i(!0),o(u,null,p(c(n).libraries.filter(t=>t.priority===0),(t,s)=>(i(),o("div",{key:s,class:"flex flex-col items-center justify-center w-20 mr-2 bg-white border-2 border-solid rounded-lg bg-opacity-10 aspect-square border-slate-700"},[e("img",{src:t.url,class:"w-5 h-5 mb-1"},null,8,be),e("div",ke,l(t.customName),1)]))),128))])])):(i(),o("div",we,[_(r,{repeat:4,class:"w-3/4"}),_(r,{text:"",class:"w-2/3"})]))])]),e("div",Ee,[(i(!0),o(u,null,p(c(w).contacts,(t,s)=>(i(),o("div",{key:s,class:""},[e("a",{href:t.url,target:"_blank"},[e("img",{src:t.url_img,class:T(`
              ${t.label==="Github"?"invert":""}
               w-9 h-9 mb-1 grayscale opacity-40 hover:opacity-100 transition-all duration-150`)},null,10,Ce)],8,je)]))),128))])])}}});const L=h=>(G("data-v-69d4797e"),h=h(),P(),h),Se={class:"flex flex-col"},Ne=L(()=>e("div",{class:"flex items-center justify-end space-x-2"},[e("span",{class:"h-[1px] bg-white opacity-60 w-1/2"}),e("span",{class:"text-2xl font-bold tracking-widest uppercase opacity-60"}," Experiences ")],-1)),Fe={class:"flex flex-col mt-10 space-y-4"},qe={class:"grid items-center w-full grid-cols-4 gap-4 mb-4"},Be={class:"col-span-1 text-xs tracking-wide text-right uppercase opacity-60"},Le=["onMouseover","onMouseout"],De=["href"],Me={class:"text-lg font-bold tracking-widest truncate font-inter"},Ie=L(()=>e("div",{class:"w-[inherit]"},null,-1)),Oe={class:"flex flex-col items-end col-span-3 py-2"},Ae={class:"flex items-center space-x-2"},Te={class:"font-semibold tracking-widest truncate font-inter opacity-70"},ze={class:"flex flex-col items-end mr-6"},Re={class:"opacity-50 text-end"},Ve={class:"space-x-1 space-y-1 text-end"},Ge=$({__name:"experiences",setup(h){const n=B();j();const y=z(),x=C([]);R(()=>y.options.routes.map(s=>{if(!s.meta.hidden)return{title:s.meta?s.meta.title:s.name,to:s.name}}).filter(s=>s));function v(s){x.value.push(s)}function d(s){const a=x.value[s].children;a[a.length-1].classList.add("-rotate-45"),a[a.length-1].classList.add("opacity-80"),a[a.length-1].classList.add("pl-1")}function r(s){const a=x.value[s].children;a[a.length-1].classList.remove("-rotate-45"),a[a.length-1].classList.remove("opacity-80"),a[a.length-1].classList.remove("pl-1")}function t(s){let a=n.skills.find(f=>f.key===s);return a||(a=n.libraries.find(f=>f.key===s)),a?a.customName:"N/A"}return(s,a)=>{const f=b("n-tag"),N=b("Icon"),D=b("n-tooltip");return i(),o("div",null,[e("div",Se,[Ne,e("div",Fe,[(i(!0),o(u,null,p(c(J),(m,E)=>(i(),o("div",{key:E,class:"flex flex-col items-end justify-center w-full p-2 transition-all duration-150 ease-in-out rounded"},[e("div",qe,[e("div",Be,l(m.dateOfService[0])+" - "+l(m.dateOfService[1]),1),e("div",{ref_for:!0,ref:v,class:"flex items-center justify-end col-span-3 space-x-2 text-right cursor-pointer hover:text-sky-400",onMouseover:g=>d(E),onMouseout:g=>r(E)},[m.isStartUp?(i(),q(f,{key:0,bordered:!1,round:"",type:"info",class:"mr-2"},{default:k(()=>[S(" startup ")]),_:1})):V("",!0),e("a",{href:m.url,target:"_blank"},[e("span",Me,l(m.name),1)],8,De),_(N,{class:"transition-all duration-150 opacity-40",icon:"solar:map-arrow-right-bold-duotone"})],40,Le)]),(i(!0),o(u,null,p(m.projects,(g,M)=>(i(),o("div",{key:M,class:"grid w-full grid-cols-4 gap-4 mb-2"},[Ie,e("div",Oe,[e("div",Ae,[e("span",Te,l(g.name),1),_(D,{trigger:"hover"},{trigger:k(()=>[_(N,{class:"transition-all duration-150 cursor-pointer opacity-70 hover:text-sky-400",icon:"solar:question-square-bold-duotone"})]),default:k(()=>[S(" What've i done ? ")]),_:1})]),e("div",ze,[e("div",Re,l(g.description),1),e("div",Ve,[(i(!0),o(u,null,p(g.skills,(I,O)=>(i(),q(f,{key:O,round:"",bordered:!1,type:"info"},{default:k(()=>[S(l(t(I)),1)]),_:2},1024))),128))])])])]))),128))]))),128))])])])}}});var Pe=H(Ge,[["__scopeId","data-v-69d4797e"]]);const He={class:"h-[-webkit-fill-available] mx-[15vw] space-y-2 mb-3 mt-[5vh]"},Je={class:"grid h-full grid-cols-2 gap-1 mt-30"},Xe=$({__name:"index",setup(h){return j(),(n,y)=>(i(),o("div",He,[e("div",Je,[_($e),_(Pe)])]))}});export{Xe as default};
