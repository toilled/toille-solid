import { Component, createResource, createSignal, JSX, Show } from "solid-js";
import { Transition } from "solid-transition-group";
import CSSProperties = JSX.CSSProperties;

export const Activity: Component = () => {
  // --- State and Resources ---
  const fetchActivity = async () => {
    const response = await fetch('https://bored.api.lewagon.com/api/activity', {headers: {'Accept': 'application/json'}});
    if (!response.ok) {
      throw new Error(`Failed to fetch activity: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  };

  const [activity, { refetch }] = createResource(fetchActivity);
  const [hideHint, setHideHint] = createSignal(false);

  // --- Helper Functions ---
  const newActivity = () => {
    refetch();
    setHideHint(true); // Always hide the hint after refetching
  };

  const errorFallback = () => {
    return (
      <article style={{ "margin-bottom": 0 }}>
        <header>
          <strong>Error!</strong>
        </header>
        <p class="marginless" aria-busy="true">
          The Bored API might be down.
        </p>
      </article>
    );
  };

  const fadeOut = (el: Element, done: () => void): void => {
    const animation = el.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 600,
    });
    animation.finished.then(done);
  };

  const hintStyle: CSSProperties = {
    "font-style": "oblique",
    "font-size": "0.8em",
    "margin-top": 0,
  };
  const articleStyle: CSSProperties = { "margin-bottom": 0 };
  const pointer = { cursor: activity.loading ? "progress" : "pointer" }
  // --- UI ---
  return (
    <footer onClick={newActivity} style={{...pointer}}>
      <Show when={activity()} fallback={errorFallback()}>
        <article title="Click for a new activity" style={articleStyle}>
          <header>
            <strong>
              Try this&nbsp;
              <Show when={!activity.loading} fallback={<>loading...</>}>
                {activity()?.type}&nbsp;
              </Show>
              activity
            </strong> (The Bored API)
          </header>
          <p class="marginless">{activity()?.activity}</p>
        </article>

        <Transition onExit={fadeOut}>
          <Show when={!hideHint()}>
            <article style={{ "padding-top": 0, "margin-top": 0, ...articleStyle }}>
              <footer style={hintStyle}>Click to update</footer>
            </article>
          </Show>
        </Transition>
      </Show>
    </footer>
  );
};