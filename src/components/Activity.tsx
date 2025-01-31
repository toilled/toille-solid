import { Component, Show, createResource, createSignal } from "solid-js";

export const Activity: Component = () => {
    const fetchActivity = async () => (await fetch('https://bored.api.lewagon.com/api/activity')).json();
    const [activity, { refetch }] = createResource(fetchActivity);
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
                {activity().activity}
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
            <article classList={classes} style="padding-top: 0; margin-top: 0; margin-bottom: 0">
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

    const activityClasses = {
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
        <footer onclick={newSuggestion} style={{ cursor: activity.loading ? 'progress' : '' }}>
            <Show when={activity()} fallback={<article aria-busy="true" style={{ "margin-bottom": 0 }}>The Bored API might be dowm.</article>}>
                <article
                    title="Click for a new suggestion"
                    style={{ "margin-bottom": 0 }}
                >
                    <header>
                        <strong>
                            Try this&nbsp;
                            <Show when={!activity.loading} fallback={<>{activity().type}&nbsp;</>}>
                                {activity().type}&nbsp;
                            </Show>
                            activity
                        </strong> (The Bored API)
                    </header>
                    <Show when={!activity.loading} fallback={fallback()}>
                        <p classList={activityClasses}>
                            {activity().activity}
                        </p>
                    </Show>
                </article>

                <Show when={!hideHint()} fallback={hintFallback()}>
                    <article style={{ "padding-top": 0, "margin-top": 0, "margin-bottom": 0 }}>
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