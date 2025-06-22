import { modalHandler } from './scripts/modal-handler.js';
import { parallax } from './scripts/parallax.js';
import { scroll } from './scripts/scroll.js';
import { sideBar } from './scripts/sidebar.js';
import { keyNaviCatalogue } from './scripts/key-navi-catalogue.js';
import { sidebarNaviCatalogue } from './scripts/sidebar-navi-catalogue.js';
import { sidebarNaviBlog } from './scripts/sidebar-navi-blog.js';
import { languageSwitcher } from './scripts/language-switcher.js';
import { sendContactForm } from './scripts/email-handler.js';
import './components/mainFooter.js';
import './components/mainHeader.js';
import '../src/main.scss';

modalHandler(null, null, '.modal', '.modal-text', '.close-btn');

parallax('.hero__img', '.hero__content', '.hero__background');

scroll('.animate-on-scroll');

sideBar(
  '.catalogue__slider-sidebar-item .sidebar-item:not(.arrow-down)',
  '#arrow',
);

keyNaviCatalogue('input[type="radio"][name="slider"]');

sidebarNaviCatalogue(
  '.sidebar-item',
  '.catalogue__slider-content',
  '.arrow-down',
);

sidebarNaviBlog(
  'prev-slide',
  'next-slide',
  '.blog-slider__content',
  '.blog-slider__points .blog-slider__item',
);

languageSwitcher();
sendContactForm();

document.addEventListener('DOMContentLoaded', () => {
  const profileLink = document.getElementById('profileLink');
  const userId = localStorage.getItem('userId');

  if (profileLink) {
    profileLink.href = userId
      ? `/src/pages/profile.html?id=${userId}`
      : '/src/pages/login.html';
  }
});
