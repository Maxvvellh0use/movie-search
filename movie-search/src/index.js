import './sass/style.scss';
import Swiper from 'swiper';
// import '../node_modules/swiper/css/swiper.css';

const mySwiper = new Swiper ('.swiper-container', {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
})