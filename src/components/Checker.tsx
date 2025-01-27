import { Component, createEffect, createSignal } from "solid-js";

export const Checker: Component = () => {
  const [count, setCount] = createSignal(0);
  const currentTime = new Date().getTime()
  const [limitTime, setLimitTime] = createSignal(() => new Date(currentTime).toLocaleTimeString());
  const [soberTime, setSoberTime] = createSignal(() => new Date(currentTime).toLocaleTimeString());

  createEffect(() => {
    if (count() == 0) {
      const currentTime = new Date().getTime()
      setLimitTime(new Date(currentTime).toLocaleTimeString())
      setSoberTime(new Date(currentTime).toLocaleTimeString())
    } else {
      const currentTime = new Date().getTime();
      setLimitTime(new Date(currentTime + (count()) * 60 * 60 * 1000).toLocaleTimeString());
      setSoberTime(new Date(currentTime + (count() + 1) * 60 * 60 * 1000).toLocaleTimeString());
    }
  });

  setInterval(() => {
    if (count() == 0) {
      const currentTime = new Date().getTime()
      setLimitTime(new Date(currentTime).toLocaleTimeString())
      setSoberTime(new Date(currentTime).toLocaleTimeString())
    } else {
      const currentTime = new Date().getTime();
      setLimitTime(new Date(currentTime + (count()) * 60 * 60 * 1000).toLocaleTimeString());
      setSoberTime(new Date(currentTime + (count() + 1) * 60 * 60 * 1000).toLocaleTimeString());
    }
  }, 1000);

  return (
    <footer>
      <article style={{ "margin-bottom": 0 }}>
        <header>
          Alcohol Checker
        </header>
        <section class="grid">
          <button onClick={() => setCount(count() + 1)} class="outline">
            Add
          </button>
          <button onClick={() => count() == 0 ? setCount(0) : setCount(count() - 1)} class="outline">
            Subtract
          </button>
        </section>
        <table class="marginless">
          <thead>
            <tr>
              <th>Units</th>
              <th>Borderline time</th>
              <th>Safe time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{count()}</td>
              <td>{limitTime()}</td>
              <td>{soberTime()}</td>
            </tr>
          </tbody>
        </table>
      </article>
    </footer>
  );
}
