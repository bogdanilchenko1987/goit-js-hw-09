import { getRandomHexColor } from './helpers/getRanpomColor';

let intervalID = null;

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

refs.startBtn.addEventListener('click', onStart);
refs.stopBtn.addEventListener('click', onStop);

function onStart() {
  intervalID = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
}

function onStop() {
  clearInterval(intervalID);
  refs.stopBtn.disabled = true;
  refs.startBtn.disabled = false;
}
