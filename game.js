const canvas=document.getElementById("game"),ctx=canvas.getContext("2d");
const W=canvas.width,H=canvas.height,keys={};
const weaponData={
 fist:{name:"주먹",atk:0,interval:.5,range:55,skill:null},
 club:{name:"나무 몽둥이",atk:1,interval:.7,range:70,skill:null},
 sword:{name:"검",atk:20,interval:1,range:80,skill:"난도질"},
 greatsword:{name:"대검",atk:60,interval:5,range:115,skill:"회전"},
 dagger:{name:"단검",atk:10,interval:.6,range:60,skill:"던지기"},
 spear:{name:"창",atk:40,interval:3,range:125,skill:"돌진"},
 bow:{name:"활",atk:15,interval:1.5,range:300,skill:"난사"},
 shield:{name:"방패",atk:1,interval:1,range:65,skill:"가시"}
};
const monsters={
 rabbit:{name:"토끼",hp:10,atk:0,def:0,spd:.7,exp:1,gold:1},
 zombie:{name:"좀비",hp:100,atk:10,def:10,spd:.9,exp:10,gold:5},
 goblin:{name:"고블린",hp:100,atk:10,def:10,spd:1,exp:20,gold:5},
 wolf:{name:"늑대",hp:150,atk:15,def:5,spd:1.2,exp:50,gold:5},
 slime:{name:"폭발 슬라임",hp:70,atk:150,def:0,spd:1.3,exp:100,gold:5},
 thief:{name:"도적",hp:100,atk:30,def:15,spd:2,exp:125,gold:50},
 golem:{name:"골렘",hp:300,atk:200,def:20,spd:.5,exp:200,gold:10}
};
const areas=[
 {id:"village",name:"마을",monster:null},
 {id:"rabbit",name:"토끼 사냥터",monster:"rabbit"},
 {id:"zombie",name:"좀비 사냥터",monster:"zombie"},
 {id:"goblin",name:"고블린 사냥터",monster:"goblin"},
 {id:"wolf",name:"늑대 사냥터",monster:"wolf"},
 {id:"slime",name:"폭발 슬라임 사냥터",monster:"slime"},
 {id:"thief",name:"도적 사냥터",monster:"thief"},
 {id:"golem",name:"골렘 사냥터",monster:"golem"}
];
const p={x:W/2,y:H/2,r:16,speed:225,hp:100,maxHp:100,mp:100,maxMp:100,level:1,exp:0,nextExp:100,gold:0,stats:{atk:0,def:0,hp:0,int:0,agi:0,luk:0},points:6,weapon:"fist",lastAttack:0,area:"village"};
let mobs=[],paused=false,modalOpen=false,last=performance.now(),interactCooldown=0,message="",messageUntil=0;

