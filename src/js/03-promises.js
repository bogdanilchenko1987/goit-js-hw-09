import { Notify } from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  step: document.querySelector('.js-step'),
  amount: document.querySelector('.js-amount'),
  delay: document.querySelector('.js-delay'),
  btn: document.querySelector('.js-btn'),
};

let data = {};

refs.form.addEventListener('input', onInput);
refs.btn.addEventListener('click', onClick);

function onClick(evt) {
  evt.preventDefault();
  const arr = [];

  for (let i = 1; i <= data.amount; i += 1) {
    const delay = data.delay + data.step * (i - 1);

    arr.push(createPromise(i, delay));
  }

  console.log(arr);

  Promise.allSettled(arr).then(results => {
    results.forEach((result, i) => {
      const delay = data.delay + data.step * i;

      if (result.status === 'fulfilled') {
        Notify.success(`✅ Fulfilled promise ${i + 1} in ${delay}ms`, {
          timeout: `${delay}`,
        });
      } else {
        Notify.failure(`❌ Rejected promise ${i + 1} in ${delay}ms`, {
          timeout: `${delay}`,
        });
      }
    });
  });
}

function onInput() {
  data.amount = Number(refs.amount.value);
  data.step = Number(refs.step.value);
  data.delay = Number(refs.delay.value);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.5;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

// const promis = createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     return console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     return console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });

// console.log(promis);
