import{b as f,m as w,aa as h,ab as b,a8 as g,ac as x,g as P}from"./three.module.a436e408.js";function z({numStars:u=500}={}){function l(){const t=Math.random()*25+25,a=Math.random(),o=Math.random(),e=2*Math.PI*a,r=Math.acos(2*o-1),m=t*Math.sin(r)*Math.cos(e),M=t*Math.sin(r)*Math.sin(e),d=t*Math.cos(r);return{pos:new P(m,M,d),hue:.6,minDist:t}}const c=[],i=[];let s;for(let t=0;t<u;t+=1){const a=l(),{pos:o,hue:e}=a;s=new f().setHSL(e,.2,Math.random()),c.push(o.x,o.y,o.z),i.push(s.r,s.g,s.b)}const n=new w;n.setAttribute("position",new h(c,3)),n.setAttribute("color",new h(i,3));const p=new b({size:.2,vertexColors:!0,map:new g().load("src/utils/helper/circle.png")});return new x(n,p)}export{z as g};
