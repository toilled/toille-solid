import { Component, createResource, createSignal, Show } from "solid-js";
import { Transition } from "solid-transition-group";
import { fadeOut } from "../transitions/fades";

export const Activity: Component = () => {
  const fetchActivity = async () =>
    (await fetch("https://bored.api.lewagon.com/api/activity")).json();
  const [activity, { refetch }] = createResource(fetchActivity);
  const [hideHint, setHideHint] = createSignal<boolean>(false);

  const activityClasses = {
    marginless: true,
  };

  const newSuggestion = () => {
    refetch();
    if (!hideHint()) {
      setHideHint(true);
    }
  };

  const hintFooter = (
    <Transition onExit={fadeOut}>
      <Show when={!hideHint()}>
        <article
          style={{ "padding-top": 0, "margin-top": 0, "margin-bottom": 0 }}
        >
          <footer
            style={{
              "font-style": "oblique",
              "font-size": "0.8em",
              "margin-top": 0,
            }}
          >
            Click to update
          </footer>
        </article>
      </Show>
    </Transition>
  );

  const errorFallback = () => {
    return (
      <>
        <article style={{ "margin-bottom": 0 }}>
          <header>
            <strong>Try this activity</strong>
          </header>
          <p classList={activityClasses} aria-busy="true">
            Loading from The Bored API.
          </p>
        </article>

        {hintFooter}
      </>
    );
  };

  return (
    <footer
      onclick={newSuggestion}
      style={{ cursor: activity.loading ? "progress" : "" }}
    >
      <Show when={activity()} fallback={errorFallback()}>
        <article
          title="Click for a new suggestion"
          style={{ "margin-bottom": 0 }}
        >
          <header>
            <strong>
              Try this&nbsp;
              <Show
                when={!activity.loading}
                fallback={<>{activity().type}&nbsp;</>}
              >
                {activity().type}&nbsp;
              </Show>
              activity
            </strong>{" "}
            (The Bored API)
          </header>
          <p classList={activityClasses}>{activity().activity}</p>
        </article>

        {hintFooter}
      </Show>
    </footer>
  );
};
