/* eslint-disable */
import { describe } from '@jest/globals';
import Keyboard from '../src/js/components/Keyboard/Keyboard';
import { createRoot } from '../src/js/components/Keyboard/Keyboard';

describe('Keyboard: createKeyboard', () => {
  const keyboard = new Keyboard();
  keyboard.createKeyboard();
  createRoot();

  test('correct create keyboard', () => {
    expect(keyboard.createKeyboard).toBeDefined();
    expect(document.getElementById('keyboardRoot')).not.toBeUndefined();
    expect(document.getElementById('keyboardRoot')).not.toBeNull();
  })
});
