let timer: any;
const debounce = (func: Function, timeout = 250) => {
  return (...args: any) => {
    // Clearing previous calls
    clearTimeout(timer);
    // Setting a new timeout
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};
export default debounce;
