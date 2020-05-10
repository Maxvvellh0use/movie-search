import Swiper from '../Swiper/Swiper';
import '../../../../node_modules/swiper/css/swiper.css';

import {
  SWIPER, SEARCH_FORM, INPUT_SEARCH, SWIPER_SECTION, ERROR_MESSAGE, startRequest,
  MORE_INFORMATION_POPUP, BLACKOUT,
} from '../../constants/constants';


export default class Slide {
  constructor() {
    this.slides = SWIPER.querySelectorAll('.swiper-slide');
    this.notificationTranslation = document.getElementById('notificationTranslation');
    this.mainPagePreloadCss = document.getElementById('cssload_main-page');
    this.searchPreloadCss = document.getElementById('search_preload');
    this.class = Slide;
    this.inputValue = startRequest;
    this.pageIndex = 1;
  }

  eventsForBlackoutBackground() {
    BLACKOUT.addEventListener('click', () => {
      this.class.closeMoreInformationPopup();
      this.class.closeKeyboard();
    });
  }

  toSearch() {
    INPUT_SEARCH.addEventListener('change', () => {
      this.inputValue = INPUT_SEARCH.value.trim();
    });
    SEARCH_FORM.addEventListener('submit', async (event) => {
      event.preventDefault();
      await this.submitToSearch();
    });
  }

  async submitToSearch() {
    console.log('call')
    this.inputValue = INPUT_SEARCH.value.trim();
    Swiper.slideTo(0, 1, false);
    ERROR_MESSAGE.classList.add('hidden');
    SWIPER_SECTION.classList.remove('hidden');
    this.mainPagePreloadCss.classList.remove('hidden');
    this.searchPreloadCss.classList.remove('hidden');
    SWIPER.innerHTML = '';
    await this.createPage();
    await this.getMovies();
    this.pageIndex = 1;
    this.searchPreloadCss.classList.add('hidden');
  }

