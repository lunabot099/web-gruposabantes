document.addEventListener('DOMContentLoaded',()=>{
  const nav=document.querySelector('.nav');
  const btn=document.querySelector('.menuToggle');
  const menu=document.querySelector('.menu');
  if(!btn||!menu)return;
  btn.addEventListener('click',()=>{
    const open=nav.classList.toggle('menuOpen');
    btn.setAttribute('aria-expanded',open?'true':'false');
  });
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    nav.classList.remove('menuOpen');
    btn.setAttribute('aria-expanded','false');
  }));
});
