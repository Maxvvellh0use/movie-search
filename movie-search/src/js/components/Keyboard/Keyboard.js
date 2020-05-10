import {
  symbolsEngKeys, symbolRusKeys, correctId,
} from './symbols';

const language = 'eng';

const checkLanguageStorage = () => {
  if (!localStorage.getItem(language)) {
    localStorage.setItem(language, 'eng');
  }
};

checkLanguageStorage();

const createRoot = () => {
  const keyboardRoot = document.getElementById('keyboardRoot');
  keyboardRoot.insertAdjacentHTML('afterbegin', '<div id="keyboard" class="keyboard_body hidden"></div>');
};

createRoot();


export default class Keyboard {
  constructor() {
    this.root = document.getElementById('keyboard');
    this.createLineOfKeyboard = this.createLineOfKeyboard.bind(this);
    this.createEngKeyboard = this.createEngKeyboard.bind(this);
    this.addCorrectIdToServiceKeys = this.addCorrectIdToServiceKeys.bind(this);
    this.createRusSymbols = this.createRusSymbols.bind(this);
    this.createEngSymbols = this.createEngSymbols.bind(this);
  }

  createKeyboard() {
    this.createLineOfKeyboard();
    this.createEngKeyboard();
    this.addCorrectIdToServiceKeys();
  }

  createLineOfKeyboard() {
    let lines = '';
    let i = 1;
    while (i < 6) {
      lines += `<div class="line" id="line_${i}"></div>`;
      i += 1;
    }
    this.root.innerHTML = lines;
  }

  createEngKeyboard() {
    const lines = this.root.querySelectorAll('.line');
    lines.forEach((line, index) => {
      symbolsEngKeys[index].map((key) => {
        if (typeof key === 'number') {
          line.insertAdjacentHTML('beforeend', `<div class="buttons" id="${String.fromCharCode(key)}"><span>${String.fromCharCode(key)}</span></div>`);
        } else {
          line.insertAdjacentHTML('beforeend', `<div class="buttons" id="service_keys"><span>${key.toString()}</span></div>`);
        }
      });
    });
  }

  addCorrectIdToServiceKeys() {
    const allKeys = document.querySelectorAll('.line .buttons');
    allKeys.forEach((keys, index) => {
      keys.id = correctId[index];
    });
  }

  createRusSymbols() {
    const buttonSpans = this.root.querySelectorAll('.line .buttons span');
    buttonSpans.forEach((keyEng, index) => {
      if (/^[А-Яа-я]+$/.test(String.fromCharCode(symbolRusKeys[index]))) {
        keyEng.innerHTML = String.fromCharCode(symbolRusKeys[index]);
      }
    });
  }

  createEngSymbols() {
    const buttonSpans = this.root.querySelectorAll('.line .buttons span');
    buttonSpans.forEach((keyRus, index) => {
      const symbolsEngKeysFlat = symbolsEngKeys.flat();
      if (/^[A-Za-z\[\];'#,.\/\\]+$/.test(String.fromCharCode(symbolsEngKeysFlat[index]))) {
        keyRus.innerHTML = String.fromCharCode(symbolsEngKeysFlat[index]);
      }
    });
  }
}
