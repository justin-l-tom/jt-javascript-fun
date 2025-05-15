import modalView from './views/modalView.js';
import scrollToView from './views/scrollToView.js';
import tabView from './views/tabView.js';
import navView from './views/navView.js';
import revealView from './views/revealView.js';
import imageView from './views/imageView.js';
import sliderView from './views/sliderView.js';

const init = function() {
  modalView.init();
  scrollToView.init();
  tabView.init();
  navView.init();
  // revealView.init();
  imageView.init();
  sliderView.init();
};

init();