function statAtk(){return p.stats.atk*5}
function statDef(){return p.stats.def}
function moveSpeed(){return 225*(1+p.stats.agi*.01)}
function weapon(){return weaponData[p.weapon]}
function say(t){message=t;messageUntil=performance.now()+2200}
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
function save(){
 localStorage.setItem("rpg-save",JSON.stringify({p,mobs:[],version:1}));
 say("저장했습니다.");
}
function load(){
 const s=localStorage.getItem("rpg-save"); if(!s)return false;
 try{const d=JSON.parse(s);Object.assign(p,d.p);say("저장 데이터를 불러왔습니다.");return true}catch(e){return false}
}
function reset(){localStorage.removeItem("rpg-save");location.reload()}
function spawnMobs(){
 mobs=[];
 const type=areas.find(a=>a.id===p.area)?.monster;if(!type)return;
 const count=p.area==="goblin"?8:p.area==="wolf"?5:6;
 for(let i=0;i<count;i++){
  const m=monsters[type],ang=Math.random()*Math.PI*2,dist=180+Math.random()*150;
  mobs.push({type,x:W/2+Math.cos(ang)*dist,y:H/2+Math.sin(ang)*dist,hp:m.hp,maxHp:m.hp,hit:0,attack:0,dead:false});
 }
}
function enterArea(id){
 p.area=id;p.x=W/2;p.y=H/2;spawnMobs();
 if(id!=="village"){const a=areas.find(x=>x.id===id);say(a.name+"에 도착했습니다.");}
}
function gainExp(v){
 p.exp+=v;
 while(p.level<50&&p.exp>=p.nextExp){
  p.exp-=p.nextExp;p.level++;p.points+=6;
  const mult=p.level<20?1.5:p.level<30?1.25:1.15;
  p.nextExp=Math.floor(p.nextExp*mult);
  p.maxHp=100+p.stats.hp*5;p.maxMp=100+p.stats.int*5;p.hp=p.maxHp;p.mp=p.maxMp;
  say("레벨 업! Lv."+p.level);
 }
}
function damagePlayer(v){
 const reduction=clamp(statDef()/100,0,.6);
 const dmg=Math.max(1,Math.floor(v*(1-reduction)));
 p.hp-=dmg;if(p.hp<=0)die();
}
function die(){
 p.level=Math.max(1,p.level);p.exp=0;p.gold=Math.floor(p.gold*.9);
 p.hp=p.maxHp;p.mp=p.maxMp;enterArea("village");
 openPanel("사망",'<p>레벨은 유지되고 EXP는 0이 되었습니다.<br>골드가 10% 감소했습니다.</p><button id="deathReturn">마을로 돌아가기</button><button id="deathQuit">게임 종료</button>');
 document.getElementById("deathReturn").onclick=closePanel;
 document.getElementById("deathQuit").onclick=()=>{location.reload()};
}
function playerAttack(){
 const now=performance.now()/1000;if(now-p.lastAttack<weapon().interval)return;
 p.lastAttack=now;
 const w=weapon(),dir={x:0,y:-1};
 let hits=0;
 for(const m of mobs){
  if(m.dead)continue;
  const dx=m.x-p.x,dy=m.y-p.y,dist=Math.hypot(dx,dy);
  if(dist<=w.range+18){
   const dmg=Math.max(1,statAtk()+w.atk-monsters[m.type].def);
   m.hp-=dmg;hits++;
   if(m.hp<=0){m.dead=true;gainExp(monsters[m.type].exp);p.gold+=monsters[m.type].gold}
  }
 }
 if(hits)say("공격 적중 "+hits+"회");
}
function updateMobs(dt){
 for(const m of mobs){
  if(m.dead)continue;
  const d=monsters[m.type],dx=p.x-m.x,dy=p.y-m.y,dist=Math.hypot(dx,dy);
  if(m.type==="rabbit"&&dist<250){m.x-=dx/dist*d.spd*40*dt;m.y-=dy/dist*d.spd*40*dt}
  else if(dist>42){m.x+=dx/dist*d.spd*38*dt;m.y+=dy/dist*d.spd*38*dt}
  m.x=clamp(m.x,25,W-25);m.y=clamp(m.y,25,H-25);
  m.attack-=dt;
  if(dist<45&&m.attack<=0){m.attack=1.5;damagePlayer(d.atk)}
 }
}
function update(dt){
 if(paused||modalOpen)return;
 let dx=0,dy=0;if(keys.ArrowLeft)dx--;if(keys.ArrowRight)dx++;if(keys.ArrowUp)dy--;if(keys.ArrowDown)dy++;
 if(dx||dy){const l=Math.hypot(dx,dy);p.x+=dx/l*moveSpeed()*dt;p.y+=dy/l*moveSpeed()*dt}
 p.x=clamp(p.x,20,W-20);p.y=clamp(p.y,20,H-20);
 p.hp=Math.min(p.maxHp,p.hp+dt*.1);p.mp=Math.min(p.maxMp,p.mp+dt);
 if(keys[" "])playerAttack();
 updateMobs(dt);
 mobs=mobs.filter(m=>!m.dead);
 interactCooldown-=dt;
}
function draw(){
 ctx.clearRect(0,0,W,H);
 ctx.fillStyle=p.area==="village"?"#4b6b43":"#4b493f";ctx.fillRect(0,0,W,H);
 ctx.strokeStyle="rgba(255,255,255,.08)";for(let x=0;x<W;x+=48){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke()}for(let y=0;y<H;y+=48){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}
 if(p.area==="village"){
  ctx.fillStyle="#6b5b45";ctx.fillRect(W/2-100,H/2-60,200,120);
  ctx.fillStyle="#d8b45a";ctx.fillRect(W/2-45,H/2-30,90,60);
  ctx.fillStyle="#fff";ctx.font="18px sans-serif";ctx.textAlign="center";ctx.fillText("마을",W/2,H/2-85);
  ctx.font="14px sans-serif";ctx.fillText("오른쪽으로 이동하면 사냥터 선택",W/2,H/2+100);
 }else{
  ctx.fillStyle="rgba(255,255,255,.25)";ctx.font="18px sans-serif";ctx.textAlign="center";ctx.fillText(areas.find(a=>a.id===p.area).name,W/2,30);
 }
 for(const m of mobs){
  const d=monsters[m.type];ctx.fillStyle=m.type==="rabbit"?"#eee":m.type==="zombie"?"#71866a":m.type==="goblin"?"#67a85f":m.type==="wolf"?"#888":"#b87333";
  ctx.beginPath();ctx.arc(m.x,m.y,18,0,Math.PI*2);ctx.fill();
  ctx.fillStyle="#111";ctx.fillRect(m.x-20,m.y-30,40,5);ctx.fillStyle="#e44";ctx.fillRect(m.x-20,m.y-30,40*(m.hp/m.maxHp),5);
 }
 ctx.fillStyle="#4ca6ff";ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
 ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(p.x,p.y-5,3,0,Math.PI*2);ctx.fill();
 if(messageUntil>performance.now()){ctx.fillStyle="#fff";ctx.font="20px sans-serif";ctx.textAlign="center";ctx.fillText(message,W/2,H-45)}
 updateHud();
}
function updateHud(){
 document.getElementById("level").textContent="Lv."+p.level;
 document.getElementById("exp").textContent="EXP "+Math.floor(p.exp)+"/"+p.nextExp;
 document.getElementById("gold").textContent="G "+p.gold;
 document.getElementById("weapon").textContent=weapon().name;
 document.getElementById("hpbar").style.width=(p.hp/p.maxHp*100)+"%";document.getElementById("mpbar").style.width=(p.mp/p.maxMp*100)+"%";
 document.getElementById("hptext").textContent="HP "+Math.floor(p.hp)+"/"+p.maxHp;document.getElementById("mptext").textContent="MP "+Math.floor(p.mp)+"/"+p.maxMp;
}
function openPanel(title,body){
 const modal=document.getElementById("modal");modal.className="";modal.innerHTML='<div class="panel"><h2>'+title+'</h2>'+body+"</div>";modalOpen=true;
}
function closePanel(){document.getElementById("modal").className="hidden";document.getElementById("modal").innerHTML="";modalOpen=false;paused=false}
function statusPanel(){
 let rows=Object.entries(p.stats).map(([k,v])=>'<div class="stat"><span>'+k.toUpperCase()+"</span><b>"+v+'</b></div>').join("");
 openPanel("상태",'<p>Lv.'+p.level+" · EXP "+Math.floor(p.exp)+"/"+p.nextExp+" · 골드 "+p.gold+"</p><div class="grid">"+rows+'</div><p>남은 스탯 포인트: <b>'+p.points+'</b></p><button id="plusAtk">ATK +1</button><button id="plusDef">DEF +1</button><button id="plusHp">HP +1</button><button id="plusInt">INT +1</button><button id="plusAgi">AGI +1</button><button id="plusLuk">LUK +1</button><button id="close">닫기</button>');
 const add=(s)=>{if(p.points>0&&p.stats[s]<100){p.points--;p.stats[s]++;p.maxHp=100+p.stats.hp*5;p.maxMp=100+p.stats.int*5;p.hp=Math.min(p.hp,p.maxHp);p.mp=Math.min(p.mp,p.maxMp);statusPanel()}};
 ["atk","def","hp","int","agi","luk"].forEach(s=>document.getElementById("plus"+s[0].toUpperCase()+s.slice(1)).onclick=()=>add(s));
 document.getElementById("close").onclick=closePanel;
}
function menuPanel(){
 openPanel("메뉴",'<button id="resume">계속하기</button><button id="save">저장</button><button id="status">상태창</button><button id="reset">새 게임</button>');
 document.getElementById("resume").onclick=closePanel;document.getElementById("save").onclick=()=>{save()};document.getElementById("status").onclick=statusPanel;document.getElementById("reset").onclick=()=>{if(confirm("저장 데이터를 삭제하고 새 게임을 시작할까요?"))reset()};
}
function interact(){
 if(p.area==="village"){openPanel("사냥터 선택",areas.slice(1).map(a=>'<button data-area="'+a.id+'">'+a.name+"</button>").join("")+'<button id="close">닫기</button>');
  document.querySelectorAll("[data-area]").forEach(b=>b.onclick=()=>{enterArea(b.dataset.area);closePanel()});document.getElementById("close").onclick=closePanel;
 }else if(Math.abs(p.x-W/2)<130&&Math.abs(p.y-H/2)<90){enterArea("village")}
}
window.addEventListener("keydown",e=>{keys[e.key]=true;if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(e.key))e.preventDefault();if(e.key==="f"&&!e.repeat)interact();if(e.key==="e"&&!e.repeat&&!modalOpen)statusPanel();if(e.key==="Escape"&&!e.repeat){if(modalOpen)closePanel();else menuPanel()}});
window.addEventListener("keyup",e=>keys[e.key]=false);
load();spawnMobs();
function loop(now){const dt=Math.min(.05,(now-last)/1000);last=now;update(dt);draw();requestAnimationFrame(loop)}requestAnimationFrame(loop);
