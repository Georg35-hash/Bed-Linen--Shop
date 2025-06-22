export function sideBar(sideBarSelectors, arrowSelector) {
  const sidebarItems = document.querySelectorAll(sideBarSelectors);
  const arrow = document.querySelector(arrowSelector);

  setDefaultActiveItem(sidebarItems);
  addSidebarClickListeners(sidebarItems);
  if (arrow) {
    addArrowClickListener(arrow, sidebarItems);
  }

  function setDefaultActiveItem(sidebarItems) {
    if (sidebarItems.length > 0) {
      sidebarItems[0].classList.add('active');
    }
  }

  function addSidebarClickListeners(sidebarItems) {
    sidebarItems.forEach(item => {
      item.addEventListener('click', function () {
        updateActiveItem(sidebarItems, this);
      });
    });
  }

  function updateActiveItem(sidebarItems, activeItem) {
    sidebarItems.forEach(el => el.classList.remove('active'));
    activeItem.classList.add('active');
  }

  function addArrowClickListener(arrow, sidebarItems) {
    arrow.addEventListener('click', function () {
      navigateToNextItem(sidebarItems);
    });
  }

  function navigateToNextItem(sidebarItems) {
    let currentActiveIndex = getActiveItemIndex(sidebarItems);

    if (currentActiveIndex === -1) {
      currentActiveIndex = 0;
    }

    sidebarItems[currentActiveIndex].classList.remove('active');
    let nextIndex = (currentActiveIndex + 1) % sidebarItems.length;
    sidebarItems[nextIndex].click();
  }

  function getActiveItemIndex(sidebarItems) {
    return [...sidebarItems].findIndex(item =>
      item.classList.contains('active'),
    );
  }
}
