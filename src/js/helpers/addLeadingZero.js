function addLeadingZero(value) {
  if (value > 99) {
    return value.toString().padStart(3, '0');
  } else {
    return value.toString().padStart(2, '0');
  }
}

export { addLeadingZero };
