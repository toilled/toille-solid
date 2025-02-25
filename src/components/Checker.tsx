import { Component, createEffect, createSignal } from "solid-js";

export const Checker: Component = () => {
  // State management:
  const [unitCount, setUnitCount] = createSignal<number>(0);
  const [borderlineTime, setBorderlineTime] = createSignal<string>("");
  const [safeTime, setSafeTime] = createSignal<string>("");

  // Helper function for formatting time:
  const formatTime = (timestamp: number): string => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
    } as Intl.DateTimeFormatOptions;
    return new Date(timestamp).toLocaleTimeString([], options);
  };

  // Function to update the times based on unitCount:
  const updateTimes = () => {
    const currentTime = Date.now(); // Use Date.now() for better readability
    const oneHourInMs = 60 * 60 * 1000;

    if (unitCount() === 0) {
      // Initialize times to current time
      setBorderlineTime(formatTime(currentTime));
      setSafeTime(formatTime(currentTime));
    } else {
      // Calculate future times
      setBorderlineTime(formatTime(currentTime + unitCount() * oneHourInMs));
      setSafeTime(formatTime(currentTime + (unitCount() + 1) * oneHourInMs));
    }
  };

  // Update the times whenever the unitCount changes:
  createEffect(updateTimes);

  // UI rendering:
  return (
    <footer>
      <article style={{ "margin-bottom": 0 }}>
        <header>Alcohol Checker</header>
        <section class="grid">
          <button onClick={() => setUnitCount(unitCount() + 1)} class="outline">
            Add
          </button>
          <button
            onClick={() =>
              setUnitCount(unitCount() === 0 ? 0 : unitCount() - 1)
            }
            class="outline"
          >
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
            <td>{unitCount()}</td>
            <td>{borderlineTime()}</td>
            <td>{safeTime()}</td>
          </tr>
          </tbody>
        </table>
      </article>
    </footer>
  );
};