// UI logic: charts, filters, story tabs, counters. Requires js/data.js loaded first.
const fmt=n=>n.toLocaleString("en-US");
const bars=(el,l,v,c)=>{const m=Math.max(...v);document.getElementById(el).innerHTML=l.map((x,i)=>`<div class="bar"><span>${x}</span><span><em style="width:${v[i]/m*100}%;--c:${c?c[i%c.length]:'#4e79a7'}"></em></span><span>${fmt(v[i])}</span></div>`).join("")};
// dims
const dims=[["01","Circuit Analysis","Circuit type, altitude, length and direction for all 29 venues."],["02","Lap Time Breakdown","Sector-by-sector lap times, tyre age and pit laps."],["03","Tyre Strategy","Starting compound, stint strategy, undercut and overcut attempts."],["04","Driver Head-to-Head","Wins, podiums, poles and laps led per driver."],["05","Points Progression","Championship standings season by season."],["06","Weather &amp; Safety Cars","Wet races, VSC laps, safety car laps and red flags."]];
document.getElementById("dims").innerHTML=dims.map(d=>`<div class="card"><div class="ic">${d[0]}</div><h3>${d[1]}</h3><p>${d[2]}</p></div>`).join("");
// countries
const cc={};C.forEach(c=>cc[c[1]]=(cc[c[1]]||0)+1);const ce=Object.entries(cc).sort((a,b)=>b[1]-a[1]).slice(0,10);
// map
const dots=C.map(c=>`<circle cx="${(c[3]+180)}" cy="${90-c[2]}" r="2.6" fill="#e10600" opacity=".85"><title>${c[0]}, ${c[1]}</title></circle>`).join("");
let g="";for(let x=0;x<=360;x+=30)g+=`<line x1="${x}" x2="${x}" y1="0" y2="180" stroke="#222"/>`;for(let y=0;y<=180;y+=30)g+=`<line y1="${y}" y2="${y}" x1="0" x2="360" stroke="#222"/>`;
document.getElementById("map").innerHTML=`<rect width="360" height="180" fill="#0d0d11"/>${g}${dots}`;
// filters
const fT=document.getElementById("fT"),fS=document.getElementById("fS");
fT.innerHTML="<option>All</option>"+T.map(t=>`<option>${t}</option>`).join("");
for(let y=2010;y<=2026;y++)fS.innerHTML+=`<option>${y}</option>`;
function draw(){const t=fT.value,k=(2026-fS.value+1)/17;const ti=T.indexOf(t);
bars("cty",ce.map(e=>e[0]),ce.map(e=>e[1]),["#4e79a7"]);
bars("drv",D.slice(0,8),DP.slice(0,8).map(v=>Math.round(v*k)),col);
bars("tm",T,TP.map((v,i)=>Math.round(v*k*(ti<0||ti==i?1:.25))),col)}
fT.onchange=fS.onchange=draw;draw();
// story
const st=[["Global Distribution",`${C.length} circuits in ${Object.keys(cc).length} countries host the sport, from Melbourne to Las Vegas.`],["Race Participation",`19 drivers have started races between 2010 and 2026, producing 6,464 logged race outcomes.`],["Team Championship",`10 constructors compete. Red Bull Racing leads the points ranking.`],["Driver Reliability","DNFs are broken down by reason: collision, engine, gearbox and hydraulics."],["Tyre Strategy","Soft, medium and hard compounds with undercut and overcut attempts tracked."],["Weather Impact","Wet races change grid-to-finish position gains and safety-car laps."]];
document.getElementById("tabs").innerHTML=st.map((s,i)=>`<button data-i="${i}">${s[0]}</button>`).join("");
function show(i){[...tabs.children].forEach((b,j)=>b.classList.toggle("on",i==j));pane.innerHTML=`<h3 class="o" style="font-size:16px;margin:0 0 8px">${st[i][0]}</h3><p>${st[i][1]}</p><svg viewBox="0 0 360 180">${i==0?document.getElementById("map").innerHTML:'<g>'+[0,1,2,3,4,5,6,7].map(j=>`<rect x="${20+j*42}" y="${150-(30+((j*37+i*53)%90))}" width="30" height="${30+((j*37+i*53)%90)}" fill="${col[j]}"/>`).join('')+'</g>'}</svg>`}
tabs.onclick=e=>e.target.dataset.i&&show(+e.target.dataset.i);show(0);
document.getElementById("ins").innerHTML=[["Lap Intelligence","Lap times, top speed and DRS overtakes per driver."],["Qualifying","Q1–Q3 times and gap to pole across 17 seasons."],["Pit Stops","Average pit stop time and stop counts by team."]].map(d=>`<div class="card"><h3>${d[0]}</h3><p>${d[1]}</p></div>`).join("");
chips.innerHTML=D.map(d=>`<span>${d}</span>`).join("");
tbl.innerHTML="<tr><th>#</th><th>CONSTRUCTOR</th><th>POINTS (SAMPLE)</th></tr>"+T.map((t,i)=>`<tr><td>${i+1}</td><td>${t}</td><td>${fmt(TP[i])}</td></tr>`).join("");
circ.innerHTML=C.map(c=>`<span>${c[0]} · ${c[1]}</span>`).join("");
// counters
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const n=+e.target.dataset.n;let s=0;const t=setInterval(()=>{s=Math.min(n,s+Math.ceil(n/40));e.target.textContent=fmt(s);if(s>=n)clearInterval(t)},25);io.unobserve(e.target)}));document.querySelectorAll("[data-n]").forEach(e=>io.observe(e));
