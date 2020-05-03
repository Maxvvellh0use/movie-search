import { CLEAR_BUTTON, SEARCH_FORM } from '../../constants/constants';

export default class Form {
  static clearForm() {
    CLEAR_BUTTON.addEventListener('click', () => {
      SEARCH_FORM.reset();
    });
  }
}
