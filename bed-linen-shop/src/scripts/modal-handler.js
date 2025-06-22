import modalData from '../data/modal-data.json';
export function modalHandler(
  openModalCallback,
  closeModalCallback,
  modalSelector,
  modalTextSelector,
  closeBtnSelector,
) {
  const modal = document.querySelector(modalSelector);
  if (!modal) return;

  const modalText = modal.querySelector(modalTextSelector);
  const closeBtn = modal.querySelector(closeBtnSelector);

  function openModal(content) {
    modalText.innerHTML = content;
    modal.classList.add('active');
    if (openModalCallback) openModalCallback();
  }

  function closeModal() {
    modal.classList.remove('active');
    if (closeModalCallback) closeModalCallback();
  }

  document
    .querySelectorAll('.sleepy-shop__link, .blog-slider__link')
    .forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();

        const lang = btn.dataset.lang;
        const id = btn.dataset.id;

        const langData = modalData[lang];
        let contentData = null;

        if (langData && Array.isArray(langData)) {
          contentData = langData.find(
            item => item.id === id || String(langData.indexOf(item)) === id,
          );
        }

        const content = contentData
          ? `<h2>${contentData.title}</h2><p>${contentData.content}</p>`
          : '<p>Sorry, content not found.</p>';

        openModal(content);
      });
    });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  window.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', e => {
    if (modal.classList.contains('active') && e.key === 'Escape') {
      closeModal();
    }
  });
}
