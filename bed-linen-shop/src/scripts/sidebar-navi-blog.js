export function sidebarNaviBlog(
  prevSlide,
  nextSlide,
  blogSliderCont,
  blogSliderPoints,
) {
  const prevButton = document.getElementById(prevSlide);
  const nextButton = document.getElementById(nextSlide);
  const slides = document.querySelectorAll(blogSliderCont);
  const points = document.querySelectorAll(blogSliderPoints);
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach(slide => (slide.style.display = 'none'));
    slides[index].style.display = 'flex';
    updatePoints(index);
  }

  function updatePoints(index) {
    points.forEach((point, i) => {
      point.src =
        i === index
          ? '/assets/blog/point-with-fill.svg'
          : '/assets/blog/without-fill.svg';
    });
  }

  function getUpdatedIndex(direction) {
    return (currentIndex + direction + slides.length) % slides.length;
  }

  function next() {
    currentIndex = getUpdatedIndex(1);
    showSlide(currentIndex);
  }

  function prev() {
    currentIndex = getUpdatedIndex(-1);
    showSlide(currentIndex);
  }

  function handleKeydown(e) {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  }

  if (nextButton) nextButton.addEventListener('click', next);
  if (prevButton) prevButton.addEventListener('click', prev);
  document.addEventListener('keydown', handleKeydown);

  showSlide(currentIndex);
}
