
const $=id=>document.getElementById(id), fmt=x=>Number(x).toLocaleString(undefined,{maximumFractionDigits:2});
let style='below', unit='mmH2O';
const info={
 below:['Below Low Tapping','DPT below HP / low tapping','H2 is HP-to-DPT distance. H3 is LP-to-DPT distance.'],
 same:['Same Level as Low Tapping','DPT at HP / low tapping','Transmitter elevation is 0. H2 = 0 and H3 = H1.'],
 mid:['Between Tappings','DPT between HP and LP tappings','Enter the DPT elevation above HP as a positive value.'],
 above:['Above Upper Tapping','DPT above LP / upper tapping','Enter the DPT elevation above HP as a positive value greater than H1.']
};
document.querySelectorAll('.style-card').forEach(c=>c.onclick=()=>{document.querySelectorAll('.style-card').forEach(x=>x.classList.remove('selected'));c.classList.add('selected');style=c.dataset.style;$('selectionText').textContent=info[style][0]});
$('continueBtn').onclick=()=>{$('selectionPage').classList.add('hidden');$('calculatorPage').classList.remove('hidden');$('selectedStyle').textContent=info[style][0];configure();calc()};
$('backBtn').onclick=()=>{$('calculatorPage').classList.add('hidden');$('selectionPage').classList.remove('hidden')};

function configure(){
  let e=2500;
  if(style==='same')e=0;
  if(style==='mid')e=2750;
  if(style==='above')e=6500;
  $('elev').value=e;$('elevHelp').textContent=info[style][2];
}
function cv(v,u){return u==='mmH2O'?v:u==='mbar'?v*.0980665:u==='kPa'?v*.00980665:v*.001422334}
function calc(){
  let sg1=+$('sg1').value||0,sg2=+$('sg2').value||0,h1=+$('h1').value||0,e=+$('elev').value||0,lvl=Math.max(0,Math.min(100,+$('level').value||0));
  // e = vertical distance from HP tap down to DPT; negative would mean above HP.
  // For the four UI styles we store elevation above HP as positive.
  const lrv=sg1*e-sg2*(h1+e);
  const urv=sg1*(h1+e)-sg2*(h1+e);
  const dp=sg1*(lvl/100*h1+e)-sg2*(h1+e);
  const span=urv-lrv;
  $('lrv').textContent=fmt(cv(lrv,unit));$('urv').textContent=fmt(cv(urv,unit));$('span').textContent=fmt(cv(span,unit));$('dp').textContent=fmt(cv(dp,unit));$('curlevel').textContent=lvl.toFixed(1);
  $('svgSG1').textContent=sg1.toFixed(3);$('svgSG2').textContent=sg2.toFixed(3);
  let y=350-215*lvl/100;$('levelLine').setAttribute('y1',y);$('levelLine').setAttribute('y2',y);$('levelText').textContent='LEVEL '+lvl.toFixed(1)+'%';$('liquid').setAttribute('d',`M105 ${y} Q250 ${y-30} 395 ${y} L395 500 L105 500Z`);$('surface').setAttribute('d',`M105 ${y} Q250 ${y-30} 395 ${y}`);
  draw(e,h1);
  $('points').innerHTML=[0,25,50,75,100].map(p=>{let v=sg1*(p/100*h1+e)-sg2*(h1+e);return `<tr><td>${p}</td><td>${fmt(v)}</td><td>${fmt(cv(v,'mbar'))}</td><td>${fmt(cv(v,'kPa'))}</td><td>${fmt(cv(v,'psi'))}</td></tr>`}).join('');
}
function draw(e,h1){
  const top=135,hp=350,y=hp+e*(215/h1),dptY=Math.max(25,Math.min(490,y));
  $('dpt').setAttribute('transform',`translate(500 ${dptY-30})`);
  const hpPipe=`<path d="M395 ${hp} H475 V${dptY} H500" fill="none" stroke="#2496e8" stroke-width="7"/>`;
  const lpPipe=`<path d="M395 ${top} H650 V${dptY} H592" fill="none" stroke="#7d8795" stroke-width="7"/>`;
  $('piping').innerHTML=hpPipe+lpPipe+`<text x="447" y="${hp-15}" font-size="13" font-weight="800">HP</text><text x="455" y="${top-15}" font-size="13" font-weight="800">LP</text>`;
  $('dims').innerHTML=`<line x1="425" y1="${hp}" x2="425" y2="${dptY}" stroke="#ef4444" stroke-width="2"/><line x1="416" y1="${hp}" x2="434" y2="${hp}" stroke="#ef4444"/><line x1="416" y1="${dptY}" x2="434" y2="${dptY}" stroke="#ef4444"/><text x="345" y="${(hp+dptY)/2}" font-size="13" font-weight="800" fill="#dc2626">H2 = ${Math.round(Math.abs(e))}</text>
  <line x1="680" y1="${top}" x2="680" y2="${dptY}" stroke="#ef4444" stroke-width="2"/><line x1="671" y1="${top}" x2="689" y2="${top}" stroke="#ef4444"/><line x1="671" y1="${dptY}" x2="689" y2="${dptY}" stroke="#ef4444"/><text x="694" y="${(top+dptY)/2}" font-size="13" font-weight="800" fill="#dc2626">H3 = ${Math.round(Math.abs(h1-e))}</text>
  <line x1="405" y1="${hp}" x2="405" y2="${top}" stroke="#ef4444" stroke-width="2"/><text x="415" y="246" font-size="13" font-weight="800" fill="#dc2626">H1 = ${Math.round(h1)}</text>`;
  $('diagramNote').textContent=info[style][2];
}
document.querySelectorAll('input').forEach(x=>x.addEventListener('input',calc));
$('levelSlider').oninput=()=>{$('level').value=$('levelSlider').value;calc()};
document.querySelectorAll('.unit').forEach(b=>b.onclick=()=>{document.querySelectorAll('.unit').forEach(x=>x.classList.remove('active'));b.classList.add('active');unit=b.dataset.u;calc()});
