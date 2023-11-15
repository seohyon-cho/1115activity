const screen = document.querySelector('.screen');
const [spanHr, spanMin, spanSec] = screen.querySelectorAll('span');

const now = new Date();
let hr = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
let min = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
let sec = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();

spanHr.innerText = hr;
spanMin.innerText = min;
spanSec.innerText = sec;
