import Swiper from 'swiper';

export default new Swiper('.swiper-container', {
  slidesPerView: 3,
  spaceBetween: 30,
  preloadImages: true,
  lazy: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 15,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    50: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 10,
    },

    960: {
      slidesPerView: 3,
      spaceBetween: 14,
    },

    1200: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
  },
});
