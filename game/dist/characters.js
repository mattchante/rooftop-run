import * as THREE from './three.module.js';
export const roster=[{id:'patrick',name:'Patrick Star',role:'The rooftop regular',color:'#f09ca7'},{id:'shepherd',name:'German Shepherd',role:'Four paws. Full tactical.',color:'#ba9965'},{id:'mario',name:'Mario',role:'A jump on the competition',color:'#e96255'},{id:'vader',name:'Darth Vader',role:'Dark side of the skyline',color:'#85959d'},{id:'spiderman',name:'Spider-Man',role:'Your rooftop neighborhood',color:'#b34443'}];
export function createCharacter(id){
 const group=new THREE.Group(),legs=[],arms=[];const materials={};function m(color,metalness=0){const key=color+metalness;return materials[key]??=new THREE.MeshStandardMaterial({color,roughness:metalness?.35:.7,metalness})}const sphere=new THREE.SphereGeometry(1,24,18);
 function mesh(geometry,color,x,y,z,sx=1,sy=1,sz=1,parent=group){const o=new THREE.Mesh(geometry,typeof color==='string'?m(color):color);o.position.set(x,y,z);o.scale.set(sx,sy,sz);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
 const ball=(color,x,y,z,sx,sy,sz,parent)=>mesh(sphere,color,x,y,z,sx,sy,sz,parent);const box=(color,x,y,z,w,h,d,parent)=>mesh(new THREE.BoxGeometry(w,h,d),color,x,y,z,1,1,1,parent);
 function leg(x,z,color,length=.72){const joint=new THREE.Group();joint.position.set(x,length+.14,z);group.add(joint);mesh(new THREE.CylinderGeometry(.19,.16,length,12),color,0,-length/2,0,1,1,1,joint);ball(id==='vader'?'#11191c':id==='mario'?'#63442c':id==='spiderman'?'#a92930':'#9b6240',0,-length+.1,.1,.22,.15,.3,joint);legs.push(joint);return joint}
 function arm(x,color){const pivot=new THREE.Group();pivot.position.set(x,1.95,0);group.add(pivot);mesh(new THREE.CylinderGeometry(.19,.15,.8,16),color,0,-.4,0,1,1,1,pivot);ball(id==='mario'?'#efeadd':color,0,-.8,0,.2,.2,.21,pivot);arms.push(pivot);return pivot}
 let height=2.8,mount={x:-.78,y:1.58,z:.32},tail;
 if(id==='patrick'){
  ball('#f09ca7',0,1.45,0,.8,1,.46);mesh(new THREE.ConeGeometry(.62,1.9,24),'#f09ca7',0,2.4,0,1,1,.75);
  for(const side of [-1,1]){const o=mesh(new THREE.ConeGeometry(.32,1.5,20),'#f09ca7',side*.98,1.65,0);o.rotation.z=-side*1.05;arms.push(o);const foot=ball('#f09ca7',side*.4,.38,.02,.35,.6,.35);legs.push(foot)}
  ball('#b2d462',0,.85,0,.77,.47,.47);for(const side of [-1,1])mesh(new THREE.CylinderGeometry(.35,.35,.4,20),'#b2d462',side*.4,.55,0,1,1,1.2);
  for(const [x,y] of [[-.45,.85],[.4,.95],[.12,.7]])for(let k=0;k<5;k++)ball('#9562ba',x+Math.cos(k*1.256)*.09,y+Math.sin(k*1.256)*.09,.445,.09,.07,.018);
  for(const side of [-1,1]){ball('#f8f3e7',side*.18,2.46,.36,.17,.24,.09);ball('#20272b',side*.18,2.46,.445,.065,.1,.025);box('#35332f',side*.18,2.75,.35,.25,.045,.04).rotation.z=-side*.12}
  const smile=mesh(new THREE.TorusGeometry(.22,.025,8,24,Math.PI),'#35332f',0,2.12,.47);smile.rotation.z=Math.PI;ball('#dc7e8a',0,1.3,.45,.035,.045,.016);
 }else if(id==='shepherd'){
  height=2.45;mount={x:-.45,y:1.5,z:-.55};ball('#b2905e',0,1,0,.49,.56,1);ball('#363831',0,1.37,-.14,.5,.25,.79);ball('#b99561',0,1.16,.66,.47,.63,.5);ball('#6c6045',0,1.61,.92,.4,.44,.42);ball('#be9b6c',0,1.42,1.25,.3,.2,.43);ball('#252b27',0,1.48,1.59,.2,.12,.1);
  for(const side of [-1,1]){mesh(new THREE.ConeGeometry(.21,.67,4),'#403d31',side*.27,2.08,.84,1,1,.72).rotation.z=-side*.15;mesh(new THREE.ConeGeometry(.13,.43,4),'#a48660',side*.27,2.06,.95,1,1,.2);ball('#151d1b',side*.29,1.71,1.18,.065,.075,.04);ball('#f4dc96',side*.29,1.72,1.215,.025,.027,.015)}
  for(const x of [-.32,.32])for(const z of [-.58,.58])leg(x,z,'#b08b58',.78);
  tail=new THREE.Group();tail.position.set(0,1,-.9);tail.rotation.x=.75;group.add(tail);mesh(new THREE.CylinderGeometry(.11,.18,.9,12),'#665741',0,-.43,-.12,1,1,1,tail);
  box('#303c36',0,1.55,-.1,.67,.19,1.28);for(const z of [-.5,.45])box('#384139',0,1.06,z,1.04,.17,.18);box('#c2aa62',0,1.38,.79,.24,.2,.1);
 }else{
  const red=id==='mario'?'#bd3027':'#a92930',dark='#171f25',blue=id==='mario'?'#284c80':'#243d60';
  leg(-.25,0,id==='vader'?dark:blue,.77);leg(.25,0,id==='vader'?dark:blue,.77);
  ball(id==='vader'?dark:red,0,1.5,0,.53,.62,.3);arm(-.6,id==='vader'?dark:red);arm(.6,id==='vader'?dark:red);
  if(id==='mario'){
   ball('#e2b386',0,2.32,0,.49,.48,.41);ball('#e7b284',0,2.26,.45,.2,.16,.18);for(const side of [-1,1]){ball('#efe7d6',side*.18,2.46,.34,.12,.15,.06);ball('#365774',side*.18,2.46,.39,.045,.075,.025);ball('#453023',side*.12,2.17,.4,.21,.065,.06);ball('#d9a477',side*.46,2.28,0,.11,.16,.11)}
   ball('#bd3027',0,2.64,-.025,.54,.24,.47);box('#d23a2d',0,2.55,.46,.7,.08,.45);ball('#ece4d2',0,2.74,.39,.15,.14,.025);box('#b32926',0,2.76,.425,.04,.14,.02);box('#b32926',-.06,2.75,.425,.035,.14,.02);box('#b32926',.06,2.75,.425,.035,.14,.02);ball(blue,0,1.21,.15,.48,.4,.28);for(const side of [-1,1]){box(blue,side*.26,1.73,.3,.15,.55,.06);ball('#d5b166',side*.26,1.61,.35,.045,.045,.025)}
  }else if(id==='vader'){
   ball(m('#182126',.55),0,2.3,0,.47,.52,.4);mesh(new THREE.ConeGeometry(.64,.55,24),m('#101a21',.5),0,2.14,-.04,1,1,.8);ball('#16232a',0,2.33,.32,.34,.27,.12);for(const side of [-1,1])box('#050b0e',side*.17,2.41,.43,.24,.095,.045).rotation.z=side*.15;
   mesh(new THREE.ConeGeometry(.17,.26,3),m('#526168',.65),0,2.18,.46,1,1,.4).rotation.z=Math.PI;for(const side of [-1,1])mesh(new THREE.CylinderGeometry(.04,.04,.13,8),m('#728085',.5),side*.21,2.11,.44).rotation.x=Math.PI/2;
   box('#080f14',0,1.57,.32,.47,.42,.05);for(const [x,color] of [[-.13,'#bc4838'],[0,'#4d8791'],[.13,'#d8dbce']])box(color,x,1.64,.36,.08,.08,.025);box(m('#47585e',.6),0,1.07,.27,.95,.12,.11);
   const cape=new THREE.Mesh(new THREE.CylinderGeometry(.5,.92,1.9,20,1,true,Math.PI*.5,Math.PI),m('#11181c'));cape.position.set(0,1.05,-.1);cape.castShadow=true;group.add(cape);
  }else{
   ball(red,0,2.3,0,.42,.48,.34);for(const side of [-1,1]){const eye=ball('#eceee4',side*.17,2.4,.3,.16,.18,.045);eye.rotation.z=side*.24;for(let i=0;i<4;i++)box('#2e2931',side*.2,2.06+i*.13,.315,.36,.012,.018)}
   for(const side of [-1,1]){ball(blue,side*.35,1.36,0,.16,.35,.31);box('#25272a',side*.16,1.6,.3,.025,.35,.025).rotation.z=side*.7}ball('#24272a',0,1.68,.325,.055,.12,.025);for(const side of [-1,1])for(let i=0;i<4;i++)box('#20252c',side*.15,1.58+i*.055,.335,.22,.02,.015).rotation.z=side*(i<2?-.5:.5);
  }
 }
 function animate(time,speed,aim,reduced,crouch,landing){const gait=speed>.1?Math.sin(time*(speed>7?15:11))*.32:0;legs.forEach((leg,i)=>leg.rotation.x=gait*(id==='shepherd'?(i===0||i===3?1:-1):(i%2?1:-1)));if(id==='patrick'){arms[0].rotation.z=.6+gait*.1;arms[1].rotation.z=-.55-gait*.1;arms[0].rotation.x=-.3}else if(id!=='shepherd'){arms[0].rotation.x=-1.15;arms[1].rotation.x=-.65;arms[0].rotation.z=.2;arms[1].rotation.z=-.25}if(tail)tail.rotation.z=reduced?0:Math.sin(time*5)*.2;group.position.y=reduced?0:Math.sin(time*(speed>7?30:22))*Math.min(speed*.003,.025);group.scale.y=1-crouch*.25-Math.min(landing*.08,.08)}
 return {group,height,mount,legs,arms,animate};
}
export function characterPortraits(){const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});renderer.setSize(180,180);renderer.setPixelRatio(1);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;const scene=new THREE.Scene();scene.add(new THREE.HemisphereLight('#ffffff','#53636b',3));const light=new THREE.DirectionalLight('#ffdfaf',3);light.position.set(-3,4,5);scene.add(light);const camera=new THREE.PerspectiveCamera(32,1,.1,30);for(const item of roster){const character=createCharacter(item.id);character.group.rotation.y=-.35;scene.add(character.group);camera.position.set(0,2.5,item.id==='shepherd'?7.5:6.4);camera.lookAt(0,item.id==='shepherd'?1.1:1.5,.1);renderer.render(scene,camera);const element=document.querySelector(`[data-character="${item.id}"] img`);element.src=renderer.domElement.toDataURL();scene.remove(character.group);character.group.traverse(o=>{if(o.isMesh){o.geometry.dispose();o.material.dispose()}})}renderer.dispose()}
