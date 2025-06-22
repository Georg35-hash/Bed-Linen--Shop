import { createHeader } from './header';
import { openBurgerMenu } from '../scripts/open-burger-menu';
import '../mainHeader.scss';
document.body.prepend(createHeader());
openBurgerMenu('openButton', 'navMenu');
