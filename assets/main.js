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

  const heroLottie=document.querySelector('[data-lottie]');
  if(heroLottie&&window.lottie){
    const fallback=heroLottie.querySelector('img');
    window.lottie.loadAnimation({
      container:heroLottie,
      renderer:'svg',
      loop:true,
      autoplay:true,
      path:heroLottie.dataset.lottie
    });
    if(fallback) fallback.remove();
    heroLottie.classList.add('isLottieLoaded');
  }
});
