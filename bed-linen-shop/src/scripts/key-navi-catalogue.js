export function keyNaviCatalogue(inputsSelector) {
  const inputs = document.querySelectorAll(inputsSelector);
  let currentSlideIdx = Array.from(inputs).findIndex(slide => slide.checked);

  function updateSlide(index) {
    if (index >= 0 && index < inputs.length) {
      inputs[index].checked = true;
      currentSlideIdx = index;
    }
  }

  document.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') {
      const nextSlide = (currentSlideIdx + 1) % inputs.length;
      updateSlide(nextSlide);
    } else if (event.key === 'ArrowLeft') {
      const prevSlide = (currentSlideIdx - 1 + inputs.length) % inputs.length;
      updateSlide(prevSlide);
    }
  });
}
