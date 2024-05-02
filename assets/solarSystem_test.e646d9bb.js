import{ad as K,W as U,S as X,g as L,q as Q,a as Y,b as Z,aa as ee,F as O,a6 as D,J as te,a9 as ne,ae as se,m as ie,af as oe,ag as ae,ah as le,C as re}from"./three.module.9a027db3.js";import{C as de,a as k}from"./CSS2DRenderer.66d2c30a.js";import{O as ce}from"./OrbitControls.199d1b02.js";import{g as M}from"./index.66a6dea6.js";import{_ as ue}from"./index.90cbeb08.js";import{d as me,r as pe,o as he,b as I,l as C,K as be,L as fe,a as N,e as ve}from"./vendor.47562e81.js";const we={class:"flex flex-col h-full"},_e={class:"pallete"},ge=["onMouseover","onMouseout"],ye=me({__name:"solarSystem_test",setup(xe){let i,f,v,w,d;const a={mercury:{size:1,orbitRadius:50,speed:100,color:"#C2D0FF",distance:"43.291 million mi",mesh:null},venus:{size:2,orbitRadius:60,speed:73,color:"#FF9900",distance:"66.822 million mi",mesh:null},earth:{size:1.5,orbitRadius:70,speed:62,color:"#00A3FF",distance:"94.044 million mi",mesh:null},mars:{size:3,orbitRadius:80,speed:50,color:"#FF5C00",distance:"131.56 million mi",mesh:null},jupiter:{size:8,orbitRadius:90,speed:27,color:"#E59700",distance:"460.96 million mi",mesh:null},saturn:{size:6,orbitRadius:120,speed:20,color:"#FFCF72",distance:"915.96 million mi",mesh:null},uranus:{size:4,orbitRadius:160,speed:14,color:"#61D9FF",distance:"1.8297 billion mi",mesh:null},neptune:{size:4,orbitRadius:200,speed:11,color:"#0047FF",distance:"2.78 billion mi",mesh:null}},c=new de,T=new re,r=new K,u=new U({antialias:!0}),l=new X,p=pe(null),_=new L,j=new L,g=new Q,A=["sun","mercury","venus","earth","mars","jupiter","saturn","uranus","neptune"];he(()=>{const{width:e,height:t}=p.value.getBoundingClientRect();v=e,w=t,i=new Y(45,v/w,1,1e3),f=new ce(i,u.domElement),console.log("on mounted"),$(),P()});function H(e){d=e,M.to(r.rotation,{duration:.3,x:Math.PI/2,ease:"none",paused:!1}),M.to(r.position,{duration:.3,z:200,ease:"none",paused:!1});const t=l.getObjectByName(e);t.children[0].visible=!0,d=t}function W(e){M.to(r.rotation,{duration:.3,x:.1,ease:"none",paused:!1}),M.to(r.position,{duration:.3,z:0,ease:"none",paused:!1});const t=l.getObjectByName(e);t.children[0].visible=!0,d=null}function E(e,t,o,s){g.makeEmpty();for(const R of o)g.expandByObject(R);g.getSize(_),g.getCenter(j);const h=Math.max(_.x,_.y,_.z)/(2*Math.atan(Math.PI*e.fov/360)),y=h/e.aspect,m=s*Math.max(h,y),S=t.target.clone().sub(e.position).normalize().multiplyScalar(m);t.maxDistance=m*10,t.target.copy(j),e.near=m/100,e.far=m*100,e.updateProjectionMatrix(),e.position.copy(t.target).sub(S),t.update()}function $(){u.setPixelRatio(window.devicePixelRatio),u.setSize(v,w),p.value.appendChild(u.domElement),c.setSize(v,w),c.domElement.style.position="absolute",c.domElement.style.top="0px",p.value.appendChild(c.domElement),l.background=new Z("#F6F1E5"),i.position.set(0,0,1),f.enabled=!1,l.add(new ee(10066329,1));const e=new O(new D(40,32,16),new te({color:"#FFE600",wireframe:!0}));e.name="sun";const t=document.createElement("div");t.className="label",t.innerHTML=`
					<div class="planet-title">SUN</div>
			`;const o=new k(t);o.position.copy(e.position),o.visible=!1,e.add(o),o.layers.set(0),e.add(new ne(14540253,1,400,.7)),Object.entries(a).forEach(s=>{const n=s[0],{size:h,orbitRadius:y,color:m,distance:S}=s[1];console.log(n,h,y);let R=new se().absarc(0,0,y,0,Math.PI*2).getPoints(90),B=new ie().setFromPoints(R);B.rotateX(Math.PI*.5);let q=new oe({color:"#000000",transparent:!0,opacity:.25}),x=new ae(B,q);l.add(x),r.add(x);let V=new D(h,16,16),J=new le({color:m,wireframe:!0}),z=new O(V,J);z.name=n,l.add(z),x.add(z),a[n].mesh=z,a[n].line=x;const F=document.createElement("div");F.className="label",F.innerHTML=`
					<div class="planet-title">${n}</div>
					<div class="planet-distance">${S}</div>
				`;const b=new k(F);b.position.copy(a[n].mesh.position),b.visible=!0,a[n].mesh.add(b),a[n].label=b,b.layers.set(0)}),r.add(e),l.add(r),r.rotation.x=.1,window.addEventListener("resize",()=>{const{widthRender:s,heightRender:n}=p.value.getBoundingClientRect();i.aspect=s/n,i.updateProjectionMatrix(),E(i,f,[a.neptune.line],.6),u.setSize(s,n),c.setSize(s,n)}),E(i,f,[a.neptune.line],.6)}function G(){u.render(l,i),c.render(l,i)}function P(){requestAnimationFrame(P);let e=T.getElapsedTime()/50;Object.entries(a).forEach(t=>{const{orbitRadius:o,mesh:s,speed:n}=t[1];s&&(s.position.set(Math.cos(e*n),0,-Math.sin(e*n)).multiplyScalar(o),s.rotation.y=e*n-Math.PI*.5,s.rotation.z=Math.PI*.5)}),d?(i.position.x=d.position.x,i.position.y=-d.position.z):(i.position.x=0,i.position.y=0),G()}return(e,t)=>(N(),I("div",we,[C("div",{ref_key:"el",ref:p,class:"flex-1 w-full"},null,512),C("div",_e,[(N(),I(be,null,fe(A,(o,s)=>C("div",{key:s,class:ve(o),onMouseover:n=>H(o),onMouseout:n=>W(o)},null,42,ge)),64))])]))}});var je=ue(ye,[["__scopeId","data-v-0bf096e9"]]);export{je as default};
