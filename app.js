import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Good Morning</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 100%; height: 100%; }
  body {
    min-height: 100vh;
    background: linear-gradient(180deg,
      #03111f 0%, #061e3a 12%, #0b2d5c 25%,
      #1045a0 40%, #1a65c8 54%, #2d8fe8 66%,
      #5ab3f5 76%, #8dcff7 84%,
      #c2e8fb 90%, #e8f6ff 96%, #fff8ef 100%
    );
    font-family: 'Segoe UI', Georgia, sans-serif;
    overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    text-align: center; position: relative;
  }
  canvas { position: absolute; inset: 0; pointer-events: none; }
  .horizon-glow {
    position: absolute; bottom: 0; left: 0; right: 0; height: 38%;
    background: linear-gradient(to top,
      rgba(255,215,100,0.28) 0%, rgba(255,180,80,0.12) 40%, transparent 100%);
    pointer-events: none;
  }
  .content {
    position: relative; z-index: 10;
    padding: clamp(20px, 5vw, 60px);
    animation: fadeUp 2s cubic-bezier(0.22,1,0.36,1) both;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  .eyebrow {
    font-size: clamp(10px, 1.8vw, 13px);
    letter-spacing: .3em; text-transform: uppercase;
    color: rgba(255,238,180,0.7); font-weight: 400; margin-bottom: 20px;
  }
  h1 {
    font-size: clamp(48px, 11vw, 120px);
    font-weight: 800; line-height: 1; letter-spacing: -0.03em;
    background: linear-gradient(160deg,
      #fffbe6 0%, #ffe066 18%, #ffd000 34%,
      #f5a623 52%, #ffd000 68%, #ffe87a 82%, #fffbe6 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; background-size: 200% auto;
    animation: goldShimmer 5s ease-in-out infinite;
    filter: drop-shadow(0 0 32px rgba(255,200,0,0.45));
  }
  @keyframes goldShimmer {
    0%,100% { background-position: 0% 50%; }
    50%     { background-position: 100% 50%; }
  }
  .rule {
    width: clamp(50px, 10vw, 100px); height: 1.5px;
    background: linear-gradient(90deg, transparent, rgba(255,215,80,0.8), transparent);
    margin: 22px auto; border-radius: 2px;
  }
  .tagline {
    font-size: clamp(13px, 2.8vw, 20px);
    color: rgba(255,248,220,0.82); font-weight: 300;
    letter-spacing: .06em; line-height: 1.6;
  }
  .tagline em { font-style: normal; color: #ffe87a; font-weight: 500; }
  .date {
    margin-top: 28px; font-size: clamp(11px,1.8vw,14px);
    color: rgba(200,230,255,0.55); letter-spacing: .15em; font-weight: 300;
  }
</style>
</head>
<body>
<canvas id="canvas"></canvas>
<div class="horizon-glow"></div>
<div class="content">
  <p class="eyebrow" id="greeting">—</p>
  <h1>Good Morning</h1>
  <div class="rule"></div>
  <p class="tagline">The sky opens its arms &mdash;<br><em>golden, clear, and made for you.</em></p>
  <p class="date" id="dateStr"></p>
</div>
<script>
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], birds = [], clouds = [], stars = [];
  function resize(){ W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  function rand(a,b){ return a + Math.random()*(b-a); }

  function initStars(){
    stars = [];
    for(let i=0;i<110;i++) stars.push({
      x:rand(0,1)*W, y:rand(0,0.52)*H,
      r:rand(0.3,1.6), phase:rand(0,Math.PI*2), speed:rand(0.5,1.8)
    });
  }
  function initClouds(){
    clouds = [
      {x:rand(-0.3,1.2),y:0.55,w:0.22,h:0.07,alpha:0.13,speed:0.00012},
      {x:rand(-0.3,1.2),y:0.60,w:0.18,h:0.055,alpha:0.10,speed:0.00009},
      {x:rand(-0.3,1.2),y:0.50,w:0.28,h:0.08,alpha:0.11,speed:0.00014},
      {x:rand(-0.3,1.2),y:0.65,w:0.15,h:0.045,alpha:0.08,speed:0.00010},
    ];
  }
  function drawCloud(cx,cy,cw,ch,alpha){
    ctx.save(); ctx.globalAlpha=alpha; ctx.fillStyle='#d6eeff';
    const b=(x,y,r)=>{ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();};
    b(cx+cw*0.1,cy,ch*0.55); b(cx+cw*0.3,cy-ch*0.22,ch*0.72);
    b(cx+cw*0.55,cy-ch*0.18,ch*0.65); b(cx+cw*0.75,cy-ch*0.08,ch*0.52);
    b(cx+cw*0.9,cy,ch*0.48); ctx.restore();
  }
  function spawnBird(){
    birds.push({x:-40,y:rand(0.15,0.5)*H,speed:rand(0.9,2.0),
      wing:0,wingDir:1,wingSpeed:rand(0.08,0.14),size:rand(8,14),alpha:rand(0.35,0.65)});
  }
  function drawBird(b){
    ctx.save(); ctx.globalAlpha=b.alpha;
    ctx.strokeStyle='#0a2a5e'; ctx.lineWidth=1.5; ctx.lineCap='round';
    const wf=Math.sin(b.wing)*b.size*0.5;
    ctx.beginPath(); ctx.moveTo(b.x-b.size,b.y+wf);
    ctx.quadraticCurveTo(b.x,b.y-wf*0.3,b.x+b.size,b.y+wf);
    ctx.stroke(); ctx.restore();
  }
  const goldColors=['#ffd700','#ffe87a','#f5c518','#fff0a0','#ffc107','#ffdb58'];
  function spawnParticle(){
    particles.push({x:rand(0.1,0.9)*W,y:rand(0.5,1.0)*H,r:rand(1,3.5),
      vy:rand(-0.5,-1.8),vx:rand(-0.3,0.3),alpha:rand(0.5,0.9),age:0,
      life:rand(120,260),color:goldColors[Math.floor(Math.random()*goldColors.length)]});
  }
  let t=0;
  function draw(){
    ctx.clearRect(0,0,W,H); t++;
    stars.forEach(s=>{
      const a=0.15+0.75*((1+Math.sin(s.phase+t*0.01*s.speed))/2);
      const fade=Math.max(0,1-s.y/H/0.48);
      ctx.save(); ctx.globalAlpha=a*fade*0.9; ctx.fillStyle='#fff';
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill(); ctx.restore();
    });
    clouds.forEach(c=>{
      c.x+=c.speed; if(c.x>1.4) c.x=-0.35;
      drawCloud(c.x*W,c.y*H,c.w*W,c.h*H,c.alpha);
    });
    birds.forEach((b,i)=>{
      b.x+=b.speed; b.wing+=b.wingDir*b.wingSpeed;
      if(Math.abs(b.wing)>1) b.wingDir*=-1;
      drawBird(b); if(b.x>W+60) birds.splice(i,1);
    });
    particles=particles.filter(p=>p.age<p.life);
    particles.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy; p.age++;
      ctx.save(); ctx.globalAlpha=p.alpha*(1-p.age/p.life);
      ctx.fillStyle=p.color; ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); ctx.restore();
    });
    requestAnimationFrame(draw);
  }
  initStars(); initClouds(); draw();
  setInterval(spawnBird, 3800); spawnBird(); spawnBird();
  setInterval(spawnParticle, 900);
  for(let i=0;i<8;i++) spawnParticle();
  const now = new Date();
  const greetings=['Early bird','Rise & shine','New day, new light','Morning glow'];
  document.getElementById('greeting').textContent=greetings[Math.floor(Math.random()*greetings.length)];
  document.getElementById('dateStr').textContent=now.toLocaleDateString('en-US',
    {weekday:'long',month:'long',day:'numeric',year:'numeric'});
</script>
</body>
</html>`);
});

export default app;