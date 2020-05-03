import {
  SWIPER, SEARCH_FORM, INPUT_SEARCH, SWIPER_SECTION, ERROR_MESSAGE,
} from '../../constants/constants';

export default class Slide {
  constructor() {
    this.slides = SWIPER.querySelectorAll('.swiper-slide');
    this.notificationTranslation = document.getElementById('notificationTranslation');
    this.slidesTitles = SWIPER.querySelectorAll('.slide__header');
    this.inputValue = '';
    this.class = Slide;
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

  async toTranslate() {
    try {
      const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200322T155651Z.de98a60e6a99185e.089aea4237b51c6db082c966f27a7895cd1e8b44&text=${INPUT_SEARCH.value}&lang=ru-en`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data.text[0]);
      this.inputValue = data.text[0];
    } catch (error) {
      this.class.isError();
    }
  }

  async startRequest() {
    try {
      const url = 'https://www.omdbapi.com/?s=dream&apikey=9b67fc54';
      this.preload();
      const res = await fetch(url);
      res.catch(() => this.isError('Исчерпан лимит запросов!'));
      const data = await res.json();
      this.getContent(data);
    } catch (error) {
      this.class.isError('Исчерпан лимит запросов!');
    }
  }

  async getMovies() {
    try {
      if (!/(^[А-я0-9\s]+)(?!.*[A-z])$|(^[A-z0-9\s]+)(?!.*[А-я])$/.test(this.inputValue)) {
        this.isError(`No results for ${this.inputValue}`);
      }
      const urlTranslate = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200322T155651Z.de98a60e6a99185e.089aea4237b51c6db082c966f27a7895cd1e8b44&text=${this.inputValue}&lang=ru-en`;
      this.preload();
      const translating = await fetch(urlTranslate);
      translating.catch(() => this.isError('Исчерпан лимит запросов!'));
      const translateResult = await translating.json();
      this.showTranslateNotification(translateResult);
      const urlMovies = `https://www.omdbapi.com/?s=${translateResult.text[0]}&apikey=9b67fc54`;
      const res = await fetch(urlMovies);
      res.catch(() => this.isError('Исчерпан лимит запросов!'));
      const data = await res.json();
      this.getContent(data);
    } catch (error) {
      this.class.isError(`No results for ${this.inputValue}`);
    }
  }

  async getContent(data) {
    this.slides.forEach((slide, index) => {
      slide.innerHTML = '';
      slide.insertAdjacentHTML('afterbegin', `<div class="slide__title"><a class="slide__title_link" href="#">${data.Search[index].Title}</a></div>`);
      slide.insertAdjacentHTML('beforeend', `<div class ="slide__poster"><img class="slide__poster_img" src="${data.Search[index].Poster}"></div>`);
      slide.insertAdjacentHTML('beforeend', `<div class="slide__year">${data.Search[index].Year}</div>`);
    });
  }

  preload() {
    this.slides.forEach((slide) => {
      slide.innerHTML = '';
      slide.insertAdjacentHTML('afterbegin', `<div class="cssload-container">
                                                            <div class="cssload-speeding-wheel"></div>
                                                         </div>`);
    });
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
    this.notificationTranslation.insertAdjacentHTML('afterbegin', `<h5>Showing results for ${translateResult.text[0]}</h5>`);
  }
}
