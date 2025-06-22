export function sidebarNaviCatalogue(
  sideBarItem,
  catalogueSliderContent,
  arrowDown,
) {
  const sidebarItems = document.querySelectorAll(sideBarItem);
  const windows = document.querySelectorAll(catalogueSliderContent);
  let currentIndex = 0;
  windows.forEach((win, index) => {
    win.style.display = index === currentIndex ? 'block' : 'none';
  });

  sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetWindowId = item.getAttribute('data-window');
      const targetWindow = document.getElementById(targetWindowId);

      if (targetWindow) {
        windows.forEach(win => (win.style.display = 'none'));

        currentIndex = Array.from(windows).indexOf(targetWindow);
        targetWindow.style.display = 'block';
      }
    });
  });

  const navArrow = document.querySelector(arrowDown);
  if (navArrow) {
    navArrow.addEventListener('click', () => {
      windows[currentIndex].style.display = 'none';

      currentIndex = currentIndex % windows.length;

      windows[currentIndex].style.display = 'block';
    });
  }
}
