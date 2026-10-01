import * as THREE from './three.module.js';
export function expandWorld({scene,box,beam,v,mats}) {
 const wood=new THREE.MeshStandardMaterial({color:'#594b39',roughness:.9}),black=new THREE.MeshStandardMaterial({color:'#242a29',roughness:.65}),carpet=new THREE.MeshStandardMaterial({color:'#414c48',roughness:1}),glass=new THREE.MeshStandardMaterial({color:'#789390',transparent:true,opacity:.22,roughness:.18,metalness:.35}),screen=new THREE.MeshStandardMaterial({color:'#253a3e',emissive:'#223b42',emissiveIntensity:.55});
 function sign(text,x,y,z,width=6,rotation=0){const c=document.createElement('canvas');c.width=1024;c.height=256;const ctx=c.getContext('2d');ctx.fillStyle='#24312f';ctx.fillRect(0,0,1024,256);ctx.fillStyle='#d9cfaa';ctx.font='600 82px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,512,128);const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;const o=new THREE.Mesh(new THREE.PlaneGeometry(width,width/4),new THREE.MeshBasicMaterial({map:tex,side:THREE.DoubleSide}));o.position.set(x,y,z);o.rotation.y=rotation;scene.add(o);return o}
 // Almost four times the original floor area. Lobbies face each other across the construction yard.
 box(0,-1,-52,120,2,44,mats.concrete);box(0,-1,52,120,2,44,mats.concrete);box(-49,-1,0,22,2,60,mats.concrete);box(49,-1,0,22,2,60,mats.concrete);
 box(0,-22,-52,120,40,44,mats.dark,false);box(0,-22,52,120,40,44,mats.dark,false);box(-49,-22,0,22,40,60,mats.dark,false);box(49,-22,0,22,40,60,mats.dark,false);
 for(let x=-58;x<=58;x+=6){box(x,.014,-52,.025,.02,43,mats.steel,false);box(x,.014,52,.025,.02,43,mats.steel,false)}for(let z=-72;z<=72;z+=6)box(0,.014,z,119,.02,.025,mats.steel,false);
 function desk(x,z,s){box(x,.95,z,3.2,.14,1.5,wood);for(const dx of [-1.35,1.35])box(x+dx,.45,z,.1,.9,1.1,black,false);box(x,1.53,z-.3*s,1,.65,.08,screen,false);box(x,1.14,z-.3*s,.08,.3,.08,black,false);box(x,1.07,z+.23*s,.75,.025,.25,black,false);box(x,.6,z+1.2*s,.75,.12,.8,black);box(x,1.04,z+1.52*s,.75,.85,.1,black,false);box(x,.3,z+1.2*s,.12,.6,.12,mats.steel,false)}
 for(const s of [-1,1]){
  const z=s*57,front=s*43,back=s*71;
  box(0,.03,z,96,.06,28,carpet,false);box(0,7.6,z,98,.4,30,mats.white);
  box(-48,3.8,z,.6,7.6,28,mats.blue);box(48,3.8,z,.6,7.6,28,mats.blue);
  // Three wide door openings on the courtyard facade.
  for(const x of [-43,-23,23,43])box(x,3.8,front,10,7.6,.6,mats.blue);box(0,6.5,front,96,2.2,.6,mats.white);
  box(0,1,back,96,2,.6,mats.blue);box(0,6.8,back,96,1.6,.6,mats.blue);
  for(let x=-44;x<=44;x+=8){box(x,4,back,.25,4.5,.7,mats.steel);box(x+3.9,4,back,7.6,4.5,.1,glass);box(x,3.8,z,.65,7.6,.65,mats.white)}
  // Reception, meeting areas, elevator bank and working desks.
  box(0,1.2,s*62,13,2.4,2.5,wood);box(0,2.46,s*62,13.3,.12,2.8,mats.white);sign(s<0?'NORTH • ATRIUM':'SOUTH • EXECUTIVE',0,5.2,s*69,14,s<0?0:Math.PI);
  for(const x of [-31,31]){box(x,2.5,s*66,10,5,.7,mats.dark);for(const dx of [-2.3,2.3]){box(x+dx,2.35,s*65.55,3.5,4.6,.12,mats.steel,false);box(x+dx,2.35,s*65.45,.035,4.6,.02,black,false)}sign('ELEVATORS',x,5.5,s*65.5,5,s<0?0:Math.PI)}
  for(const x of [-36,-26,-16,16,26,36]){desk(x,s*52,s);desk(x,s*59,s)}
  for(const x of [-10,10]){box(x,.6,s*48,4,1.2,1.5,black);box(x,1.3,s*48.7,4,1.4,.25,black);box(x,.6,s*45.7,2.5,.18,1.5,wood)}
  for(const x of [-43,43]){box(x,.65,s*46,1.2,1.3,1.2,wood);const leaves=new THREE.Mesh(new THREE.SphereGeometry(1,12,10),new THREE.MeshStandardMaterial({color:'#45553a'}));leaves.position.set(x,1.7,s*46);leaves.scale.set(.8,1.1,.8);scene.add(leaves)}
  for(const x of [-30,-10,10,30]){box(x,7.3,z,6,.08,.8,new THREE.MeshBasicMaterial({color:'#d9dec7'}),false)}scene.add(new THREE.HemisphereLight('#cac8b0','#32302b',.25));
  sign(s<0?'NORTH LOBBY':'SOUTH LOBBY',0,6,front-s*.35,10,s<0?0:Math.PI);
  // Climbable stairs on both exterior flanks, plus upper roof vents.
  for(const side of [-1,1]){const x=side*53;for(let i=0;i<24;i++)box(x,(i+1)*.16,s*(38+i*.95),5,(i+1)*.32,.95,mats.concrete);box(side*49,7.7,s*62,6,.3,10,mats.concrete);for(let j=0;j<4;j++)box(side*(22+j*6),8.25,s*58,4,1.1,5,mats.steel)}
  // Window mullions around the building below the rooftop.
  for(let y=-5;y>=-35;y-=5){box(0,y,s*74.02,119,.3,.08,mats.steel,false);for(let x=-56;x<58;x+=6)box(x,y-2,s*74.07,4,3.7,.08,screen,false)}
 }
 // Side service routes, ducts, storage bays, temporary cover and perimeter walkways.
 for(const side of [-1,1]){
  for(const [z,d] of [[-55,36],[0,24],[55,36]])box(side*58,1.1,z,.3,2.2,d,mats.concrete);for(let z=-68;z<70;z+=7)box(side*58,2.35,z,.18,.4,.18,mats.orange,false);
  for(const z of [-25,0,25]){box(side*45,1,z,8,2,6,mats.steel);box(side*45,2.1,z,8.3,.2,6.3,mats.dark);for(let j=-3;j<=3;j++)box(side*45+j,2.22,z,.14,.04,5.7,mats.steel,false)}
  box(side*64,-.8,0,8,.35,84,mats.steel);for(let z=-42;z<=42;z+=4){box(side*68,.2,z,.12,2,.12,mats.orange);beam(v(side*60,-.8,z),v(side*68,-3,z),.12,mats.steel)}box(side*68,1.2,0,.1,.1,84,mats.orange,false);
  for(const z of [-34,34]){box(side*39,1.35,z,14,2.7,3,mats.concrete);sign('SERVICE ACCESS',side*39,2,z+(z<0?1.51:-1.51),6,z<0?0:Math.PI)}
 }
 for(const [x,z] of [[-15,31],[15,32],[-16,-31],[13,-29],[32,18],[-33,-2],[35,-12]]){box(x,.65,z,3.5,1.3,3,wood);box(x,1.36,z,3.6,.12,3.1,mats.steel,false);for(const dx of [-1.4,1.4])box(x+dx,.65,z,.12,1.3,3.06,mats.dark,false)}
 // Construction frame, scaffold deck and a second crane at the northern end.
 for(const x of [-10,10])for(const z of [-35,-25]){box(x,4,z,.45,8,.45,mats.steel);beam(v(x,0,z),v(-x,8,z),.1,mats.steel)}box(0,8,-30,22,.25,12,mats.orange);for(let i=0;i<24;i++)box(-14,(i+1)*.165,-12-i*.94,4,(i+1)*.33,.94,mats.concrete);
 for(const x of [37,41])for(const z of [-37,-33])box(x,15,z,.32,30,.32,mats.orange,false);for(let y=0;y<30;y+=4){for(const z of [-37,-33]){beam(v(37,y,z),v(41,y+4,z),.12,mats.orange);beam(v(41,y,z),v(37,y+4,z),.12,mats.orange)}}box(16,30,-35,53,.3,2.5,mats.orange,false);for(let x=-10;x<41;x+=4){beam(v(x,30,-35),v(x+4,33,-35),.12,mats.orange);beam(v(x+4,33,-35),v(x+4,30,-35),.12,mats.orange);beam(v(x,33,-35),v(x+4,33,-35),.12,mats.orange)}beam(v(-7,30,-35),v(-7,10,-35),.035,mats.dark);
 // Plumbing, cable trays, roof lights and scattered construction equipment.
 for(let x=20;x<24;x+=.6)beam(v(x,.35,20),v(x,.35,36),.2,mats.steel);for(let z=-28;z<32;z+=6){box(28,.08,z,.9,.16,3,mats.dark,false);box(28,.18,z,.25,.05,3,mats.orange,false)}
 for(const x of [-57,57])for(const z of [-38,38]){box(x,2.5,z,.16,5,.16,mats.steel);box(x,5,z,1.4,.15,.7,mats.white,false)}
 sign('CONSTRUCTION • 38F',-37,3.4,29,10);sign('HELIPAD',9,1.4,27,4);
 const targets=[];function target(x,z,rotation){const group=new THREE.Group();group.position.set(x,0,z);group.rotation.y=rotation;scene.add(group);const c=document.createElement('canvas');c.width=c.height=256;const ctx=c.getContext('2d');ctx.fillStyle='#ccbb91';ctx.fillRect(0,0,256,256);for(let r=108;r>0;r-=22){ctx.beginPath();ctx.arc(128,128,r,0,Math.PI*2);ctx.fillStyle=(Math.floor(r/22)%2)?'#43473d':'#b68c52';ctx.fill()}ctx.fillStyle='#e6ad53';ctx.beginPath();ctx.arc(128,128,12,0,Math.PI*2);ctx.fill();const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;const board=new THREE.Mesh(new THREE.BoxGeometry(2.3,2.3,.15),new THREE.MeshStandardMaterial({map:tex,roughness:.8}));board.position.y=2.2;board.castShadow=true;group.add(board);const stem=new THREE.Mesh(new THREE.BoxGeometry(.16,2,.16),mats.steel);stem.position.y=1;group.add(stem);const base=new THREE.Mesh(new THREE.BoxGeometry(1.7,.2,1),mats.dark);base.position.y=.1;group.add(base);board.userData.target=targets.length;targets.push({board,group,hits:0,flashUntil:0})}
 target(0,9,0);target(0,-36,0);target(22,-33,0);target(-24,-34,0);target(-52,19,Math.PI/2);target(52,18,-Math.PI/2);target(0,67,Math.PI);target(0,-68,0);sign('PRACTICE TARGETS',0,4.5,-38,9);
 return {targets};
}
