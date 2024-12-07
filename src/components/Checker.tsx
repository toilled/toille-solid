import { Component, createEffect, createSignal } from "solid-js";

export const Checker: Component = () => {
  const [count, setCount] = createSignal(0);
  let currentTime = new Date().getTime()
  const [soberTime, setSoberTime] = createSignal(() => new Date(currentTime).toLocaleTimeString());

  createEffect(() => {
    if (count() == 0) {
      let currentTime = new Date().getTime()
      setSoberTime(new Date(currentTime).toLocaleTimeString())
    } else {
      let currentTime = new Date().getTime();
      setSoberTime(new Date(currentTime + (count() + 1) * 60 * 60 * 1000).toLocaleTimeString());
    }
  });

  const footerClasses: any = {
    animate__animated: true,
    animate__bounceInUp: true,
  };

  return (
    <article classList={footerClasses}>
      <a onClick={() => setCount(count() + 1)}>
        Units: {count()}
      </a>
      <footer>
        You'll be sober  {soberTime()}
      </footer>
    </article>
  );
}
