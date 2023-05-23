let container = document.getElementById('box-container'),
  isDragging = false;
const sketch = document.querySelector('.sketch');
const range = document.getElementById('range');
const blackBtn = document.getElementById('black-btn');
const colorBtn = document.getElementById('color-btn');
const eraserBtn = document.getElementById('eraser-btn');
const clearBtn = document.getElementById('clear-btn');
const MIN_NUM = 0;
const MAX_NUM = 255;
const store = {
  currentColor: undefined,
};
const colorsPicker = {
  black: `rgb(0,0,0)`,
  randomColor: undefined,
  eraser: `rgb(255,255,255)`,
};

/////////////////// 256 sqr of 32px to fill Container
let defaultGrid = 256;
/////////////////// 64 sqr of 64px to fill Container
let BIG_SQUARE = defaultGrid / 4;
/////////////////// 1024 sqr of 8px to fill Container
let SMALL_SQUARE = defaultGrid * 4;
/////////////////// 4096 sqr of 4px to fill Container
let EXTRA_SMALL_SQUARE = defaultGrid * 16;

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getColor() {
  let color = `rgb(${getRandomNumber(MIN_NUM, MAX_NUM)},${getRandomNumber(
    MIN_NUM,
    MAX_NUM
  )},${getRandomNumber(MIN_NUM, MAX_NUM)})`;
  return color;
}

function getDivs(multiplyFactor) {
  container.innerHTML = ''; // Clear existing divs

  for (let i = 1; i <= multiplyFactor; i++) {
    let element = document.createElement('div');
    container.appendChild(element);
  }
}

function factor(num = 3) {
  let maxGridNumber;

  if (num === 1) {
    container.classList.remove('sketch', 'sketch-small', 'sketch-x-small');
    container.classList.add('sketch-big');
    maxGridNumber = BIG_SQUARE;
  }
  if (num === 2) {
    container.classList.remove('sketch-big', 'sketch-small', 'sketch-x-small');
    container.classList.add('sketch');
    maxGridNumber = defaultGrid;
  }

  if (num === 3) {
    container.classList.remove('sketch-big', 'sketch', 'sketch-x-small');
    container.classList.add('sketch-small');
    maxGridNumber = SMALL_SQUARE;
  }

  if (num === 4) {
    container.classList.remove('sketch-big', 'sketch', 'sketch-small');
    container.classList.add('sketch-x-small');
    maxGridNumber = EXTRA_SMALL_SQUARE;
  }

  return maxGridNumber;
}
getDivs(factor());

function gridHandler(e) {
  const value = parseInt(e.target.value);
  const maxGridNumber = factor(value);
  getDivs(maxGridNumber);
}

function mouseDown(e) {
  const currentColor = store.currentColor || getColor();
  if (e.target.nodeName === 'DIV' && !e.target.id) {
    e.target.style.background = currentColor;
    isDragging = true;
  }
}

function preventDrag() {
  isDragging = false;
}
function preventDragDefault(e) {
  e.preventDefault();
}

function mouseOver(e) {
  const currentColor = store.currentColor || getColor();
  if (isDragging && e.target.nodeName === 'DIV' && !e.target.id) {
    e.target.style.background = currentColor;
  }
}

container.addEventListener('mousedown', mouseDown);

container.addEventListener('mouseup', preventDrag);

container.addEventListener('mouseleave', preventDrag);

document.body.addEventListener('dragstart', preventDragDefault);

container.addEventListener('mouseover', mouseOver);

range.addEventListener('input', gridHandler);

blackBtn.addEventListener('click', handlerColorPicker);
colorBtn.addEventListener('click', handlerColorPicker);
eraserBtn.addEventListener('click', handlerColorPicker);
clearBtn.addEventListener('click', () => {
  range.value = 3;
  getDivs(factor());
});
function handlerColorPicker(e) {
  const { value } = e.target.classList;
  store.currentColor = colorsPicker[value];
}