  async startRequest() {
    const url = `https://www.omdbapi.com/?s=${startRequest}&page=${this.pageIndex}&apikey=7185f30c`;
    const startFetch = await fetch(url).catch(() => this.class.isError('Исчерпан лимит запросов!'));
    const data = await startFetch.json();
    this.mainPagePreloadCss.classList.add('hidden');
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
      urlMovies = `https://www.omdbapi.com/?s=${translateResult.text[0]}&page=${this.pageIndex}&apikey=7185f30c`;
    } else {
      this.notificationTranslation.innerHTML = '';
      urlMovies = `https://www.omdbapi.com/?s=${this.inputValue}&page=${this.pageIndex}&apikey=7185f30c`;
    }
    const res = await fetch(urlMovies).catch(() => this.class.isError(`No results for ${this.inputValue}`));
    const data = await res.json();
    await this.getContent(data).catch(() => this.class.isError(`No results for ${this.inputValue}`));
  }

  async getTranslate() {
    const urlTranslate = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200322T155651Z.de98a60e6a99185e.089aea4237b51c6db082c966f27a7895cd1e8b44&text=${this.inputValue}&lang=ru-en`;
    const translating = await fetch(urlTranslate).catch(() => this.class.isError(`No results for ${this.inputValue}`));
    const translateResult = await translating.json().catch(() => this.class.isError(`No results for ${this.inputValue}`));
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
      const urlRating = `https://www.omdbapi.com/?i=${data.Search[slideIndex].imdbID}&apikey=7185f30c`;
      const resRating = await fetch(urlRating).catch(() => this.class.isError('Исчерпан лимит запросов!'));
      const rating = await resRating.json();
      slide.innerHTML = '';
      const posterMovie = data.Search[slideIndex].Poster;
      const titleMovie = data.Search[slideIndex].Title;
      const yearMovie = data.Search[slideIndex].Year;
      const videogalleryMovie = data.Search[slideIndex].imdbID;
      Slide.createSlides(slide, posterMovie, titleMovie, yearMovie, videogalleryMovie, rating);
    }
    slidesPage.forEach((slide) => appendContent(slide).catch(() => this.class.isError(`No results for ${this.inputValue}`)));
    this.getMoreMovieInformation();
  }

  static createSlides(slide, posterMovie, titleMovie, yearMovie, videogalleryMovie, rating) {
    const posterErrorMessage = 'Сервис с этой фотографией временно недоступен';
    slide.insertAdjacentHTML('afterbegin', `<div class="slide__title"><a class="slide__title_link" data-id="slideTitle" href="https://www.imdb.com/title/${videogalleryMovie}/videogallery/?ref_=tt_pv_vi_sm">${titleMovie}</a></div>`);
    slide.insertAdjacentHTML('beforeend', `<div class ="slide__poster"><img class="slide__poster_img" src="${posterMovie}" alt="${posterErrorMessage}"></div>`);
    slide.insertAdjacentHTML('beforeend', `<div class="slide__year">${yearMovie}</div>`);
    slide.insertAdjacentHTML('beforeend', `<div class="slide__rating">${rating.imdbRating}</div>`);
  }

  static isError(textError) {
    SWIPER_SECTION.classList.add('hidden');
    ERROR_MESSAGE.innerHTML = '';
    ERROR_MESSAGE.classList.remove('hidden');
    ERROR_MESSAGE.insertAdjacentHTML('afterbegin', `<h2>Ошибка! ${textError}</h2>`);
  }

  showTranslateNotification(translateResult) {
    this.notificationTranslation.innerHTML = '';
    this.notificationTranslation.classList.remove('hidden');
    this.notificationTranslation.insertAdjacentHTML('afterbegin', `<h5 class="title_results">Showing results for &laquo;${translateResult.text[0]}&raquo;:</h5>`);
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
    Swiper.update();
  }

  getMoreMovieInformation() {
    const slidesPage = SWIPER.querySelectorAll(`div[data-page-index='${this.pageIndex}']`);
    slidesPage.forEach((slide) => slide.addEventListener('click', async (event) => {
      if (event.target.dataset.id === undefined) {
        const titleMovie = slide.firstElementChild.textContent;
        MORE_INFORMATION_POPUP.classList.remove('hidden');
        MORE_INFORMATION_POPUP.innerHTML = '';
        this.class.createPreloadDescriptionMovie();
        BLACKOUT.classList.remove('hidden');
        const urlMovie = `https://www.omdbapi.com/?t=${titleMovie}&plot=full&apikey=7185f30c`;
        const res = await fetch(urlMovie).catch(() => this.class.isError(`No results for ${this.inputValue}`));
        const data = await res.json();
        const descriptionPreloadCss = document.getElementById('description_preload');
        descriptionPreloadCss.classList.add('hidden');
        this.class.createMoreInformationPopup(data);
        const closeMovieInformation = document.getElementById('close_movie_information');
        closeMovieInformation.addEventListener('click', this.class.closeMoreInformationPopup);
      }
    }));
  }

  static createPreloadDescriptionMovie() {
    MORE_INFORMATION_POPUP.insertAdjacentHTML('afterbegin', `<div class="description_preload-wrapper">
                <div class="lds-ring description_preload" id="description_preload"><div></div><div></div><div></div><div></div></div>
                </div>`);
  }

  static createMoreInformationPopup(data) {
    MORE_INFORMATION_POPUP.insertAdjacentHTML('afterbegin', `<span class="search__clear close_popup" id="close_movie_information"></span>
                                                                        <div class="movie-description title_movie-description"><span class="movie-description__titles">Title</span>: ${data.Title}</div>
                                                                        <div class="movie-description"><span class="movie-description__titles">Year</span>: ${data.Year}</div>
                                                                        <div class="movie-description"><span class="movie-description__titles">Rated</span>: ${data.Rated}</div>
                                                                        <div class="movie-description"><span class="movie-description__titles">Runtime</span>: ${data.Runtime}</div>
                                                                        <div class="movie-description"><span class="movie-description__titles">Genre</span>: ${data.Genre}</div>
                                                                        <div class="movie-description"><span class="movie-description__titles">Director</span>: ${data.Director}</div>
                                                                        <div class="movie-description"><span class="movie-description__titles">Actors</span>: ${data.Actors}</div>
                                                                        <div class="movie-description"><span class="movie-description__titles">Country</span>: ${data.Country}</div>
                                                                        <div class="movie-description"><span class="movie-description__titles">Awards</span>: ${data.Awards}</div>`);
  }

  static closeMoreInformationPopup() {
    BLACKOUT.classList.add('hidden');
    MORE_INFORMATION_POPUP.classList.add('hidden');
  }

  submitByEnterOnVirtualKeyboard() {
    const virtualKeyEnter = document.getElementById('ENTER');
    virtualKeyEnter.addEventListener('click', this.submitToSearch.bind(this));
    virtualKeyEnter.addEventListener('click', () => {
      this.class.closeKeyboard();
    });
  }

  static closeKeyboard() {
    const keyboardBody = document.getElementById('keyboard');
    keyboardBody.classList.add('hidden');
    INPUT_SEARCH.classList.remove('z-index20');
    BLACKOUT.classList.add('hidden');
  }
}
