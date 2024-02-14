import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let deltaTime = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 10,

  onClose(selectedDates) {
    // let sel = fp.selectedDates[0];  ???????????????

    console.log(selectedDates[0]);

    const currentDate = new Date();
    // const deltaTime = selectedDates[0] - currentDate;
    deltaTime = currentDate - selectedDates[0];
    return deltaTime;
    // if (deltaTime > 0) {
    //   refs.startBtn.disabled = false;
    //   convertedTime = convertMs(deltaTime);

    //   const convertedDays = addLeadingZero(convertedTime.days);
    //   const convertedHours = addLeadingZero(convertedTime.hours);
    //   const convertedMinutes = addLeadingZero(convertedTime.minutes);
    //   const convertedSeconds = addLeadingZero(convertedTime.seconds);
    // } else {
    //   window.alert('Please choose a date in the future');
    //   refs.startBtn.disabled = true;
    // }
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

// const fp = flatpickr(refs.dateInput, options);

// console.log(options.onClose(fp.selectedDates));

const fp = flatpickr(refs.dateInput, options);

const pp = options.onClose(fp.selectedDates);
console.log(pp);

refs.startBtn.disabled = true;

refs.startBtn.addEventListener('click', onStart);
refs.dateInput.addEventListener('input', onInput);

function onInput(evt) {
  //   console.log(evt.target.value);
}

function onStart() {
  setInterval(() => {
    const currentTime = new Date();
    // const currentDay = currentTime.getDay();
    // const currentHour = currentTime.getHours();
    // const currentMins = currentTime.getMinutes();
    // const currentSecs = currentTime.getSeconds();
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
