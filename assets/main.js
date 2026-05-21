document.addEventListener('DOMContentLoaded',()=>{
  if(new URLSearchParams(window.location.search).get('error')==='1') document.body.classList.add('error-contact');
  const nav=document.querySelector('.nav');
  const btn=document.querySelector('.menuToggle');
  const menu=document.querySelector('.menu');
  if(btn&&menu){
    btn.addEventListener('click',()=>{
      const open=nav.classList.toggle('menuOpen');
      btn.setAttribute('aria-expanded',open?'true':'false');
    });
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      nav.classList.remove('menuOpen');
      btn.setAttribute('aria-expanded','false');
    }));
  }

  document.querySelectorAll('[data-lottie]').forEach((lottieEl)=>{
    if(!window.lottie || lottieEl.dataset.lottieLoaded==='true') return;
    const fallback=lottieEl.querySelector('img');
    window.lottie.loadAnimation({
      container:lottieEl,
      renderer:'svg',
      loop:true,
      autoplay:true,
      path:lottieEl.dataset.lottie
    });
    if(fallback) fallback.remove();
    lottieEl.classList.add('isLottieLoaded');
    lottieEl.dataset.lottieLoaded='true';
  });
});
