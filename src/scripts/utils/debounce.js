export default function debounce(callback, delay) {
  let timeout;
  // eslint-disable-next-line func-names
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}
