export function parallax(heroImage, heroContent, heroBg) {
  const hero = document.querySelector(heroContent);
  const img = document.querySelector(heroImage);
  const bg = document.querySelector(heroBg);

  if (!hero || !img || !bg) return;

  const br = bg.offsetWidth / 2;

  img.style.transition = 'transform 0.5s ease-out';
  bg.style.transition = 'transform 0.5s ease-out';

  function applyTransform(x, y) {
    img.style.transform = `translate(${x / 4}px, ${y / 4}px)`;
    bg.style.transform = `translate(${x / 2}px, ${y / 2}px)`;
  }

  hero.addEventListener('mousemove', event => {
    const x = (br - event.clientX) / 10;
    const y = -event.clientY / 10;
    applyTransform(x, y);
  });

  hero.addEventListener('mouseleave', () => applyTransform(0, 0));
}
