import { Component, createEffect, createSignal } from "solid-js";

export const Checker: Component = () => {
  const [ count, setCount ] = createSignal<number>(0);
  const currentTime = new Date().getTime();
  const [ limitTime, setLimitTime ] = createSignal<string>(new Date(currentTime).toLocaleTimeString());
  const [ soberTime, setSoberTime ] = createSignal<string>(new Date(currentTime).toLocaleTimeString());

  function updateTimes() {
    return () => {
      const options = {
        hour: '2-digit',
        minute: '2-digit',
      } as never;
      if (count() == 0) {
        const currentTime = new Date().getTime();
        setLimitTime(new Date(currentTime).toLocaleTimeString([], options));
        setSoberTime(new Date(currentTime).toLocaleTimeString([], options));
      } else {
        const currentTime = new Date().getTime();
        setLimitTime(new Date(currentTime + (count()) * 60 * 60 * 1000).toLocaleTimeString([], options));
        setSoberTime(new Date(currentTime + (count() + 1) * 60 * 60 * 1000).toLocaleTimeString([], options));
      }
    };
  }

  createEffect(updateTimes());

  return (
    <footer>
      <article style={ { "margin-bottom": 0 } }>
        <header>
          Alcohol Checker
        </header>
        <section class="grid">
          <button onClick={ () => setCount(count() + 1) } class="outline">
            Add
          </button>
          <button onClick={ () => count() == 0 ? setCount(0) : setCount(count() - 1) } class="outline">
            Subtract
          </button>
        </section>
        <table class="marginless">
          <thead>
          <tr>
            <th>Units consumed</th>
            <th>Borderline time</th>
            <th>Safe time</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{ count() }</td>
            <td>{ limitTime() }</td>
            <td>{ soberTime() }</td>
          </tr>
          </tbody>
        </table>
      </article>
    </footer>
  );
};
