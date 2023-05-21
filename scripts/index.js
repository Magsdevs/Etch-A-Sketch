const maxGridNumber = 256;
let container = document.getElementById('main-container'),
  isDragging = false;
const sketch = document.querySelector('.sketch');
const minNum = 0;
const maxNum = 255;

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomColor() {
  return (color = `rgb(${getRandomNumber(minNum, maxNum)},${getRandomNumber(
    minNum,
    maxNum
  )},${getRandomNumber(minNum, maxNum)})`);
}

function getDivs() {
  for (let i = 1; i <= maxGridNumber; i++) {
    let element = document.createElement('div');
    element.classList.add('sketch');
    container.appendChild(element);
  }
}

getDivs();

function mouseDown(e) {
  if (e.target.nodeName === 'DIV' && !e.target.id) {
    e.target.style.background = `${getRandomColor()}`;
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
  if (isDragging && e.target.nodeName === 'DIV' && !e.target.id) {
    e.target.style.background = `${getRandomColor()}`;
  }
}

container.addEventListener('mousedown', mouseDown);

container.addEventListener('mouseup', preventDrag);

container.addEventListener('mouseleave', preventDrag);

document.body.addEventListener('dragstart', preventDragDefault);

container.addEventListener('mouseover', mouseOver);
