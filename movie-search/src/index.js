import './sass/style.scss';
import '../node_modules/swiper/css/swiper.css';
import Slide from './js/components/Slide/Slide';
import Form from './js/components/Form/Form';
import Keys from './js/components/Keyboard/Keys';

const slide = new Slide();
window.addEventListener('load', async () => {
  await slide.startRequest();
  slide.toSearch();
  slide.getNextPage();
});

Form.clearForm();
const form = new Form();
form.openKeyboard();

Keys.getKeysEvents();
