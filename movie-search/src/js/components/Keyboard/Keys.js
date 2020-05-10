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
    this.class = Keys;
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

  isKeyboardEvent(symbols, event) {
    return event.code === symbols.id && /^[\dA-Яа-яA-Za-z[\]\-=;'#,./\\]+$/.test(symbols.textContent.toString())
      && symbols.textContent.length === 1;
  }

  isMouseEvent(symbols, event) {
    return /^[\dA-Яа-яA-Za-z\[\]\-=;'#,.\/\\]+$/.test(symbols.textContent.toString()) && symbols.textContent.length === 1
      && (event.target.parentElement.id === symbols.id || event.target.id === symbols.id);
  }

  symbolsToInput(symbols, event) {
    event.preventDefault();
    const word = event.target.textContent;
    const { value: val, selectionStart: start, selectionEnd: end } = INPUT_SEARCH;
    INPUT_SEARCH.value = `${val.substring(0, start)}${word.toLowerCase()}${val.substring(end)}`;
    this.class.setPositionCursor(start + 1);
  }

  typing(event) {
    this.activeElements.forEach((symbols) => {
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

  static setPositionCursor(position) {
    INPUT_SEARCH.selectionStart = position;
    INPUT_SEARCH.selectionEnd = position;
  }

  arrowLeft(event) {
    if (event.target.textContent === '◄') {
      const { selectionStart: start } = INPUT_SEARCH;
      this.class.setPositionCursor(start - 1);
    }
  }

  arrowDown(event) {
    if (event.target.textContent === '▼') {
      const { value: val } = INPUT_SEARCH;
      this.class.setPositionCursor(val.length);
    }
  }

  arrowRight(event) {
    if (event.target.textContent === '►') {
      const { selectionStart: start } = INPUT_SEARCH;
      this.class.setPositionCursor(start + 1);
    }
  }

  backspace(event) {
    if (event.target.textContent === 'Backspace' || event.key === 'Backspace') {
      const { value: val, selectionStart: start, selectionEnd: end } = INPUT_SEARCH;
      if (start !== end) {
        INPUT_SEARCH.value = `${val.slice(0, start)}${val.slice(end)}`;
        this.class.setPositionCursor(start);
      } else if (start !== 0) {
        INPUT_SEARCH.value = `${val.slice(0, start - 1)}${val.slice(start)}`;
        this.class.setPositionCursor(start - 1);
      } else {
        this.class.setPositionCursor(start);
      }
    }
  }

  space(event) {
    if (event.target.textContent === 'SPACE') {
      const { value: val, selectionStart: start, selectionEnd: end } = INPUT_SEARCH;
      INPUT_SEARCH.value = `${val.substring(0, start)} ${val.substring(end)}`;
      this.class.setPositionCursor(start + 1);
    }
  }

  static isLettersSymbols(symbols) {
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
        if (this.class.isLettersSymbols(symbols)) {
          symbols.innerHTML = symbols.textContent.toUpperCase();
        }
      });
      this.clickToCaps += 1;
    } else if (this.clickToCaps === 1 && this.isCaps(event)) {
      buttonSpans.forEach((symbols) => {
        if (this.class.isLettersSymbols(symbols)) {
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
      keys.space(event);
      keys.capsLock(event);
      keys.arrowDown(event);
      keys.arrowLeft(event);
      keys.arrowRight(event);
    });

    document.addEventListener('mouseup', (event) => {
      const keys = new Keys();
      INPUT_SEARCH.focus();
      keys.mouseUp(event);
    });
  }
}
