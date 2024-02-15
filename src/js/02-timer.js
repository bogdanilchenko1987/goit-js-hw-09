import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';

import { addLeadingZero } from './helpers/addLeadingZero';
import { convertMs } from './helpers/convertMs';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const currentDate = new Date();

    const deltaTime = selectedDates[0] - currentDate;

    if (deltaTime > 0) {
      refs.startBtn.disabled = false;
    } else {
      Notify.failure('Please choose a date in the future', {
        timeout: 1000,
      });
      refs.startBtn.disabled = true;
    }
  },
};

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),
};

const fp = flatpickr(refs.dateInput, options);

let pickedDate;
let timeID = 0;

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', onStart);
refs.dateInput.addEventListener('input', onInput);

function onInput(evt) {
  pickedDate = new Date(evt.target.value);
}

function onStart() {
  timeID = setInterval(() => {
    const currentDate = new Date();
    const deltaTime = convertMs(pickedDate - currentDate);

    if (pickedDate - currentDate > 0) {
      refs.days.textContent = addLeadingZero(deltaTime.days);
      refs.hours.textContent = addLeadingZero(deltaTime.hours);
      refs.minutes.textContent = addLeadingZero(deltaTime.minutes);
      refs.seconds.textContent = addLeadingZero(deltaTime.seconds);

      refs.startBtn.disabled = true;
    } else if (pickedDate - currentDate <= 0) {
      clearInterval(timeID);
      refs.startBtn.disabled = false;
    }
  }, 1000);
}
