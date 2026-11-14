const C=document.getElementById("game"),X=C.getContext("2d"),W=1152,H=648,K={},A={area:"village",x:576,y:324,lv:1,exp:0,next:100,g:0,pts:6,st:{atk:0,def:0,hp:0,int:0,agi:0,luk:0},hp:100,mp:100,wep:"fist",enh:{},inv:{},eq:{head:null,armor:null,pants:null,shoes:null},house:0,animals:{chicken:0,pig:0,cow:0},farm:{},quests:[],qd:0,ach:{},hidden:{},kills:{},tower:0,end:false,weapons:[],dead:0,cook:0,fish:0,mine:0,harvest:0,craft:0,attack:0,buy:0,sell:0,slaughter:0,destroy:0,systems:0};
const WD={fist:["주먹",0,.5,55],club:["나무 몽둥이",1,.7,70],sword:["검",20,1,80],greatsword:["대검",60,5,115],dagger:["단검",10,.6,60],spear:["창",40,3,125],bow:["활",15,1.5,300],shield:["방패",1,1,65],guardian:["수호자의 무기",300,2,145]};
const M={rabbit:["토끼",10,0,0,.7,1],zombie:["좀비",100,10,10,.9,10],goblin:["고블린",100,10,10,1,20],goblinR:["원거리 고블린",90,10,0,.5,25],wolf:["늑대",150,15,5,1.2,50],slime:["폭발 슬라임",70,150,0,1.3,100],thief:["도적",100,30,15,2,125],golem:["골렘",300,200,20,.5,200]};
const drops={rabbit:[["rabbit_meat",.5],["leather",.3]],zombie:[["zombie_arm",.5],["zombie_leg",.5],["old_cloth",.3]],goblin:[["goblin_ear",.4],["dagger_item",.15]],goblinR:[["goblin_ear",.4]],wolf:[["leather",.3],["wolf_fang",.35]],slime:[["explosive_core",.25],["slime",.6]],thief:[["dagger_item",.15]],golem:[["iron",.3],["copper",.3],["silver",.25],["gold",.25],["mithril",.2],["magic_stone",.1]]};
const I={club:["나무 몽둥이",0],rabbit_meat:["토끼고기",20],leather:["가죽",15],zombie_arm:["좀비 팔",25],zombie_leg:["좀비 다리",25],old_cloth:["낡은 천",10],goblin_ear:["고블린 귀",30],wolf_fang:["늑대 송곳니",45],explosive_core:["폭발 코어",70],slime:["슬라임",25],dagger_item:["단검",100],iron:["철",30],copper:["구리",40],silver:["은",60],gold:["금",100],mithril:["미스릴",200],magic_stone:["마석",500],rod:["낚싯대",500],pickaxe:["곡괭이",2530],wheat_seed:["밀 씨앗",10],carrot_seed:["당근 씨앗",15],potato_seed:["감자 씨앗",15],rice_seed:["쌀 씨앗",20],vegetable_seed:["채소 씨앗",20],wheat:["밀",15],carrot:["당근",20],potato:["감자",20],rice:["쌀",20],vegetable:["채소",20],egg:["계란",40],milk:["우유",60],beef:["소고기",80],pork:["돼지고기",70],chicken_meat:["닭고기",50],minnow:["피라미",20],crucian:["붕어",30],salmon:["연어",50],mackerel:["고등어",60],rock_bream:["돌돔",80],bread:["빵",50],grilled_fish:["구운 생선",80],rice_meat:["고기밥",100],fish_rice:["생선밥",110],low_hp:["최하급 HP 포션",10],hp:["일반 HP 포션",50],high_hp:["최상급 HP 포션",100],elixir:["엘릭서",250],low_mp:["최하급 MP 포션",10],mp:["일반 MP 포션",50],high_mp:["최상급 MP 포션",100]};
const ACH=["첫 사냥","최초의 퀘스트","나의 첫 장비","깡깡깡","제작자","오늘은 내가 요리사","와 다이아다","물약을 줘","죽음에서의 경험","보스에 도전할 기회가 있는자","99강화","토끼야 간줘","그워어","고블고블 고블린","아우우우","치이익","도둑이나 도적이나 거기서 거기지","돌덩이가 움직인다","토끼야 제발","으아악","고블린이 너무 많다","왈왈","펑","도둑과 도적은 달라!","돌 좀 그만 캐자","토끼간이 얼마나 좋길레","물렸나?","고블린 씨가 마른다","끼이잉","폭발은 예술이다","뭐 둘다 훔치는 직업인데 같은거 아닌가?","골렘도 이젠 지겹다","와 철이다","구린 구리","철과 은은 비슷해 보여도 다르다","와 한돈","미스 릴","이게 돌이라고?","철수야 철들어라","구리구리 개구리","은근히 철이랑 비슷해 보임","금방석","미스릴도 쌓인다","돌이 이렇게 비싸도 돼?","철이 철철 넘철","구리구리 냄새나","은은 은이다","와 부자다","미스릴 광산 발견","마석 부자","10강은 쉽지","강화의 길","이제 좀 강해졌네","강화 중독","드디어 절반","내집 마련","이사","초호화 저택","이거 얼마에요?","이거 얼만가요?","백만장자","의뢰받습니다","의뢰 조금만 주세요...","의뢰 너무 많아 제발 그만줘.....","이검 잘 드네","아직 멀쩡해","멀쩡하지?","역시 난 잘만들어","아 난 너무 잘해","아 아쉬워 내 성에 안차","약을 줘","으아 제발 약좀","약물중독","수확의 계절","아 뿌듯해","어디 트랙터 없나?","내가 바로 인간 트랙터다!!!","장사 시작","어라? 손님이 왜이리","왜 장사가 잘 되는건데!!!","와 잡혔다","낚시는 기다림의 연속이다","기다려야해...","언제까지 기다려?","토끼야 용궁가자","좀비 아포칼립스","초록색이네?","와 강아지다","으악 포 폭발할다","도둑의 집 도착 아니야 난 도적이라고","이거 움직이나?","농장 생활","알이네!","신선하네","돼지가 많아졌다","자급자족","도축","역시 무리인가?","평화의 상징","수집가"];
const HIDDEN=[["99강화나무몽둥이","나무 몽둥이 +99"],["허접","사망 10,000회"],["파괴자","강화 파괴 10,000회"],["진정한 고인물","무사망 엔딩"],["깼네?","80% 미만·히든 0개 보스 클리어"],["이 정도면 충분히 했다","주요 시스템 경험"],["모든 히든을 찾으세요","히든 전부 획득"]];
let mobs=[],shots=[],modal=0,msg="",mt=0,last=performance.now(),atkT=0,huntSpawnTimer=10;
const say=t=>{msg=t;mt=performance.now()+2200},has=(k,n=1)=>(A.inv[k]||0)>=n,add=(k,n=1)=>{A.inv[k]=(A.inv[k]||0)+n;if(A.inv[k]<=0)delete A.inv[k]};
const hpmax=()=>100+A.st.hp*5,mpmax=()=>100+A.st.int*5,spd=()=>225*(1+A.st.agi*.01),WEP=()=>WD[A.wep],watk=()=>WEP()[1]+(A.enh[A.wep]||0);
function lvl(){while(A.lv<50&&A.exp>=A.next){A.exp-=A.next;A.lv++;A.pts+=6;A.next=Math.floor(A.next*(A.lv<20?1.5:A.lv<30?1.25:1.15));A.hp=hpmax();A.mp=mpmax();say("레벨 업! Lv."+A.lv)}}
function spawn(t,x=80+Math.random()*990,y=70+Math.random()*530){if(t==="boss"){mobs.push({t,x,y,hp:2000,max:2000,cd:0,f:0});return}let d=M[t];if(!d)return;mobs.push({t,x,y,hp:d[1],max:d[1],cd:Math.random(),f:0})}
const HUNT={x:570,y:60,w:560,h:560};
function spawnHuntMonster(){
  if(!M[A.area]||mobs.filter(m=>m.hp>0).length>=8)return;
  let t=A.area;
  if(t==="goblin"&&Math.random()<.3)t="goblinR";
  spawn(t,HUNT.x+25+Math.random()*(HUNT.w-50),HUNT.y+25+Math.random()*(HUNT.h-50));
}
function setup(){
  mobs=[];shots=[];huntSpawnTimer=10;
  if(A.area==="tower"){
    let f=A.tower+1;
    if(f<10){
      for(const z of [[1,"rabbit",10],[2,"zombie",10],[3,"goblin",10],[3,"goblinR",5],[4,"wolf",7],[5,"slime",10],[6,"thief",15],[7,"golem",15],[8,"wolf",5],[8,"thief",5],[9,"golem",1],[9,"goblin",10],[9,"goblinR",5]])
        if(z[0]===f)for(let i=0;i<z[2];i++)spawn(z[1]);
    }else spawn("boss");
    return;
  }
  if(M[A.area]){
    spawnHuntMonster();
    return;
  }
}
function enter(a){
  A.area=a;
  if(["rabbit","zombie","goblin","wolf","slime","thief","golem"].includes(a)){A.x=340;A.y=335}
  else if(a==="crossroads"){A.x=576;A.y=120}
  else {A.x=576;A.y=324}
  setup();
  if(a!=="village")say(({rabbit:"토끼 사냥터",zombie:"좀비 사냥터",goblin:"고블린 사냥터",wolf:"늑대 사냥터",slime:"폭발 슬라임 사냥터",thief:"도적 사냥터",mine:"광산",farm:"농장",fishing:"낚시터",tower:"탑",crossroads:"갈림길"})[a]||a)
}
function damage(raw){let red=Math.min(.9,A.st.def/100);A.hp-=Math.max(1,Math.floor(raw*(1-red)));if(A.hp<=0)die()}
function die(){A.dead++;A.exp=0;A.g=Math.floor(A.g*.9);A.hp=hpmax();A.mp=mpmax();A.area="village";setup();A.x=576;A.y=324;panel("사망","<p>레벨 유지 · EXP 0 · 골드 10% 감소</p>"+B("마을로 돌아가기","close")+B("게임 종료","quit"));document.getElementById("close").onclick=close;document.getElementById("quit").onclick=()=>location.reload();check()}
function kill(m){let d=M[m.t];m.hp=0;A.kills[m.t]=(A.kills[m.t]||0)+1;A.exp+=d?d[5]:0;if(d)A.g+=Math.random()<.2?(m.t==="thief"?50:d[2]?d[2]:5):0;for(const x of drops[m.t]||[])if(Math.random()<x[1])add(x[0]);lvl();check();if(A.area==="tower"&&!mobs.some(x=>x.hp>0)){if(A.tower<9){A.tower++;setTimeout(setup,400)}else if(m.t==="boss")boss()}}
function attack(){let n=performance.now()/1000;if(n-atkT<WEP()[2])return;atkT=n;A.attack++;for(const m of mobs)if(m.hp>0&&Math.hypot(m.x-A.x,m.y-A.y)<WEP()[3]+20){m.hp-=Math.max(1,A.st.atk*5+watk()-(M[m.t]?.[3]||0));if(m.hp<=0)kill(m)}}
function skill(){if(A.mp<30||A.wep==="fist"||A.wep==="club")return;A.mp-=30;for(const m of mobs)if(m.hp>0&&Math.hypot(m.x-A.x,m.y-A.y)<WEP()[3]+70){m.hp-=watk()*2;if(m.hp<=0)kill(m)}say(WEP()[0]+" 스킬")}
function boss(){A.end=true;A.g+=100;A.exp+=1000+Math.floor(Math.random()*4001);A.weapons=A.weapons||[];if(!A.weapons.includes("guardian"))A.weapons.push("guardian");A.wep="guardian";A.tower=10;lvl();panel("엔딩","<p>탑의 수호자를 처치했습니다!<br>100G · EXP 보상 · 수호자의 무기 획득</p>"+B("계속하기","close"));document.getElementById("close").onclick=close;check()}
function check(){if(A.kills.rabbit>=1)ach(1);if(A.qd>=1)ach(2);if(A.wep!=="fist")ach(3);if(Object.keys(A.enh).length)ach(4);if(A.craft)ach(5);if(A.cook)ach(6);if(A.mine)ach(7);if(A.potion)ach(8);if(A.dead)ach(9);if(Object.keys(A.ach).length>=80||Object.keys(A.hidden).length)ach(10);const map=[["rabbit",12,10],["zombie",13,10],["goblin",14,10],["wolf",15,10],["slime",16,10],["thief",17,10],["golem",18,10],["rabbit",19,100],["zombie",20,100],["goblin",21,100],["wolf",22,100],["slime",23,100],["thief",24,100],["golem",25,100]];for(const x of map)if((A.kills[x[0]]||0)>=x[2])ach(x[1]);if(A.g>=1000000)ach(61);if(A.house)ach(56+A.house-1);if(A.harvest>=1)ach(74);if(A.cook>=10)ach(78);if(A.cook>=100)ach(79);if(A.cook>=1000)ach(80);if(A.fish>=1)ach(81);if(A.fish>=10)ach(82);if(A.fish>=100)ach(83);if(A.fish>=1000)ach(84);if(A.end)ach(99);if(A.animals.chicken&&A.animals.pig&&A.animals.cow)ach(92);if(has("egg"))ach(93);if(has("milk"))ach(94);if(A.animals.pig>=20)ach(95);if(A.animals.chicken>=20&&A.animals.pig>=20&&A.animals.cow>=20)ach(96);if(A.slaughter)ach(97);if(A.towerDeath)ach(98);if(Object.keys(A.inv).length>=20)ach(100);if(A.enh.club>=99)A.hidden[1]=1;if(A.dead>=10000)A.hidden[2]=1;if(A.destroy>=10000)A.hidden[3]=1;if(A.end&&A.dead===0)A.hidden[4]=1;if(A.end&&Object.keys(A.ach).length<80&&!Object.keys(A.hidden).length)A.hidden[5]=1;if(A.systems>=9)A.hidden[6]=1;if(Object.keys(A.hidden).length>=6)A.hidden[7]=1}
function ach(i){if(A.ach[i])return;A.ach[i]=1;A.pts+=i===99||i===100?10:i===10||i===11?5:1;say("업적: "+ACH[i-1])}
function buy(k){let p=I[k]?.[1]||0;if(A.g<p)return say("골드 부족");A.g-=p;if(k==="club"){A.weapons=A.weapons||[];if(!A.weapons.includes("club"))A.weapons.push("club");A.wep="club"}else add(k);A.buy++;check()}
function sell(k){if(!has(k))return;A.g+=I[k]?.[1]||0;add(k,-1);A.sell++;check()}
function enhance(){let l=A.enh[A.wep]||0;if(A.wep==="fist"||l>=99)return;let cost=Math.floor(100*(l<10?1:l<20?1.05:l<30?1.1:l<40?1.12:l<50?1.15:l<60?1.18:l<70?1.25:l<80?1.27:1.3));if(A.g<cost)return say("골드 부족");A.g-=cost;if(Math.random()<(l?Math.pow(.95,l):1))A.enh[A.wep]=l+1;else if(l>=10&&Math.random()<.025)A.enh[A.wep]=l-1;else if(l>=20&&Math.random()<.00625){delete A.enh[A.wep];A.destroy++}check()}
function craft(){
  if(has("leather",10)){add("leather",-10);add("leather_armor");A.craft++;A.systems++;say("장비 제작")}
  else say("가죽 10개 필요")
}
function craftPanel(){
  panel("제작대",
    "<p>제작할 장비를 선택하세요.</p>"+
    B("가죽 장비 제작","make_armor")+
    B("닫기","close"));
  document.getElementById("make_armor").onclick=()=>{craft();craftPanel()};
  document.getElementById("close").onclick=close;
}
function cook(){if(has("wheat",2)){add("wheat",-2);add("bread");A.cook++;A.systems++;A.mp=Math.min(mpmax(),A.mp+30);check()}else say("밀 2개 필요")}
function mine(){if(!has("pickaxe"))return say("곡괭이 필요");let o=["iron","copper","silver","gold","mithril","magic_stone"],p=[.3,.25,.15,.12,.1,.08],r=Math.random(),s=0;for(let i=0;i<o.length;i++){s+=p[i];if(r<s){add(o[i]);break}}A.mine++;A.systems++;check()}
function fish(){if(!has("rod"))return say("낚싯대 필요");let o=["minnow","crucian","salmon","mackerel","rock_bream"],p=[.4,.3,.2,.07,.03],r=Math.random(),s=0;for(let i=0;i<o.length;i++){s+=p[i];if(r<s){add(o[i]);break}}A.fish++;A.systems++;check()}
function farm(){let c=["wheat","carrot","potato","rice","vegetable"][Math.floor(Math.random()*5)];add(c);add(c+"_seed");A.harvest++;A.systems++;check()}
function animals(a){if(A.g<({chicken:100,pig:200,cow:300}[a]))return;s=({chicken:100,pig:200,cow:300}[a]);if(A.animals[a]<20){A.g-=s;A.animals[a]++;A.systems++;check()}}
function slaughter(a){if(A.animals[a]<=0)return;A.animals[a]--;add(a==="cow"?"beef":a==="pig"?"pork":"chicken_meat");A.slaughter++;check()}
function B(t,id){return'<button id="'+id+'">'+t+"</button>"}function panel(t,b){modal=1;let m=document.getElementById("modal");m.className="";m.innerHTML='<div class="panel"><h2>'+t+"</h2>"+b+"</div>"}function close(){modal=0;document.getElementById("modal").className="hidden";document.getElementById("modal").innerHTML=""}
function invPanel(){let h=Object.entries(A.inv).filter(x=>x[1]>0).map(x=>'<div class="stat">'+(I[x[0]]?.[0]||x[0])+" ×"+x[1]+"</div>").join("");panel("인벤토리",h+B("닫기","close"));document.getElementById("close").onclick=close}
function status(){let h=Object.entries(A.st).map(x=>'<div class="stat">'+x[0].toUpperCase()+" "+x[1]+B("+","p_"+x[0])+"</div>").join("");panel("상태","<p>Lv."+A.lv+" EXP "+A.exp+"/"+A.next+" G "+A.g+" · 포인트 "+A.pts+"</p>"+h+B("닫기","close"));for(const k in A.st)document.getElementById("p_"+k).onclick=()=>{if(A.pts&&A.st[k]<100){A.pts--;A.st[k]++;A.hp=hpmax();A.mp=mpmax();status()}};document.getElementById("close").onclick=close}
function shop(){let ks=["club","low_hp","hp","high_hp","elixir","low_mp","mp","high_mp","rod","pickaxe","wheat_seed","carrot_seed","potato_seed","rice_seed","vegetable_seed"];panel("상점",ks.map(k=>B(I[k][0]+" "+I[k][1]+"G","b_"+k)).join("")+B("판매","sell")+B("닫기","close"));ks.forEach(k=>document.getElementById("b_"+k).onclick=()=>buy(k));document.getElementById("sell").onclick=()=>{let h=Object.keys(A.inv).map(k=>B(I[k]?.[0]||k,"s_"+k)).join("");panel("판매",h+B("닫기","close"));for(const k of Object.keys(A.inv)){let b=document.getElementById("s_"+k);if(b)b.onclick=()=>sell(k)}document.getElementById("close").onclick=close};document.getElementById("close").onclick=close}
function menu(){
  panel("메뉴",B("계속","close")+B("인벤토리","iv")+B("업적","ac")+B("저장","sv"));
  document.getElementById("close").onclick=close;
  document.getElementById("iv").onclick=invPanel;
  document.getElementById("ac").onclick=achPanel;
  document.getElementById("sv").onclick=savePanel;
}
function equipment(){let owned=A.weapons||[];let h=owned.map(k=>B(WD[k][0]+" +"+(A.enh[k]||0),"w_"+k)).join("");if(A.wep!=="fist"&&!owned.includes(A.wep))A.wep="fist";panel("장비",h+(owned.length?B("강화","en"):"")+B("닫기","close"));for(const k of owned){let b=document.getElementById("w_"+k);if(b)b.onclick=()=>{A.wep=k;close();check()}}if(document.getElementById("en"))document.getElementById("en").onclick=()=>{enhance();equipment()};document.getElementById("close").onclick=close}
function achPanel(){
  let body=ACH.map((n,i)=>'<div class="stat">#'+(i+1)+" "+n+" "+(A.ach[i+1]?"✓":"")+"</div>").join("");
  if(Object.keys(A.hidden).length>0)body+=B("히든","hi");
  body+=B("닫기","close");
  panel("업적 "+Object.keys(A.ach).length+"/100",body);
  if(document.getElementById("hi"))document.getElementById("hi").onclick=()=>panel("히든",HIDDEN.map((h,i)=>'<div class="stat">'+h[0]+" "+(A.hidden[i+1]?"획득":"???")+"</div>").join("")+B("닫기","close"));
  document.getElementById("close").onclick=close;
}
function savePanel(){panel("저장", [1,2,3,4,5].map(i=>B("슬롯 "+i+" 저장","s"+i)).join("")+B("닫기","close"));for(let i=1;i<6;i++)document.getElementById("s"+i).onclick=()=>{localStorage.setItem("rpg-"+i,JSON.stringify(A));say("저장 완료");close()};document.getElementById("close").onclick=close}
function questBoard(){
  const qs=[
    ["q1","의뢰 1 · 사냥 의뢰"],
    ["q2","의뢰 2 · 사냥 의뢰"],
    ["q3","의뢰 3 · 사냥 의뢰"],
    ["q4","의뢰 4 · 배달 의뢰"]
  ];
  panel("퀘스트 게시판",
    "<p>의뢰 4개가 게시되어 있습니다.</p>"+
    qs.map(q=>B(q[1],q[0])).join("")+
    B("닫기","close"));
  for(const [id,title] of qs){
    document.getElementById(id).onclick=()=>{
      panel(title,
        "<p>퀘스트 상세 조건은 현재 미정입니다.</p>"+
        "<p>수락한 퀘스트는 조건을 달성했을 때 성공 처리됩니다.</p>"+
        B("수락","acceptQuest")+B("뒤로","backQuest"));
      document.getElementById("acceptQuest").onclick=()=>{
        A.quests=A.quests||[];
        if(!A.quests.includes(id))A.quests.push(id);
        A.qd++;
        A.systems++;
        check();
        say("퀘스트를 수락했습니다.");
        close();
      };
      document.getElementById("backQuest").onclick=questBoard;
    };
  }
  document.getElementById("close").onclick=close;
}
function village(){
  // 현재 마을에서 실제로 배치된 시설만 표시한다.
  panel("마을",
    B("사냥터","hunt")+
    B("상점","shop")+
    B("장비/강화","eq")+
    B("제작","craft")+
    B("퀘스트 게시판","quest")+
    B("닫기","close"));
  document.getElementById("hunt").onclick=()=>{
    panel("사냥터",
      ["rabbit","zombie","goblin","wolf","slime","thief","golem"].map(k=>B(k,"a_"+k)).join("")+
      B("닫기","close"));
    for(const k of ["rabbit","zombie","goblin","wolf","slime","thief","golem"])
      document.getElementById("a_"+k).onclick=()=>{enter(k);close()};
    document.getElementById("close").onclick=close;
  };
  document.getElementById("shop").onclick=shop;
  document.getElementById("eq").onclick=equipment;
  document.getElementById("craft").onclick=craftPanel;
  document.getElementById("quest").onclick=questBoard;
  document.getElementById("close").onclick=close;
}
function nearRect(x,y,w,h,pad=18){
  return A.x>=x-pad&&A.x<=x+w+pad&&A.y>=y-pad&&A.y<=y+h+pad;
}
function interact(){
  if(A.area==="crossroads"){
    if(A.y<190){enter("village");return}
    if(A.x<220&&A.y>220&&A.y<500){enter("mine");return}
    if(A.x>900&&A.y>220&&A.y<500){enter("fishing");return}
    if(A.x>380&&A.x<760&&A.y>500){enter("tower");return}
    say("이동 지점에서 F를 눌러주세요.");
    return;
  }
  if(A.area!=="village"){
    if(A.area==="tower"){if(mobs.length===0)setup();return}
    if(A.area==="mine"){mine();return}
    if(A.area==="fishing"){fish();return}
    if(A.area==="farm"){farm();return}
    if(["rabbit","zombie","goblin","wolf","slime","thief","golem"].includes(A.area)){
      if(A.x<150&&A.y>210&&A.y<500)enter("village");
      else say("마을 포탈로 이동하려면 왼쪽 포탈에서 F를 눌러주세요.");
      return;
    }
    return;
  }

  if(nearRect(127,33,291,130)){shop();return;}
  if(nearRect(536,35,418,133)){equipment();return;}
  if(nearRect(22,165,36,208)){say("집");return;}
  if(nearRect(140,412,90,154)){craftPanel();return;}

  if(nearRect(1080,202,45,265)){
    panel("사냥터",
      ["rabbit","zombie","goblin","wolf","slime","thief","golem"].map(k=>B(k,"a_"+k)).join("")+
      B("닫기","close"));
    for(const k of ["rabbit","zombie","goblin","wolf","slime","thief","golem"])
      document.getElementById("a_"+k).onclick=()=>{enter(k);close()};
    document.getElementById("close").onclick=close;
    return;
  }

  if(nearRect(483,572,235,54)){enter("crossroads");return;}
  if(Math.hypot(A.x-810,A.y-600)<55){questBoard();return;}

  say("이곳에서는 할 수 있는 일이 없습니다.");
}
function update(dt){if(modal)return;
if(["rabbit","zombie","goblin","wolf","slime","thief","golem"].includes(A.area)){
  huntSpawnTimer-=dt;
  if(huntSpawnTimer<=0){
    if(mobs.filter(m=>m.hp>0).length<8)spawnHuntMonster();
    huntSpawnTimer=10;
  }
}
A.hp=Math.min(hpmax(),A.hp+dt/(A.st.hp>=100?5:10));A.mp=Math.min(mpmax(),A.mp+dt/(A.st.int>=100?.5:1));let dx=0,dy=0;if(K.a)dx--;if(K.d)dx++;if(K.w)dy--;if(K.s)dy++;if(dx||dy){let l=Math.hypot(dx,dy);A.x+=dx/l*spd()*dt;A.y+=dy/l*spd()*dt}if(K[" "])attack();if(K.q)skill();for(const m of mobs){if(m.hp<=0)continue;let d=M[m.t],dx=A.x-m.x,dy=A.y-m.y,di=Math.hypot(dx,dy);if(m.t==="rabbit"){if(di<250&&di>0){m.x-=dx/di*d[4]*40*dt;m.y-=dy/di*d[4]*40*dt;m.x=Math.max(25,Math.min(W-25,m.x));m.y=Math.max(25,Math.min(H-25,m.y))}}else if(m.t==="goblinR"){if(di<180){m.x-=dx/di*d[4]*35*dt;m.y-=dy/di*d[4]*35*dt}}else if(d){if(di>45){m.x+=dx/di*d[4]*35*dt;m.y+=dy/di*d[4]*35*dt}m.cd-=dt;if(di<45&&m.cd<=0){m.cd=1.5;damage(d[2])}}}mobs=mobs.filter(m=>m.hp>0)}
function rect(x,y,w,h,fill,stroke){X.fillStyle=fill;X.fillRect(x,y,w,h);if(stroke){X.strokeStyle=stroke;X.strokeRect(x,y,w,h)}}function label(t,x,y,size=16,align="center"){X.fillStyle="#fff";X.font=size+"px sans-serif";X.textAlign=align;X.fillText(t,x,y)}function path(x1,y1,x2,y2,w=70){X.strokeStyle="#b89b70";X.lineWidth=w;X.lineCap="round";X.beginPath();X.moveTo(x1,y1);X.lineTo(x2,y2);X.stroke();X.lineWidth=1}function drawVillage(){
  // 사용자가 올린 배치도를 그대로 기준으로 한다.
  // 좌표는 1152x648 게임 화면에 맞춰 비례 변환했다.
  X.fillStyle="#ffffff";X.fillRect(0,0,W,H);

  // 마을 외곽선
  X.strokeStyle="#111";X.lineWidth=4;X.strokeRect(6,2,W-12,H-6);
  X.lineWidth=1;

  // 상점
  mapZone(127,33,291,130,"상점","#f3a5c1");

  // 대장간
  mapZone(536,35,418,133,"대장간","#29ad52");

  // 집
  mapZone(22,165,36,208,"집","#f0d500");

  // 제작대
  mapZone(140,412,90,154,"제작대","#b8754e");

  // 사냥터
  mapZone(1080,202,45,265,"사냥터","#e5232d");

  // 갈림길
  mapZone(483,572,235,54,"갈림길","#ff7620");

  // 갈림길 오른쪽에 추가 요청된 퀘스트 게시판
  questSign(810,600);
}
function mapZone(x,y,w,h,name,border){
  X.fillStyle="#fff";
  X.fillRect(x,y,w,h);
  X.strokeStyle=border;
  X.lineWidth=4;
  X.strokeRect(x,y,w,h);
  X.lineWidth=1;
  X.fillStyle="#222";
  X.font="16px sans-serif";
  X.textAlign="center";
  X.textBaseline="middle";
  X.fillText(name,x+w/2,y+h/2);
  X.textBaseline="alphabetic";
}
function questSign(x,y){
  X.fillStyle="#684936";
  X.fillRect(x-4,y-28,8,52);
  X.fillStyle="#d8c08a";
  X.fillRect(x-58,y-56,116,30);
  X.strokeStyle="#5c422f";
  X.lineWidth=2;
  X.strokeRect(x-58,y-56,116,30);
  label("퀘스트 게시판",x,y-37,12);
  label("F",x,y+8,12);
  X.lineWidth=1;
}
function building(x,y,w,h,name,roof){
  // 건물 본체
  X.fillStyle="#d9c3a0";X.fillRect(x,y+18,w,h-18);
  X.strokeStyle="#735b45";X.lineWidth=3;X.strokeRect(x,y+18,w,h-18);
  // 지붕
  X.fillStyle=roof;
  X.beginPath();X.moveTo(x-8,y+20);X.lineTo(x+w/2,y-18);X.lineTo(x+w+8,y+20);X.closePath();X.fill();
  X.strokeStyle="#604936";X.stroke();
  // 문과 창문
  X.fillStyle="#684b39";X.fillRect(x+w/2-12,y+h-28,24,28);
  X.fillStyle="#9ec4c8";X.fillRect(x+18,y+40,22,18);X.fillRect(x+w-40,y+40,22,18);
  X.strokeStyle="#604936";X.strokeRect(x+18,y+40,22,18);X.strokeRect(x+w-40,y+40,22,18);
  label(name,x+w/2,y+h+18,14);
  X.lineWidth=1;
}
function gate(x,y,name){
  X.fillStyle="#6a4c35";X.fillRect(x-28,y-48,56,96);
  X.fillStyle="#a9d6e5";X.fillRect(x-18,y-35,36,70);
  X.strokeStyle="#493527";X.lineWidth=4;X.strokeRect(x-28,y-48,56,96);
  label(name,x,y+70,15);
  label("F",x,y+2,16);
  X.lineWidth=1;
}
function signpost(x,y,name){
  X.fillStyle="#654936";X.fillRect(x-3,y-30,6,34);
  X.fillStyle="#b88b57";X.fillRect(x-42,y-45,84,22);
  X.strokeStyle="#654936";X.strokeRect(x-42,y-45,84,22);
  label(name,x,y-29,12);
}
function outlineNode(x,y,w,h,color){
  X.strokeStyle=color;X.lineWidth=3;
  X.beginPath();
  X.ellipse(x+w/2,y+h/2,w/2,h/2,0,0,Math.PI*2);
  X.stroke();
  X.lineWidth=1;
}function drawHunt(){
  X.fillStyle="#ffffff";X.fillRect(0,0,W,H);

  // 사냥터 외곽
  X.strokeStyle="#e5232d";X.lineWidth=5;X.strokeRect(35,16,W-55,H-32);X.lineWidth=1;

  // 왼쪽 마을 이동 포탈
  X.fillStyle="#111";X.beginPath();X.roundRect(38,240,65,250,18);X.fill();

}function drawCrossroads(){
  X.fillStyle="#ffffff";X.fillRect(0,0,W,H);

  // 갈림길 외곽
  X.strokeStyle="#e5c43b";X.lineWidth=3;X.strokeRect(65,35,W-130,H-70);X.lineWidth=1;

  // 마을로 돌아가는 방향은 검은색
  X.fillStyle="#000000";X.beginPath();X.roundRect(255,85,280,95,16);X.fill();

  // 광산
  X.strokeStyle="#777777";X.lineWidth=4;X.beginPath();
  X.roundRect(95,175,90,245,12);X.stroke();

  // 낚시터
  X.strokeStyle="#1746b8";X.beginPath();
  X.roundRect(930,165,90,245,12);X.stroke();

  // 탑
  X.strokeStyle="#19cfe0";X.beginPath();
  X.roundRect(275,430,250,105,16);X.stroke();

  X.lineWidth=1;
}
function drawFarm(){X.fillStyle="#75623e";X.fillRect(0,0,W,H);for(let y=80;y<590;y+=90)for(let x=80;x<1080;x+=180)rect(x,y,135,55,"#8b6b43");label("농장",576,40,22);label("세부 배치는 미정",576,620,14)}function drawMine(){X.fillStyle="#444";X.fillRect(0,0,W,H);for(let i=0;i<28;i++){let x=(i*97)%W,y=70+((i*71)%500);X.fillStyle=i%5===0?"#8b6b45":"#555";X.beginPath();X.arc(x,y,20,0,7);X.fill()}label("광산",576,40,22);label("광맥 배치는 게임 진행 중 랜덤",576,620,14)}function drawFishing(){X.fillStyle="#477ea0";X.fillRect(0,0,W,H);X.fillStyle="#5c9460";X.fillRect(0,0,210,H);X.fillRect(942,0,210,H);for(let y=60;y<H;y+=55){X.strokeStyle="rgba(255,255,255,.15)";X.beginPath();X.moveTo(220,y);X.quadraticCurveTo(576,y+18,932,y);X.stroke()}label("낚시터",576,42,22);label("민물 + 바닷물",576,70,14)}function drawTower(){X.fillStyle="#302d3a";X.fillRect(0,0,W,H);for(let x=0;x<W;x+=96)for(let y=0;y<H;y+=96){X.strokeStyle="rgba(255,255,255,.08)";X.strokeRect(x,y,96,96)}rect(430,90,292,470,"#4a4654","#9a8faa");label("탑",576,125,28);label("층 "+Math.min(A.tower+1,10),576,155,18);label("미정 공간",576,610,14)}function drawMap(){if(A.area==="village")drawVillage();else if(["rabbit","zombie","goblin","wolf","slime","thief","golem"].includes(A.area))drawHunt();else if(A.area==="crossroads")drawCrossroads();else if(A.area==="farm")drawFarm();else if(A.area==="mine")drawMine();else if(A.area==="fishing")drawFishing();else if(A.area==="tower")drawTower();else{X.fillStyle="#4b493f";X.fillRect(0,0,W,H)}}function draw(){drawMap();for(const m of mobs){X.fillStyle=m.t==="rabbit"?"#d9d9d9":m.t==="wolf"?"#888":m.t==="golem"?"#a77b55":m.t==="boss"?"#b84b8b":"#67a85f";X.beginPath();X.arc(m.x,m.y,m.t==="boss"?30:18,0,7);X.fill()}X.fillStyle=["rabbit","zombie","goblin","wolf","slime","thief","golem"].includes(A.area)?"#7ee000":"#4ca6ff";X.beginPath();X.arc(A.x,A.y,16,0,7);X.fill();if(mt>performance.now()){X.fillStyle="#fff";X.font="20px sans-serif";X.textAlign="center";X.fillText(msg,W/2,H-40)}document.getElementById("level").textContent="Lv."+A.lv;document.getElementById("exp").textContent="EXP "+A.exp+"/"+A.next;document.getElementById("gold").textContent="G "+A.g;document.getElementById("weapon").textContent=WD[A.wep][0]+" +"+(A.enh[A.wep]||0);document.getElementById("hpbar").style.width=A.hp/hpmax()*100+"%";document.getElementById("mpbar").style.width=A.mp/mpmax()*100+"%";document.getElementById("hptext").textContent="HP "+Math.floor(A.hp)+"/"+hpmax();document.getElementById("mptext").textContent="MP "+Math.floor(A.mp)+"/"+mpmax()}
function load(){let s=localStorage.getItem("rpg-1");if(s)try{Object.assign(A,JSON.parse(s))}catch(e){}A.weapons=Array.isArray(A.weapons)?A.weapons.filter(k=>k==="club"||k==="guardian"):[];if(A.wep!=="fist"&&!A.weapons.includes(A.wep))A.wep="fist";A.hp=A.hp||100;A.mp=A.mp||100;A.inv=A.inv||{};A.enh=A.enh||{};A.st=A.st||{atk:0,def:0,hp:0,int:0,agi:0,luk:0};setup()}
window.onkeydown=e=>{K[e.key]=1;if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(e.key))e.preventDefault();if(e.key.toLowerCase()==="f"&&!e.repeat)interact();if(e.key.toLowerCase()==="e"&&!e.repeat&&!modal)status();if(e.key==="Escape"&&!e.repeat)(modal?close():menu())};window.onkeyup=e=>K[e.key]=0;load();setInterval(()=>localStorage.setItem("rpg-autosave",JSON.stringify(A)),30000);window.onbeforeunload=()=>localStorage.setItem("rpg-autosave",JSON.stringify(A));function loop(n){let d=Math.min(.05,(n-last)/1000);last=n;update(d);draw();requestAnimationFrame(loop)}requestAnimationFrame(loop);