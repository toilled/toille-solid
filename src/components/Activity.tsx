import { Component, Show, createResource, createSignal } from "solid-js";
import { Transition } from "solid-transition-group";

const Activity: Component = () => {
    const fetchActivity = async () => (await fetch('https://bored.api.lewagon.com/api/activity')).json();
    const [activity, { refetch }] = createResource(fetchActivity);
    const [hideHint, setHideHint] = createSignal(false);

    const fallback = () => {
        const fallbackClasses = {
            marginless: true,
        };

        return (
            <p classList={fallbackClasses}>
                {activity().activity}
            </p>
        );
    };

    const activityClasses = {
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
                <p classList={activityClasses} aria-busy="true">
                    The Bored API might be dowm.
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
        <footer onclick={newSuggestion} style={{ cursor: activity.loading ? 'progress' : '' }}>
            <Show when={activity()} fallback={errorFallback()}>
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

                <Transition onExit={fadeOut} >
                    <Show when={!hideHint()}>
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
                </Transition>
            </Show>
        </footer >
    );
};

export default Activity;