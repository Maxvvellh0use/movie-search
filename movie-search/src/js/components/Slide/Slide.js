import Swiper from '../Swiper/Swiper';
import '../../../../node_modules/swiper/css/swiper.css';

import {
  SWIPER, SEARCH_FORM, INPUT_SEARCH, SWIPER_SECTION, ERROR_MESSAGE, startRequest, CSS_LOADER,
} from '../../constants/constants';

export default class Slide {
  constructor() {
    this.slides = SWIPER.querySelectorAll('.swiper-slide');
    this.notificationTranslation = document.getElementById('notificationTranslation');
    this.class = Slide;
    this.inputValue = startRequest;
    this.pageIndex = 1;
  }

  toSearch() {
    INPUT_SEARCH.addEventListener('change', () => {
      this.inputValue = INPUT_SEARCH.value;
    });
    SEARCH_FORM.addEventListener('submit', async (event) => {
      this.slides.forEach((slide) => {
        slide.innerHTML = '';
      });
      event.preventDefault();
      await this.getMovies();
    });
  }

  async startRequest() {
    const url = 'https://www.omdbapi.com/?s=dream&apikey=9b67fc54';
    const startFetch = await fetch(url).catch(() => this.class.isError('Исчерпан лимит запросов!'));
    const data = await startFetch.json();
    CSS_LOADER.classList.add('hidden');
    this.createPage();
    Swiper.update();
    await this.getContent(data);
  }

  async getMovies() {
    let urlMovies = '';
    if (!/(^[А-я0-9\s]+)(?!.*[A-z])$|(^[A-z0-9\s]+)(?!.*[А-я])$/.test(this.inputValue)) {
      this.class.isError(`No results for ${this.inputValue}`);
    }
    if (!/^[a-z\s]+$/i.test(this.inputValue)) {
      const translateResult = await this.getTranslate().catch(() => this.class.isError(`No results for ${this.inputValue}`));
      urlMovies = `https://www.omdbapi.com/?s=${translateResult.text[0]}&page=${this.pageIndex}&apikey=9b67fc54`;
    } else {
      this.notificationTranslation.innerHTML = '';
      urlMovies = `https://www.omdbapi.com/?s=${this.inputValue}&page=${this.pageIndex}&apikey=9b67fc54`;
    }
    const res = await fetch(urlMovies).catch(() => this.class.isError(`No results for ${this.inputValue}`));
    const data = await res.json();
    await this.getContent(data).catch(() => this.class.isError(`No results for ${this.inputValue}`));
  }

  async getTranslate() {
    const urlTranslate = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200322T155651Z.de98a60e6a99185e.089aea4237b51c6db082c966f27a7895cd1e8b44&text=${this.inputValue}&lang=ru-en`;
    const translating = await fetch(urlTranslate).catch(() => this.class.isError('Исчерпан лимит запросов!'));
    const translateResult = await translating.json();
    this.showTranslateNotification(translateResult);
    return translateResult;
  }

  async getContent(data) {
    const slidesPage = SWIPER.querySelectorAll(`div[data-page-index='${this.pageIndex}']`);
    async function appendContent(slide) {
      slide.innerHTML = '';
      slide.insertAdjacentHTML('afterbegin', `<div class="cssload-container">
                                                            <div class="cssload-speeding-wheel"></div>
                                                         </div>`);
      const { slideIndex } = slide.dataset;
      const urlRating = `https://www.omdbapi.com/?i=${data.Search[slideIndex].imdbID}&apikey=9b67fc54`;
      const resRating = await fetch(urlRating).catch(() => this.class.isError('Исчерпан лимит запросов!'));
      const rating = await resRating.json();
      slide.innerHTML = '';
      slide.insertAdjacentHTML('afterbegin', `<div class="slide__title"><a class="slide__title_link" href="https://www.imdb.com/title/${data.Search[slideIndex].imdbID}/videogallery/?ref_=tt_pv_vi_sm">${data.Search[slideIndex].Title}</a></div>`);
      slide.insertAdjacentHTML('beforeend', `<div class ="slide__poster"><img class="slide__poster_img" src="${data.Search[slideIndex].Poster}"></div>`);
      slide.insertAdjacentHTML('beforeend', `<div class="slide__year">${data.Search[slideIndex].Year}</div>`);
      slide.insertAdjacentHTML('beforeend', `<div class="slide__rating">${rating.imdbRating}</div>`);
    }
    await appendContent().catch(() => this.class.isError('Превышен лимит запросов!'));
    slidesPage.forEach((slide) => appendContent(slide).catch(() => this.class.isError('Превышен лимит запросов!')));
  }

  // static preload(slide) {
  //   slide.innerHTML = '';
  //   slide.insertAdjacentHTML('afterbegin', `<div class="cssload-container">
  //                                                           <div class="cssload-speeding-wheel"></div>
  //                                                        </div>`);
  // }

  static isError(textError) {
    SWIPER_SECTION.classList.add('hidden');
    ERROR_MESSAGE.innerHTML = '';
    ERROR_MESSAGE.classList.remove('hidden');
    ERROR_MESSAGE.insertAdjacentHTML('afterbegin', `<h2>Ошибка! ${textError}</h2>`);
  }

  showTranslateNotification(translateResult) {
    this.notificationTranslation.innerHTML = '';
    this.notificationTranslation.classList.remove('hidden');
    this.notificationTranslation.insertAdjacentHTML('afterbegin', `<h5>Showing results for &laquo;${translateResult.text[0]}&raquo;:</h5>`);
  }


  getNextPage() {
    Swiper.on('reachEnd', async () => {
      this.pageIndex += 1;
      await this.createPage();
      await this.getMovies();
      Swiper.update();
    });
  }


  createPage() {
    SWIPER.insertAdjacentHTML('beforeend', `
                    <div class="swiper-slide" data-page-index="${this.pageIndex}" data-slide-index="0"></div>
                    <div class="swiper-slide" data-page-index="${this.pageIndex}" data-slide-index="1"></div>
                    <div class="swiper-slide" data-page-index="${this.pageIndex}" data-slide-index="2"></div>
                    <div class="swiper-slide" data-page-index="${this.pageIndex}" data-slide-index="3"></div>
                    <div class="swiper-slide" data-page-index="${this.pageIndex}" data-slide-index="4"></div>
                    <div class="swiper-slide" data-page-index="${this.pageIndex}" data-slide-index="5"></div>
                    <div class="swiper-slide" data-page-index="${this.pageIndex}" data-slide-index="6"></div>
                    <div class="swiper-slide" data-page-index="${this.pageIndex}" data-slide-index="7"></div>
                    <div class="swiper-slide" data-page-index="${this.pageIndex}" data-slide-index="8"></div>
                    <div class="swiper-slide" data-page-index="${this.pageIndex}" data-slide-index="9"></div>`);
  }
}
