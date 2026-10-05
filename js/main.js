/* Imports ----------- */
gsap.registerPlugin(ScrollTrigger,Observer,ScrollToPlugin,Draggable,MotionPathPlugin);

/* Effet de Hover sur le Hero
const el = document.querySelector('#reveal');
const color = el.querySelector('.reveal_color');
const RADIUS = 180;

const pos = { x: innerWidth / 2, y: innerHeight / 2, r: 0 };

const setX = gsap.quickTo(pos, 'x', { duration: 0.4, ease: 'power3.out' });
const setY = gsap.quickTo(pos, 'y', { duration: 0.4, ease: 'power3.out' });

// on écrit les variables CSS avec les unités à chaque frame
gsap.ticker.add(() => {
  color.style.setProperty('--x', pos.x + 'px');
  color.style.setProperty('--y', pos.y + 'px');
  color.style.setProperty('--r', pos.r + 'px');
});

el.addEventListener('pointermove', (e) => {
  const b = el.getBoundingClientRect();
  setX(e.clientX - b.left);
  setY(e.clientY - b.top);
});
el.addEventListener('pointerenter', () =>
  gsap.to(pos, { r: RADIUS, duration: 0.5, ease: 'power3.out' })
);
el.addEventListener('pointerleave', () =>
  gsap.to(pos, { r: 0, duration: 0.5, ease: 'power3.out' })
);


window.addEventListener('pointermove', (e) => {
  const b = el.getBoundingClientRect();
  setX(e.clientX - b.left);
  setY(e.clientY - b.top);
});

// le spot apparaît quand la souris entre dans la zone
window.addEventListener('pointermove', (e) => {
  const b = el.getBoundingClientRect();
  const inside = e.clientX >= b.left && e.clientX <= b.right &&
                 e.clientY >= b.top  && e.clientY <= b.bottom;
  gsap.to(pos, { r: inside ? RADIUS : 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
});

// souris qui quitte la fenêtre
document.documentElement.addEventListener('pointerleave', () =>
  gsap.to(pos, { r: 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' })
);

*/

/* ==========================================================================
   2. Scroll de page ne page
========================================================================== */
// Fade-in à l'arrivée sur n'importe quelle page
gsap.from("body", { opacity: 0, duration: 0.5, ease: "power2.out" });

// Animation de sortie au clic sur les liens internes
document.querySelectorAll('a[href^="projets.html"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // Empêche le saut immédiat
    const destination = link.getAttribute('href');

    gsap.to("body", {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        window.location.href = destination; // Redirige une fois l'animation finie
      }
    });
  });
});

/* ==========================================================================
   3. Page à propos - Animation
========================================================================== */
// Source Gémini
const tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: '#sectionPres',
        strat: 'top top',
        end: "+=800", // distance de scroll nécessaire pour finir la transition
        pin: true,
        scrub: 1,
    }
});

tl2
//On fait disparaitre le block déjà présent
    .to('#boxText', {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power1.inOut" //Cette ligne définit la courbe d'accélération (l'atténuation) de ton animation dans GSAP.
        //power1 c'est le niveau de l'accelération de l'annimation et inout c'est comment est le moment
    })

//On fait appraitre le bloc compétence
    .fromTo('#boxCompetences',{
        opacity: 0, 
        y: 50
    },
    {
        opacity: 1, 
        y: -140, 
        duration: 1,
        ease: "power1.inOut",
        onStart: () => { document.querySelector('#boxCompetences').style.pointerEvents = 'all'; }
    },
    0.5) // Chevauchement léger pour une transition plus fluide

    // 3. (Optionnel) Effet d'apparition en cascade sur les carrés de compétences
    .from("#boxCompetences .card", {
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5
    }, 0.5);