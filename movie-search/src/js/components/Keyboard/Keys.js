import language from './Keyboard';
import Keyboard from './Keyboard';
import {SEARCH_FORM} from '../../constants/constants';
import Slide from '../Slide/Slide';

export default class Keys {
  constructor() {
    this.keyboard = new Keyboard();
    this.allKeys = document.querySelectorAll('.line .buttons');
    this.allSpans = document.querySelectorAll('.line .buttons span');
    this.activeElements = [];
    this.input = document.getElementById('input_search');
    this.curPos = this.input.selectionStart;
    this.altLeft = document.getElementById('AltLeft');
    this.shiftLeft = document.getElementById('ShiftLeft');
    this.clickToCaps = 0;
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

  keyDown(event) {
    this.allKeys.forEach((elem) => {
      if (elem.id === event.target.id || elem.id.toUpperCase() === event.code.toUpperCase()) {
        this.activeElements.push(elem);
      }
    });
  }

  keyUp() {
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
    this.input.value += symbols.textContent.toString();
    this.input.innerText = this.input.value;
  }

  typing(event) {
    this.activeElements.forEach((symbols) => {
      if (this.isArrow(symbols, event)) {
        this.input.focus();
      }
      if (this.isKeyboardEvent(symbols, event)) {
        this.symbolsToInput(symbols, event);
      } else if (this.isMouseEvent(symbols, event)) {
        this.symbolsToInput(symbols, event);
      }
    });
  }

  changeLanguage() {
    if (localStorage.getItem(language) === 'eng' && this.activeElements.includes(this.altLeft) && this.activeElements.includes(this.shiftLeft)) {
      this.keyboard.createRusSymbols();
      localStorage.setItem(language, 'rus');
    } else if (localStorage.getItem(language) === 'rus' && this.activeElements.includes(this.altLeft) && this.activeElements.includes(this.shiftLeft)) {
      this.keyboard.createEngSymbols();
      localStorage.setItem(language, 'eng');
    }
  }

  // serviceKeys:

  backspace(event) {
    if (event.target.textContent === 'Backspace' || event.key === 'Backspace') {
      event.preventDefault();
      this.input.value = this.input.value.slice(0, this.curPos - 1);
    }
  }

  tab(event) {
    if (event.target.textContent === 'Tab' || event.code === 'Tab') {
      event.preventDefault();
      this.input.value += '  ';
    }
  }

  space(event) {
    if (event.target.textContent === 'SPACE' || event.code === 'Space') {
      event.preventDefault();
      this.input.value += ' ';
    }
  }

  enter(event) {
    const slide = new Slide();
    if (event.target.textContent === 'ENTER' || event.code === 'Enter') {
      console.log('enter');
      this.input.value += '\n';
      slide.toSearch();
    }
    document.getElementById('ENTER').addEventListener('click', (even) => {
      even.preventDefault();
      slide.toSearch();
      SEARCH_FORM.submit();
    });
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
    document.addEventListener('keydown', (event) => {
    //   const keys = new Keys();
    //   keys.keyDown(event);
    //   keys.typing(event);
    //   keys.changeLanguage(event);
    //   // serviceKeys:
    //   keys.backspace(event);
    //   keys.tab(event);
    //   keys.space(event);
    //   keys.enter(event);
    //   keys.capsLock(event);
    // });
    //
    // document.addEventListener('keyup', (event) => {
    //   const keys = new Keys();
    //   keys.keyUp(event);
    });

// mouse events:

    document.addEventListener('mousedown', (event) => {
      const keys = new Keys();
      keys.mouseDown(event);
      keys.typing(event);
      keys.backspace(event);
      keys.tab(event);
      keys.space(event);
      keys.enter(event);
      keys.capsLock(event);
    });

    document.addEventListener('mouseup', (event) => {
      const keys = new Keys();
      keys.input.focus();
      keys.mouseUp(event);
    });
  }
}


// keyboard events:


