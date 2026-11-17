

    // Mobile navigation

    const menuButton = document.querySelector(".menu-button");

    const navLinks = document.querySelector(".nav-links");



    menuButton.addEventListener("click", () => {

      const isOpen = navLinks.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", isOpen);

      menuButton.textContent = isOpen ? "×" : "☰";

    });



    navLinks.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuButton.setAttribute("aria-expanded", "false");

        menuButton.textContent = "☰";

      });

    });



    // Reveal sections as they enter the viewport

    const revealObserver = new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            revealObserver.unobserve(entry.target);

          }

        });

      },

      { threshold: 0.12 }

    );



    document.querySelectorAll(".reveal").forEach((element) => {

      revealObserver.observe(element);

    });



    // Keep the copyright year current

    document.getElementById("year").textContent = new Date().getFullYear();

  

// Interactive portrait: a subtle tilt toward the pointer, no animation libraries.
const portrait = document.querySelector('[data-tilt]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (portrait && window.matchMedia('(pointer:fine)').matches && !reducedMotion.matches) {
  portrait.addEventListener('pointermove', (event) => {
    const rect = portrait.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    portrait.style.setProperty('--rx', `${(-y * 5).toFixed(2)}deg`);
    portrait.style.setProperty('--ry', `${(x * 5).toFixed(2)}deg`);
    portrait.style.setProperty('--mx', `${((x+.5)*100).toFixed(0)}%`);
    portrait.style.setProperty('--my', `${((y+.5)*100).toFixed(0)}%`);
  });
  portrait.addEventListener('pointerleave', () => {
    portrait.style.setProperty('--rx','0deg'); portrait.style.setProperty('--ry','0deg');
  });
}
// Highlight the dock icon for the section currently on screen.
const dockItems = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const sections = dockItems.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window) {
  const dockObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        dockItems.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#'+entry.target.id));
      }
    });
  }, { rootMargin: '-35% 0px -45% 0px' });
  sections.forEach(s => dockObserver.observe(s));
}

// Full-screen photography viewer
(()=>{const box=document.getElementById('photo-lightbox');if(!box)return;const image=box.querySelector('img');const close=()=>{box.classList.remove('is-open');box.setAttribute('aria-hidden','true');image.removeAttribute('src');document.body.style.overflow='';};document.querySelectorAll('[data-lightbox="photography"]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();image.src=link.getAttribute('href');image.alt=link.querySelector('img')?.alt||'Photograph';box.classList.add('is-open');box.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}));box.querySelector('button').addEventListener('click',close);box.addEventListener('click',event=>{if(event.target===box)close()});document.addEventListener('keydown',event=>{if(event.key==='Escape')close()});})();

// Contact form opens a pre-filled email; no backend or account needed.
document.getElementById('contact-form')?.addEventListener('submit',function(event){event.preventDefault();if(!this.reportValidity())return;const data=new FormData(this);const subject=String(data.get('subject')||'Portfolio inquiry');const body=`Hello Sadia,\n\n${data.get('message')}\n\nFrom: ${data.get('name')}\nReply to: ${data.get('email')}`;window.location.href='mailto:islamsadia5747@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);});

// About video: start from the custom cover, restore it when replay is needed.
(()=>{const video=document.getElementById('aboutIntroVideo');const cover=document.getElementById('aboutVideoPlay');if(!video||!cover)return;
cover.addEventListener('click',()=>{video.play().then(()=>{cover.hidden=true;}).catch(()=>{cover.hidden=false;});});
video.addEventListener('play',()=>{cover.hidden=true;});
video.addEventListener('ended',()=>{video.currentTime=0;cover.hidden=false;});
})();
