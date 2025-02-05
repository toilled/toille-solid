import { Component, Show, createResource, createSignal } from "solid-js";
import { Transition } from "solid-transition-group";

export const Joke: Component = () => {
    const fetchJoke = async () => (await fetch('https://icanhazdadjoke.com/', { headers: { 'Accept': 'application/json' } })).json();
    const [joke, { refetch }] = createResource(fetchJoke);
    const [hideHint, setHideHint] = createSignal(false);

    const fallback = () => {
        const fallbackClasses = {
            marginless: true,
        };

        return (
            <p classList={fallbackClasses}>
                {joke().joke}
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
    }

    const errorFallback = () => {
        return (
            <article
                style={{ "margin-bottom": 0 }}
            >
                <header>
                    <strong>
                        Have a laugh!
                    </strong>
                </header>
                <p classList={jokeClasses} aria-busy="true">
                    icanhazdadjoke.com might be dowm.
                </p>
            </article>
        );
    }

    const fadeOut = (el: Element, done: () => void): void => {
        const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 600
        });
        a.finished.then(done);
    };

    return (
        <footer onclick={newSuggestion} style={{ cursor: joke.loading ? 'progress' : '' }}>
            <Show when={joke()} fallback={errorFallback()}>
                <article
                    title="Click for a new suggestion"
                    style={{ "margin-bottom": 0 }}
                >
                    <header>
                        <strong>
                            Have a laugh!
                        </strong>
                    </header>
                    <Show when={!joke.loading} fallback={fallback()}>
                        <p classList={jokeClasses}>
                            {joke().joke}
                        </p>
                    </Show>
                </article>

                <Transition onExit={fadeOut} >
                    <Show when={!hideHint()}>
                        <article style={{ "padding-top": 0, "margin-top": 0 }}>
                            <footer style={{
                                "font-style": "oblique",
                                "font-size": "0.8em",
                                "margin-top": 0
                            }}>
                                Click to update
                            </footer>
                        </article>
                    </Show>
                </Transition>
            </Show>
        </footer >
    );
};