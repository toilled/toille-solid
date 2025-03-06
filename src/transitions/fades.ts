const duration = 250;

export const fadeIn = (el: Element, done: () => void): void => {
  const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: duration,
  });
  a.finished.then(done);
};
export const fadeOut = (el: Element, done: () => void): void => {
  const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: duration,
  });
  a.finished.then(done);
};
