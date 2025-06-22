export function languageSwitcher() {
  document
    .getElementById('page-select')
    .addEventListener('change', function () {
      const selectedPage = this.value;
      if (selectedPage !== '#') {
        window.location.href = selectedPage;
      }
    });
}
