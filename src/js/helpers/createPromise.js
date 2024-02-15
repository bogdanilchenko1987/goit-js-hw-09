function createPromise(position, delay) {
  const obj = { position, delay };
  const shouldResolve = Math.random() > 0.5;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(obj);
      } else {
        reject(obj);
      }
    }, delay);
  });
}

export { createPromise };
