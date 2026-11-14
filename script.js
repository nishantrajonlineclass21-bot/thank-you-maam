(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const behavior=reduce?'auto':'smooth';
document.documentElement.classList.add('js');
const main=$('#main'),hero=$('#hero');

// reveal on scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
const watch=()=>$$('.rv:not(.in)').forEach(el=>io.observe(el));

// open surprise
$('#open').onclick=()=>{
  main.hidden=false;watch();$('#music').hidden=!audioOK;
  if(audioOK&&!on)toggleMusic();
  requestAnimationFrame(()=>$('#appreciation').scrollIntoView({behavior}));
};

// journey
const stops=$$('.stop'),caption=$('#caption'),fill=$('#fill');
const texts=["Home. The day starts early.","Auto: leg one.","Metro: leg two.","Bus: the final stretch.","ITI at last… and then, Ma’am’s scolding for being late 😂"];
let cur=0,timer;
const setStop=i=>{cur=i;stops.forEach((s,k)=>s.classList.toggle('on',k===i));fill.style.width=(i/4*100)+'%';caption.textContent=texts[i]};
stops.forEach((s,i)=>s.onclick=()=>{clearInterval(timer);setStop(i)});
$('#go').onclick=()=>{clearInterval(timer);setStop(0);timer=setInterval(()=>{if(cur<4)setStop(cur+1);else clearInterval(timer)},reduce?900:1300)};

// letter
$('#openLetter').onclick=e=>{
  const env=$('#env');env.classList.toggle('open');
  e.target.textContent=env.classList.contains('open')?'Close the Letter':'Open Your Letter ❤️';
  if(env.classList.contains('open'))setTimeout(()=>env.scrollIntoView({behavior,block:'center'}),400);
};

// hearts
const hb=$('#hearts');
if(!reduce)for(let i=0;i<14;i++){const h=document.createElement('span');h.textContent='❤';
  h.style.cssText=`left:${Math.random()*96}%;font-size:${12+Math.random()*16}px;animation-duration:${9+Math.random()*8}s;animation-delay:${Math.random()*10}s`;hb.append(h)}

// replay
$('#replay').onclick=()=>{
  scrollTo({top:0,behavior});
  setTimeout(()=>{main.hidden=true;$('#env').classList.remove('open');$('#openLetter').textContent='Open Your Letter ❤️';
    setStop(0);clearInterval(timer);$$('.rv').forEach(e=>{e.classList.remove('in')});$('#music').hidden=true;
    if(on)toggleMusic()},reduce?0:700);
};

// music (optional: assets/music.mp3; button hidden if file missing)
const audio=new Audio('assets/music.mp3');audio.loop=true;audio.preload='none';audio.volume=.5;
let audioOK=true,on=false;const mb=$('#music');
audio.addEventListener('error',()=>{audioOK=false;mb.hidden=true});
function toggleMusic(){on=!on;mb.setAttribute('aria-pressed',on);mb.textContent=on?'♪ Music on':'♪ Music off';on?audio.play().catch(()=>{on=false;mb.textContent='♪ Music off'}):audio.pause()}
mb.onclick=toggleMusic;
})();
