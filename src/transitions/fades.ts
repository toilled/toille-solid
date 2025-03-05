export const fadeIn = (el: Element, done: () => void): void => {
  const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 600,
  });
  a.finished.then(done);
};
export const fadeOut = (el: Element, done: () => void): void => {
  const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 600,
  });
  a.finished.then(done);
};
