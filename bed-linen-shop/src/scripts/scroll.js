export function scroll(elementsSelector) {
  const elements = document.querySelectorAll(elementsSelector);
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle('start-animation', entry.isIntersecting);
      });
    },
    { threshold: 0.5 },
  );

  elements.forEach(el => observer.observe(el));
}
