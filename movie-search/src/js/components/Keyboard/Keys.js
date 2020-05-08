import Keyboard from './Keyboard';
import {
  INPUT_SEARCH,
} from '../../constants/constants';

export default class Keys {
  constructor() {
    this.keyboard = new Keyboard();
    this.allKeys = document.querySelectorAll('.line .buttons');
    this.allSpans = document.querySelectorAll('.line .buttons span');
    this.activeElements = [];
    this.curPos = INPUT_SEARCH.selectionStart;
    this.altLeft = document.getElementById('AltLeft');
    this.shiftLeft = document.getElementById('ShiftLeft');
    this.clickToCaps = 0;
    this.language = 'en';
  }

  mouseDown(event) {
    this.allKeys.forEach((key, index) => {
      if (key.id === event.target.id || this.allSpans[index] === event.target) {
        this.activeElements.push(this.allKeys[index]);
      }
    });
  }

  mouseUp() {
    this.activeElements.map((elem) => {
      if (elem.id !== 'CapsLock') {
        elem.classList.remove('active');
      }
    });
    this.activeElements = [];
  }

  isArrow(symbols, event) {
    return event.code === symbols.id && /^[▲▼►◄]+$/.test(symbols.textContent.toString());
  }

  isKeyboardEvent(symbols, event) {
    return event.code === symbols.id && /^[\dA-Яа-яA-Za-z\[\]\-=;'#,.\/\\]+$/.test(symbols.textContent.toString())
      && symbols.textContent.length === 1;
  }

  isMouseEvent(symbols, event) {
    return /^[\dA-Яа-яA-Za-z\[\]\-=;'#,.\/\\▲▼►◄]+$/.test(symbols.textContent.toString()) && symbols.textContent.length === 1
      && (event.target.parentElement.id === symbols.id || event.target.id === symbols.id);
  }

  symbolsToInput(symbols, event) {
    event.preventDefault();
    INPUT_SEARCH.value += symbols.textContent.toString();
    INPUT_SEARCH.innerText = INPUT_SEARCH.value;
  }

  typing(event) {
    this.activeElements.forEach((symbols) => {
      if (this.isArrow(symbols, event)) {
        INPUT_SEARCH.focus();
      }
      if (this.isKeyboardEvent(symbols, event)) {
        this.symbolsToInput(symbols, event);
      } else if (this.isMouseEvent(symbols, event)) {
        this.symbolsToInput(symbols, event);
      }
    });
  }

  changeLanguage(event) {
    if (event.target.textContent === 'Language' && this.language === 'en') {
      this.keyboard.createRusSymbols();
      this.language = 'ru';
    } else if (event.target.textContent === 'Language' && this.language === 'ru') {
      this.keyboard.createEngSymbols();
      this.language = 'en';
    }
  }

  // serviceKeys:

  backspace(event) {
    if (event.target.textContent === 'Backspace' || event.key === 'Backspace') {
      event.preventDefault();
      INPUT_SEARCH.value = INPUT_SEARCH.value.slice(0, this.curPos - 1);
    }
  }

  tab(event) {
    if (event.target.textContent === 'Tab' || event.code === 'Tab') {
      event.preventDefault();
      INPUT_SEARCH.value += '  ';
    }
  }

  space(event) {
    if (event.target.textContent === 'SPACE' || event.code === 'Space') {
      event.preventDefault();
      INPUT_SEARCH.value += ' ';
    }
  }

  isLettersSymbols(symbols) {
    return symbols.textContent.length === 1
      && /^[\dA-Яа-яA-Za-z\[\]\-=;'#,.\/\\▲▼►◄]+$/.test(symbols.textContent.toString());
  }

  isCaps(event) {
    return (event.target.textContent === 'Caps Lock' || event.code === 'CapsLock');
  }

  capsLock(event) {
    const buttonSpans = document.querySelectorAll('.line .buttons span');
    if (this.clickToCaps === 0 && this.isCaps(event)) {
      buttonSpans.forEach((symbols) => {
        if (this.isLettersSymbols(symbols)) {
          symbols.innerHTML = symbols.textContent.toUpperCase();
        }
      });
      this.clickToCaps += 1;
    } else if (this.clickToCaps === 1 && this.isCaps(event)) {
      buttonSpans.forEach((symbols) => {
        if (this.isLettersSymbols(symbols)) {
          symbols.innerHTML = symbols.textContent.toLowerCase();
          this.activeElements[0].classList.remove('active');
        }
      });
      this.clickToCaps = 0;
    }
  }

  static getKeysEvents() {
    document.addEventListener('mousedown', (event) => {
      const keys = new Keys();
      keys.mouseDown(event);
      keys.typing(event);
      keys.backspace(event);
      keys.tab(event);
      keys.space(event);
      keys.capsLock(event);
    });

    document.addEventListener('mouseup', (event) => {
      const keys = new Keys();
      INPUT_SEARCH.focus();
      keys.mouseUp(event);
    });
  }
}
