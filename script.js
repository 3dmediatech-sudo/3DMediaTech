const canvas = document.getElementById("networkCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let particles = [];
  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    particles = [];
    const count = Math.min(130, Math.floor(innerWidth / 11));
    for (let i = 0; i < count; i++) {
      particles.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, vx:(Math.random()-.5)*.38, vy:(Math.random()-.5)*.38, s:Math.random()*2+0.7 });
    }
  }
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.s,0,Math.PI*2);
      ctx.fillStyle = "rgba(0,213,255,.78)"; ctx.fill();
    });
    for (let i=0;i<particles.length;i++) for (let j=i+1;j<particles.length;j++) {
      const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y, d=Math.sqrt(dx*dx+dy*dy);
      if (d < 145) { ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y); ctx.strokeStyle=`rgba(0,213,255,${(1-d/145)*.8})`; ctx.lineWidth=.8; ctx.stroke(); }
    }
    requestAnimationFrame(draw);
  }
  addEventListener("resize", resize); resize(); draw();
}

const nav = document.querySelector('.navbar');
document.querySelector('.menu-toggle')?.addEventListener('click', () => nav.classList.toggle('open'));

const glow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', e => { if (glow) { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; }});

document.querySelectorAll('.card,.stat-card,.contact-box,.demo-panel,.timeline-item').forEach(el=>{
  el.addEventListener('mousemove', e=>{
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', ((e.clientX-r.left)/r.width*100)+'%');
    el.style.setProperty('--my', ((e.clientY-r.top)/r.height*100)+'%');
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      const num = entry.target.querySelector('[data-count]');
      if (num && !num.dataset.done) {
        num.dataset.done = 'true';
        const target = parseInt(num.dataset.count,10); let current = 0;
        const step = Math.max(1, Math.ceil(target/45));
        const timer = setInterval(()=>{ current += step; if(current >= target){current=target; clearInterval(timer)} num.textContent = current + (target === 100 ? '%' : target === 24 ? '/7' : 'D'); }, 28);
      }
    }
  });
},{threshold:.15});
document.querySelectorAll('.reveal,.stat-card').forEach(el=>observer.observe(el));

const loadButton = document.getElementById("loadVideo");
if (loadButton) {
  loadButton.addEventListener("click", function(){
    const input = document.getElementById("videoLink");
    const box = document.getElementById("videoBox");
    const link = input.value.trim();
    let videoId = "";
    if (link.includes("youtube.com/watch?v=")) videoId = link.split("v=")[1].split("&")[0];
    else if (link.includes("youtu.be/")) videoId = link.split("youtu.be/")[1].split("?")[0];
    else { box.innerHTML = '<div class="empty-player"><div class="play-circle">!</div><p>Only approved YouTube media links are supported in this demo.</p></div>'; return; }
    box.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  });
}
