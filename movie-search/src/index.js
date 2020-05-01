import './sass/style.scss';
import Swiper from 'swiper';
import '../node_modules/swiper/css/swiper.css';
import Slide from './js/components/Slide/Slide';
import Form from './js/components/Form/Form';

const mySwiper = new Swiper('.swiper-container', {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const slide = new Slide();
slide.startRequest();
slide.toSearch();

const form = new Form();
form.clearForm()
