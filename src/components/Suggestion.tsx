import { Component, createResource, createSignal, Show } from "solid-js";
import { Transition } from "solid-transition-group";

interface SuggestionProps {
  url: string;
  valueName: string;
  title: string;
}

export const Suggestion: Component<SuggestionProps> = ({ url, valueName, title }: SuggestionProps) => {
  const fetchSuggestion = async () =>
    (
      await fetch(url, { headers: { 'Accept': 'application/json' } })
    ).json();
  const [suggestion, { refetch }] = createResource(fetchSuggestion);
  const [hintHidden, setHintHidden] = createSignal<boolean>(false);

  const suggestionClasses = {
    marginless: true,
  };
  const errorStyle = { "margin-bottom": "0" };
  const footerStyle = {
    "font-style": "oblique",
    "font-size": "0.8em",
    "margin-top": "0",
  }

  const newSuggestion = () => {
    refetch();
    if (!hintHidden()) {
      setHintHidden(true);
    }
  };

  const errorFallback = () => {
    return (
      <article style={errorStyle}>
        <header>
          <strong>Have a laugh!</strong>
        </header>
        <p classList={suggestionClasses} aria-busy="true">
          {url} might be dowm.
        </p>
      </article>
    );
  };

  const animateFadeOut = (el: Element, done: () => void): void => {
    const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 600,
    });
    a.finished.then(done);
  };

  return (
    <footer
      onclick={newSuggestion}
      style={{ cursor: suggestion.loading ? "progress" : "" }}
    >
      <Show when={suggestion()} fallback={errorFallback()}>
        <article title="Click for a new suggestion" style={errorStyle}>
          <header>
            <strong>{title}</strong>
          </header>
          <p classList={suggestionClasses}>
            {suggestion()?.[valueName]}
          </p>
        </article>

        <Transition onExit={animateFadeOut}>
          <Show when={!hintHidden()}>
            <article style={{ "padding-top": "0", "margin-top": "0" }}>
              <footer style={footerStyle}>Click to update</footer>
            </article>
          </Show>
        </Transition>
      </Show>
    </footer>
  );
};