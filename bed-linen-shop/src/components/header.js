export function createHeader() {
  const header = document.createElement('header');
  header.innerHTML = `
    <nav class="header__nav">
      <ul class="header__menu">
        <li class="header__menu-item">
          <a class="header__menu-link" href="homeEN.html"> Home </a>
          <img class="header__menu-icon" src="/assets/header/game-icons_feather.svg" alt="feather" />
        </li>
        <li class="header__menu-item"><a class="header__menu-link" href="#about">About</a></li>
        <li class="header__menu-item"><a class="header__menu-link" href="cart.html">Payment</a></li>
        <li class="header__menu-item"><a class="header__menu-link" href="#catalogue">Catalog</a></li>
        <li class="header__menu-item"><a class="header__menu-link" href="shop.html">Shop</a></li>
        <li class="header__menu-item"><a class="header__menu-link" href="#blog">Blog</a></li>
      </ul>
    </nav>

    <div class="header__icons">
      <ul class="header__icons-list">
        <li class="header__icons-item">
          <a class="header__icons-link" href="cart.html">
            <img class="header__icon" src="/assets/header/shopping.svg" alt="shopping" />
          </a>
        </li>
        <li id="profile" class="header__icons-item">
          <a id="profileLink">
            <img class="header__icon" src="/assets/header/profile.svg" alt="profile" />
          </a>
        </li>
        <li class="header__icons-item">
          <label for="page-select" class="header__icons-link" style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
            <img class="header__icon" src="/assets/header/internet.svg" alt="internet" />
          </label>
        </li>
      </ul>
    </div>

    <div class="header__mobile">
      <div class="header__mobile-burger">
        <button id="openButton" class="burger-menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div class="header__icons-mobile">
        <ul class="header__icons-list-mobile">
          <li class="header__icons-item-mobile">
            <a href="cart.html">
              <img src="/assets/header/shopping.svg" alt="shopping" />
            </a>
          </li>
          <li class="header__icons-item-mobile">
            <a href="/src/pages/signup.html">
              <img src="/assets/header/profile.svg" alt="profile" />
            </a>
          </li>
          <li class="header__icons-item">
            <label for="page-select" class="header__icons-link" style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <img class="header__icon" src="/assets/header/internet.svg" alt="internet" />
              <select id="page-select">
                <option value="#">Мова / Language</option>
                <option value="#">EN</option>
                <option value="indexUA.html">UA</option>
              </select>
            </label>
          </li>
        </ul>
      </div>

      <nav id="navMenu" class="nav-menu">
        <ul class="nav-menu__list">
          <li class="nav-menu__item">
            <a class="nav-menu__link" href="#home"> Home </a>
            <img class="nav-menu__icon" src="/assets/header/game-icons_feather.svg" alt="feather" />
          </li>
          <li class="nav-menu__item"><a class="nav-menu__link" href="#about">About</a></li>
          <li class="nav-menu__item"><a class="nav-menu__link" href="#">Payment</a></li>
          <li class="nav-menu__item"><a class="nav-menu__link" href="#catalogue">Catalog</a></li>
          <li class="nav-menu__item"><a class="nav-menu__link" href="#offer">Shop</a></li>
          <li class="nav-menu__item"><a class="nav-menu__link" href="#blog">Blog</a></li>
        </ul>
      </nav>
    </div>
  `;
  return header;
}
