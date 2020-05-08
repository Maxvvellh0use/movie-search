const symbolsEngKeys = [[96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 'Backspace'], ['Tab', 113, 119,
  101, 114, 116, 121, 117, 105, 111, 112, 91, 93, 'DELETE'], ['Caps Lock', 97, 115, 100, 102, 103, 104, 106,
  107, 108, 59, 39, 35, 'ENTER'], ['Language', 122, 120, 99, 118, 98, 110, 109, 44, 46, 47, '&#9650;', 'Shift R'],
['Ctrl L', 'Win', 'Alt L', 'SPACE', 'Alt R', 'Ctrl R', '&#9668;', '&#9660;', '&#9658;']];

const symbolRusKeys = [1105, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 'Backspace', 'Tab', 1081, 1094, 1091,
  1082, 1077, 1085, 1075, 1096, 1097, 1079, 1093, 1098, 'DELETE', 'Caps Lock', 1092, 1099, 1074, 1072, 1087, 1088,
  1086, 1083, 1076, 1078, 1101, 92, 'ENTER', 'Language', 1103, 1095, 1089, 1084, 1080, 1090, 1100, 1073, 1102, 46,
  '&#9650;', 'Shift R', 'Ctrl L', 'Win', 'Alt L', 'SPACE', 'Alt R', 'Ctrl R', '&#9668;', '&#9660;', '&#9658;'];

const correctId = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7',
  'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY',
  'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'DELETE', 'CapsLock', 'KeyA', 'KeyS', 'KeyD',
  'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash', 'ENTER', 'ShiftLeft', 'KeyZ',
  'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
  'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];

export {
  symbolsEngKeys, symbolRusKeys, correctId,
};
