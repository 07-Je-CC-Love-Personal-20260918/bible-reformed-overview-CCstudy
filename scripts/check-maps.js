const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();
for(const w of [375,768,1280]){const p=await b.newPage({viewport:{width:w,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/maps.html');await p.waitForTimeout(800);
const n=await p.$$eval('#mapTabs2 .btn',x=>x.length);const res=[];
for(let i=0;i<n;i++){await p.click(`#mapTabs2 .btn[data-i="${i}"]`);await p.waitForTimeout(400);
 const r=await p.evaluate(()=>{const svg=document.querySelector('#mapStage svg');const ts=[...svg.querySelectorAll('text')].map(t=>[t.textContent,t.getBoundingClientRect()]);let o=0;
  for(let a=0;a<ts.length;a++)for(let c=a+1;c<ts.length;c++){const A=ts[a][1],C=ts[c][1];if(Math.min(A.right,C.right)-Math.max(A.left,C.left)>3&&Math.min(A.bottom,C.bottom)-Math.max(A.top,C.top)>3)o++}
  return [ts.length,o,document.documentElement.scrollWidth-innerWidth]});res.push(r.join('/'))}
if(w===1280){await p.click('#mapTabs2 .btn[data-i="3"]');await p.waitForTimeout(3500);await (await p.$('#m-maps')).screenshot({path:'/home/claude/work/m3.png'});await (await p.$('#m-tab')).screenshot({path:'/home/claude/work/tab.png'})}
console.log(w,res.join(' '),errs);await p.close()}
await b.close()})();
