const canvas = document.getElementById("networkCanvas");
if(canvas){
const ctx = canvas.getContext("2d");
let particles = [];
function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const count = Math.min(120, Math.floor(window.innerWidth / 13));
    particles = Array.from({length: count}, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.38,
        vy: (Math.random() - 0.5) * 0.38,
        r: Math.random() * 1.8 + 1
    }));
}
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if(p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if(p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = "rgba(0,217,255,.8)"; ctx.fill();
    });
    for(let i=0;i<particles.length;i++){
        for(let j=i+1;j<particles.length;j++){
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if(dist < 145){
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(0,160,255,${1 - dist / 145})`;
                ctx.lineWidth = .7; ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas(); animate();
}
const loadButton = document.getElementById("loadVideo");
if(loadButton){
    loadButton.addEventListener("click", () => {
        const link = document.getElementById("videoLink").value.trim();
        let videoId = "";
        if(link.includes("youtube.com/watch?v=")) videoId = link.split("v=")[1].split("&")[0];
        else if(link.includes("youtu.be/")) videoId = link.split("youtu.be/")[1].split("?")[0];
        else { alert("Only approved media links are supported in this demo."); return; }
        document.getElementById("videoBox").innerHTML =
        `<iframe width="760" height="428" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
    });
}
