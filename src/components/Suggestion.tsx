import { Component, createResource, createSignal, Show } from "solid-js";
import { Transition } from "solid-transition-group";

interface SuggestionProps {
  url: string;
  valueName: string;
  title: string;
}

export const Suggestion: Component<SuggestionProps> = ({ url, valueName, title }: SuggestionProps) => {
  const fetchJoke = async () => (await fetch(url, { headers: { 'Accept': 'application/json' } })).json();
  const [ joke, { refetch } ] = createResource(fetchJoke);
  const [ hideHint, setHideHint ] = createSignal<boolean>(false);

  const fallback = () => {
    const fallbackClasses = {
      marginless: true,
    };

    return (
      <p classList={ fallbackClasses }>
        { joke()[valueName] }
      </p>
    );
  };

  const jokeClasses = {
    marginless: true,
  };

  const newSuggestion = () => {
    refetch();
    if (!hideHint()) {
      setHideHint(true);
    }
  };

  const errorFallback = () => {
    return (
      <article
        style={ { "margin-bottom": 0 } }
      >
        <header>
          <strong>
            Have a laugh!
          </strong>
        </header>
        <p classList={ jokeClasses } aria-busy="true">
          { url } might be dowm.
        </p>
      </article>
    );
  };

  const fadeOut = (el: Element, done: () => void): void => {
    const a = el.animate([ { opacity: 1 }, { opacity: 0 } ], {
      duration: 600
    });
    a.finished.then(done);
  };

  return (
    <footer onclick={ newSuggestion } style={ { cursor: joke.loading ? 'progress' : '' } }>
      <Show when={ joke() } fallback={ errorFallback() }>
        <article
          title="Click for a new suggestion"
          style={ { "margin-bottom": 0 } }
        >
          <header>
            <strong>
              { title }
            </strong>
          </header>
          <Show when={ !joke.loading } fallback={ fallback() }>
            <p classList={ jokeClasses }>
              { joke()[valueName] }
            </p>
          </Show>
        </article>

        <Transition onExit={ fadeOut }>
          <Show when={ !hideHint() }>
            <article style={ { "padding-top": 0, "margin-top": 0 } }>
              <footer style={ {
                "font-style": "oblique",
                "font-size": "0.8em",
                "margin-top": 0
              } }>
                Click to update
              </footer>
            </article>
          </Show>
        </Transition>
      </Show>
    </footer>
  );
};