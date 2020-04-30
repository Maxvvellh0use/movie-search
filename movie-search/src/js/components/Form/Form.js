import { CLEAR_BUTTON, SEARCH_FORM } from '../../constants/constants';

export default class Form {
  constructor() {

  }

  clearForm() {
    CLEAR_BUTTON.addEventListener('click', () => {
      SEARCH_FORM.reset();
    });
  }
}
