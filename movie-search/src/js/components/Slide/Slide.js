import { SWIPER, SEARCH_FORM, INPUT_SEARCH } from '../../constants/constants';

export default class Slide {
  constructor() {
    this.slides = SWIPER.querySelectorAll('.swiper-slide');
    this.slidesTitles = SWIPER.querySelectorAll('.slide__header');
    this.inputValue = '';
  }

  toSearch() {
    INPUT_SEARCH.addEventListener('change', () => {
      this.inputValue = INPUT_SEARCH.value;
    });
    SEARCH_FORM.addEventListener('submit', (event) => {
      event.preventDefault();
      this.getMovies();
    });
  }


  async getMovies() {
    const url = `https://www.omdbapi.com/?s=${this.inputValue}&apikey=9b67fc54`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(this.inputValue);
    // console.log(data.Search[0].Title);
    this.getTitle(data);
    // this.slidesTitles.forEach((title) => {
    //   if (title.dataset.titleIndex === '0') {
    //     title.innerHTML = data.Search[0].Title;
    //   }
    // });
    // data.Search[0].Title);
  }

  async getTitle(data) {
    this.slides.forEach((slide, index) => {
      slide.innerHTML = '';
      // slide.insertAdjacentHTML('afterbegin', `<a class="slide__header">${data.Search[index].Title}</a>`);
      // slide.insertAdjacentHTML('beforeend', `<img class="slide__poster" src="${data.Search[index].Poster}">`);
      // slide.insertAdjacentHTML('beforeend', `<div class="slide__year">${data.Search[index].Year}</div>`);
      slide.insertAdjacentHTML('afterbegin', `<div class="slide__title"><a class="slide__title_link" href="#">feefef</a></div>`);
      slide.insertAdjacentHTML('beforeend', `<div class ="slide__poster"><img class="slide__poster_img" src="https://sun9-7.userapi.com/c857732/v857732544/13dbc5/ldsw21Z1SYQ.jpg"></div>`);
      slide.insertAdjacentHTML('beforeend', `<div class="slide__year">1998</div>`);
    });

    // const url = 'https://www.omdbapi.com/?s=dream&page=1&apikey=9b67fc54';
    //
    // const res = await fetch(url);
    // const data = await res.json();
    // console.log(data.Search[0].Title)
    // this.slidesTitles.forEach((title) => {
    //   if (title.dataset.titleIndex === '0') {
    //     title.innerHTML = data.Search[0].Title;
    //   }
    // });
    // data.Search[0].Title);

    return data;
  }
}
