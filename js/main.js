/* Imports ----------- */
gsap.registerPlugin(ScrollTrigger,Observer,ScrollToPlugin,Draggable,MotionPathPlugin);

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