export const debounce = <F extends (...args: any[]) => any>(
  callback: F,
  time: number
): ((...args: Parameters<F>) => void) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => callback(...args), time);
  };
};
