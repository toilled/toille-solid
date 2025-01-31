import { Component, Show, createResource, createSignal } from "solid-js";

export const Joke: Component = () => {
    const fetchJoke = async () => (await fetch('https://icanhazdadjoke.com/', { headers: { 'Accept': 'application/json' } })).json();
    const [joke, { refetch }] = createResource(fetchJoke);
    const [hideHint, setHideHint] = createSignal(false);
    const [hintFade, setHintFade] = createSignal(false);

    const fallback = () => {
        const fallbackClasses = {
            marginless: true,
            animate__animated: true,
            animate__fadeOut: true,
        };

        return (
            <p classList={fallbackClasses}>
                {joke().joke}
            </p>
        );
    };

    const hintFallback = () => {
        const classes = {
            animate__animated: true,
            animate__rotateOutDownLeft: true,
            hide: hintFade(),
        };

        return (
            <article classList={classes} style="padding-top: 0; margin-top: 0">
                <footer style={{
                    "font-style": "oblique",
                    "font-size": "0.8em",
                    "margin-top": 0,
                    "z-index": 1
                }}>
                    Click to update
                </footer>
            </article>
        );
    };

    const jokeClasses = {
        marginless: true,
        animate__animated: true,
        animate__fadeIn: true,
    };

    const newSuggestion = () => {
        refetch();
        if (!hideHint()) {
            setHideHint(true);
            setTimeout(() => {
                setHintFade(true);
            }, 400);
        }
    }

    return (
        <footer onclick={newSuggestion} style={{ cursor: joke.loading ? 'progress' : '' }}>
            <Show when={joke()} fallback={<article aria-busy="true" style={{ "margin-bottom": 0 }}>icanhazdadjoke.com might be dowm.</article>}>
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

                <Show when={!hideHint()} fallback={hintFallback()}>
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
            </Show>
        </footer >
    );
};