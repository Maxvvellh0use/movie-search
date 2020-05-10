import {
  CLEAR_BUTTON,
  SEARCH_FORM,
  KEYBOARD_BUTTON,
  BLACKOUT,
  INPUT_SEARCH,
} from '../../constants/constants';
import Keyboard from '../Keyboard/Keyboard';
import Slide from '../Slide/Slide';
import Keys from '../Keyboard/Keys';

export default class Form {
  constructor() {
    this.keyboardOpenClicks = 0;
    this.class = Form;
  }

  static clearForm() {
    CLEAR_BUTTON.addEventListener('click', () => {
      SEARCH_FORM.reset();
    });
  }

  openKeyboard() {
    const slide = new Slide();
    KEYBOARD_BUTTON.addEventListener('click', () => {
      const keyboard = new Keyboard();
      const keyboardBody = document.getElementById('keyboard');
      keyboard.createKeyboard();
      this.class.language();
      slide.submitByEnterOnVirtualKeyboard();
      if (this.keyboardOpenClicks === 0) {
        keyboardBody.classList.remove('hidden');
        BLACKOUT.classList.remove('hidden');
        INPUT_SEARCH.classList.add('z-index20');
        this.keyboardOpenClicks = 1;
      } else {
        keyboardBody.classList.add('hidden');
        BLACKOUT.classList.add('hidden');
        INPUT_SEARCH.classList.remove('z-index20');
        this.keyboardOpenClicks = 0;
      }
    });
  }

  static language() {
    const keys = new Keys();
    document.addEventListener('mousedown', (event) => keys.changeLanguage(event));
  }
}
