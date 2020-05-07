import { CLEAR_BUTTON, SEARCH_FORM, KEYBOARD_BUTTON } from '../../constants/constants';
import Keyboard from '../Keyboard/Keyboard';
import Slide from '../Slide/Slide';
import Keys from '../Keyboard/Keys';

export default class Form {
  constructor() {
    this.keyboardOpenClicks = 0;
  }

  static clearForm() {
    CLEAR_BUTTON.addEventListener('click', () => {
      SEARCH_FORM.reset();
    });
  }

  openKeyboard() {
    KEYBOARD_BUTTON.addEventListener('click', () => {
      const slide = new Slide();
      const keyboard = new Keyboard();
      const keyboardBody = document.getElementById('keyboard');
      keyboard.createKeyboard();
      this.language();
      // slide.submitByEnterOnVirtualKeyboard();
      if (this.keyboardOpenClicks === 0) {
        keyboardBody.classList.remove('hidden');
        this.keyboardOpenClicks = 1;
      } else {
        keyboardBody.classList.add('hidden');
        this.keyboardOpenClicks = 0;
      }
    });
  }

  language() {
    const keys = new Keys();
    document.addEventListener('mousedown', (event) => keys.changeLanguage(event));
  }
}
