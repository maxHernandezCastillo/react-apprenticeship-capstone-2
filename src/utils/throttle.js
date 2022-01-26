
function throttle(func, cooldown=500) {
  let timer = 0;
  return (...args) => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = 0;
      }, cooldown);
      return func.apply(this, args);
    }
  };
}

export default throttle;
