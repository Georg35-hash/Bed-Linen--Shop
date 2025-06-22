export function openBurgerMenu(openButtonId, navMenuId) {
  const openButton = document.getElementById(openButtonId);
  const navMenu = document.getElementById(navMenuId);

  function toggleMenu() {
    navMenu.classList.toggle('active');
    openButton.classList.toggle('active');
  }

  function closeMenu(event) {
    if (!navMenu.contains(event.target) && !openButton.contains(event.target)) {
      navMenu.classList.remove('active');
      openButton.classList.remove('active');
    }
  }

  openButton.addEventListener('click', toggleMenu);

  document.addEventListener('click', closeMenu);
}
