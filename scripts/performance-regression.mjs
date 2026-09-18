import assert from 'node:assert/strict';
import fs from 'node:fs';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
// Headless regression checks: use real Three.js and the actual class methods,
// omitting browser-only imports whose constructors are not exercised.
const repo=fileURLToPath(new URL('../', import.meta.url)).replace(/\/$/, '');
const baseline='357bd1e55ff259771d3233b2e39741179ccfd1f9';
const url=p=>pathToFileURL(p).href;
const threeURL=url(`${repo}/js/lib/three.module.js`);
const THREE=await import(threeURL);
const after=repo+'/';
const before='baseline:';
const {SpatialGrid}=await import(url(after+'js/performance/SpatialGrid.js'));
const {UpdateCadence}=await import(url(after+'js/performance/UpdateCadence.js'));
async function load(base,file) {
 let s=(base===before
   ? execFileSync('git',['show',`${baseline}:${file}`],{cwd:repo,encoding:'utf8'})
   : fs.readFileSync(base+file,'utf8')).replace(/^import .*;.*$/gm,'');
 s=`import * as THREE from '${threeURL}';\nimport {SpatialGrid} from '${url(after+'js/performance/SpatialGrid.js')}';\nimport {UpdateCadence} from '${url(after+'js/performance/UpdateCadence.js')}';\n`+s;
 return import('data:text/javascript;base64,'+Buffer.from(s).toString('base64'));
}
const {GameEngine:New}=await load(after,'desktop/gameEngine.js');
const {GameEngine:Old}=await load(before,'desktop/gameEngine.js');
const {iVFXSystem:VFX}=await load(after,'desktop/iVFXSystem.js');
const {Scene2D:New2D}=await load(after,'mobile2D/Scene2D.js');
const {Scene2D:Old2D}=await load(before,'mobile2D/Scene2D.js');
let seed=17; const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
const grid=new SpatialGrid(8), boxes=[];
for(let i=0;i<1000;i++) {
 const min={x:random()*200-100,y:random()*200-100,z:random()*200-100};
 const max={x:min.x+random()*20,y:min.y+random()*20,z:min.z+random()*20};
 boxes.push({min,max});grid.insert(i,min,max);
}
for(let i=0;i<300;i++) {
 const min={x:random()*200-100,y:random()*200-100,z:random()*200-100};
 const max={x:min.x+20,y:min.y+20,z:min.z+20};
 const found=new Set(grid.query(min,max));
 boxes.forEach((b,j)=>{if(['x','y','z'].every(k=>b.min[k]<=max[k]&&b.max[k]>=min[k]))assert(found.has(j));});
}
grid.insert('huge',{x:-10000,y:-10000,z:-10000},{x:10000,y:10000,z:10000});assert(grid.query({x:0,y:0,z:0}).includes('huge'));
const cadence=new UpdateCadence(15);let ticks=0;for(let i=0;i<600;i++)if(cadence.due(i*1000/60))ticks++;assert(ticks>=149&&ticks<=151);assert(cadence.due(100000));assert(!cadence.due(100000));
// Same particle resources return after expiry, growth and day/night reset work.
const scene=new THREE.Scene(), vfx=new VFX(scene), pos=new THREE.Vector3(1,2,3);
const resources=new Set(vfx._freeSparks.map(p=>p.mesh));
for(let cycle=0;cycle<100;cycle++) {
 for(let i=0;i<64;i++)vfx.spawnSpark(pos,0x123456);
 assert(vfx.sparkParticles.every(p=>resources.has(p.mesh)));
 vfx.update(1,pos,null,false);
 assert.equal(vfx.sparkParticles.length,0);
}
vfx.spawnTrail(pos,new THREE.Vector3(0,1,0));assert.equal(vfx.trailParticles[0].mesh.position.y,1.2);
vfx.update(1,pos,null,false);vfx.setNightMode(true);vfx.spawnTrail(pos);assert.equal(vfx.trailParticles[0].mesh.material.color.getHex(),0x00f2ff);
vfx.emitSparks(pos,200);assert.equal(vfx.sparkParticles.length,200);vfx.update(1,pos,null,false);vfx.dispose();assert.equal(scene.children.length,0);
// Water's former every-frame work vs no writes; actual old/new method bodies.
let uploads=0, draws=0;
const water={bakeCtx:{clearRect(){},drawImage(){draws++;}},tilemapTexture:{source:{update(){uploads++;}}},waterTiles:Array.from({length:1000},(_,i)=>({col:i%128,row:i>>7})),tileCache:{1:{}}};
for(let i=0;i<60;i++)Old2D.prototype._refreshWaterTiles.call(water);
assert.equal(uploads,60);assert.equal(draws,60000);const waterBefore={uploads,draws};uploads=draws=0;
for(let i=0;i<60;i++)New2D.prototype._refreshWaterTiles.call(water);
assert.equal(uploads,0);assert.equal(draws,0);
// DOM identity, removal on pickup/case change, hide/show at range.
let creations=0;const children=[];
globalThis.document={getElementById(){return container;},createElement(){creations++;return {style:{},remove(){children.splice(children.indexOf(this),1);}};}};
const container={appendChild(e){children.push(e);},set innerHTML(v){children.length=0;}};
const engine=Object.create(New.prototype);Object.assign(engine,{pPos:new THREE.Vector3(0,500,0),camHeading:new THREE.Vector3(0,0,-1),npcMeshes:[],evidenceMeshes:[],_minimapMarkers:new Map(),_minimapPosition:new THREE.Vector3()});
for(let i=0;i<20;i++){const m=new THREE.Object3D();m.position.set(i,500,0);engine.npcMeshes.push(m);}
for(let i=0;i<60;i++)engine.updateMinimap();assert.equal(creations,20);const first=children[0];engine.npcMeshes[0].position.x=200;engine.updateMinimap();assert.equal(first.style.display,'none');engine.npcMeshes[0].position.x=0;engine.updateMinimap();assert.equal(first.style.display,'');engine.npcMeshes.pop();engine.updateMinimap();assert.equal(children.length,19);engine.npcMeshes=[];engine.updateMinimap();assert.equal(children.length,0);
// Exercise original vs new movement/collision/camera on identical seeded scenes.
globalThis.window={dispatchEvent(){},innerWidth:1280,innerHeight:800};globalThis.CustomEvent=class {};
const world=[];const geo=new THREE.BoxGeometry(3,6,3),mat=new THREE.MeshBasicMaterial();
for(let i=0;i<1000;i++){
 const m=new THREE.Mesh(geo,mat);m.position.set(random()*300-150,501,random()*300-150);m.userData.collisionRadius=2;world.push(m);
}
const make=(Class)=>{
 const e=Object.create(Class.prototype);
 Object.assign(e,{worldObjects:world,npcMeshes:[],pPos:new THREE.Vector3(0,501.1,0),pVelocity:new THREE.Vector3(),camHeading:new THREE.Vector3(0,0,-1),isGrounded:true,surfaceRadius:500,controls:{keys:{}},camera:new THREE.PerspectiveCamera(60,1,0.1,2000),playerMesh:new THREE.Object3D(),groundSphere:new THREE.Mesh(new THREE.SphereGeometry(500,32,16),mat),_collisionGrid:new SpatialGrid(16),_cameraGrid:new SpatialGrid(32),_spatialDirty:true,_nearbyColliders:[],_cameraCandidates:[],_cameraFallback:[],_raycastObjects:[],_cameraHits:[],_cameraRaycaster:new THREE.Raycaster(),_queryMin:new THREE.Vector3(),_queryMax:new THREE.Vector3(),_collisionPush:new THREE.Vector3()});
 e.camera.position.set(0,515,25);e.camera.lookAt(e.pPos);e.groundSphere.updateMatrixWorld(true);world.forEach(m=>m.updateMatrixWorld(true));return e;
};
const old=make(Old), updated=make(New);let candidates=0;
for(let frame=0;frame<600;frame++){
 const key=frame<200?'KeyW':frame<400?'KeyD':'KeyS';old.controls.keys=updated.controls.keys={[key]:true};
 old.movePlayer();updated.movePlayer();
 assert(old.pPos.distanceTo(updated.pPos)<1e-9,`player mismatch ${frame}`);
 assert(old.camera.position.distanceTo(updated.camera.position)<1e-9,`camera mismatch ${frame}`);
 candidates+=updated._raycastObjects.length;
}
const bench=e=>{const start=performance.now();for(let i=0;i<3000;i++)e.movePlayer();return performance.now()-start;};
const oldMs=bench(make(Old)),newMs=bench(make(New));
console.log(JSON.stringify({tests:'PASS',gridQueries:300,collisionCameraFrames:600,cadenceTicksOver10s:ticks,pooledSparkEmissions:6400,waterBefore,waterAfter:{uploads,draws},minimapCreationsFor60Updates:20,cameraMeanCandidates:candidates/600,cameraOriginalCandidates:1001,synthetic3000FramesMs:{before:oldMs,after:newMs}},null,2));
// Nested/scaled static groups and rotating collectible fallback: no camera hit is dropped.
const extra=make(New);extra.worldObjects=[];
for(let i=0;i<100;i++){
 const g=new THREE.Group(),m=new THREE.Mesh(geo,mat);m.position.set(2,3,4);m.rotation.z=0.4;g.add(m);g.position.set(random()*80-40,random()*80-40,random()*80-40);g.rotation.y=random()*6;g.scale.set(2,1,3);extra.worldObjects.push(g);
}
const dynamic=new THREE.Mesh(geo,mat);dynamic.userData.type='collectable';extra.worldObjects.push(dynamic);extra._ensureSpatialQueries();
for(let i=0;i<500;i++){
 dynamic.rotation.x+=0.1;dynamic.updateMatrixWorld(true);
 const start=new THREE.Vector3(random()*100-50,random()*100-50,random()*100-50),end=new THREE.Vector3(random()*100-50,random()*100-50,random()*100-50);
 const ray=new THREE.Raycaster(start,end.clone().sub(start).normalize(),0.1,start.distanceTo(end));
 const all=ray.intersectObjects(extra.worldObjects,true);
 const subset=extra._cameraGrid.query(start.clone().min(end),start.clone().max(end)).filter(e=>ray.ray.intersectsBox(e.box)).map(e=>e.object).concat(extra._cameraFallback);
 const filtered=ray.intersectObjects(subset,true);
 assert.equal(filtered.length,all.length);if(all.length)assert(Math.abs(filtered[0].distance-all[0].distance)<1e-9);
}
// Optimized leader lookup is equivalent for movement, stopped NPCs and invisible player.
function aiFixture(){return {player:{x:0,y:0,invisibleUntil:0},enemies:Array.from({length:50},(_,i)=>({type:'SOLDIER',groupId:i%5,x:i%10,y:Math.floor(i/10),renderX:0,renderY:0,speed:1,pattern:'patrol',stoppedUntil:0,squarePhase:0})),_isWalkable:(x,y)=>Math.abs(x)<20&&Math.abs(y)<20};}
const aiOld=aiFixture(),aiNew=aiFixture();const oldRandom=Math.random,oldNow=Date.now;
for(let frame=0;frame<1000;frame++){
 Date.now=()=>1000+frame*16;
 if(frame===300)aiOld.player.invisibleUntil=aiNew.player.invisibleUntil=10000;
 seed=frame+1;Math.random=random;Old2D.prototype.updateEnemies.call(aiOld);
 seed=frame+1;New2D.prototype.updateEnemies.call(aiNew);
 assert.deepEqual(aiNew.enemies,aiOld.enemies);
}
Math.random=oldRandom;Date.now=oldNow;
const {Scene3D}=await load(after,'mobile3D/Scene3D.js');
const overlayEngine=Object.create(Scene3D.prototype),cam=new THREE.PerspectiveCamera(60,1,0.1,100);cam.position.set(0,5,10);cam.lookAt(0,0,0);cam.updateMatrixWorld(true);
const mesh=new THREE.Object3D(),data={id:'npc',hasDialogue:true},overlay={style:{}},nameEl={style:{}},btn={style:{}};
Object.assign(overlayEngine,{npcMeshes:[{mesh,data}],_npcOverlays:new Map([['npc',{mesh,data,overlay,nameEl,btn}]]),_overlayPosition:new THREE.Vector3(),_talkButton:{},container:{getBoundingClientRect:()=>({width:390,height:844})},sceneMgr:{camera:cam},gridData:{npcs:[]}});
overlayEngine.updateNPCPrompt(new THREE.Vector3(),new THREE.Vector3(0,1,0));assert.equal(btn.style.display,'block');assert.equal(overlayEngine._talkButton.disabled,false);
overlayEngine.updateNPCPrompt(new THREE.Vector3(100,0,0),new THREE.Vector3(0,1,0));assert.equal(btn.style.display,'none');assert.equal(overlayEngine._talkButton.disabled,true);
console.log('Additional PASS: 500 transformed/dynamic ray comparisons; 1,000 AI frames; cached overlay near/far updates without DOM queries.');
