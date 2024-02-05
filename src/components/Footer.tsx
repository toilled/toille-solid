import { Component, Show, createResource, createSignal } from "solid-js";

export const Footer: Component = () => {
    const fetchActivity = async () => (await fetch('https://www.boredapi.com/api/activity/')).json();
    const [activity, { refetch }] = createResource(fetchActivity);
    const [hideHint, setHideHint] = createSignal(false);
    const [hintFade, setHintFade] = createSignal(false);

    const fallback = () => {
        const fallbackClasses: any = {
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
        const classes: any = {
            animate__animated: true,
            animate__rotateOutDownLeft: true,
            hide: hintFade(),
        };

        return (
            <article classList={classes} style="padding-top: 0; margin-top: 0">
                <footer style={{
                    "font-style": "oblique",
                    "font-size": "0.8em",
                    "padding": "0.8em",
                    "padding-left": "var(--block-spacing-horizontal)",
                    "margin-top": 0,
                    "z-index": 1
                }}>
                    Click to update
                </footer>
            </article>
        );
    };

    const footerClasses: any = {
        animate__animated: true,
        animate__bounceInUp: true,
    };

    const activityClasses: any = {
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
            }, 600);
        }
    }

    return (
        <div classList={footerClasses} onclick={newSuggestion} style={{ cursor: activity.loading ? 'progress' : '' }}>
            <Show when={activity()} fallback={<article aria-busy="true"><header /></article>}>
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
            </Show>

            <Show when={!hideHint()} fallback={hintFallback()}>
                <article style={{ "padding-top": 0, "margin-top": 0 }}>
                    <footer style={{
                        "font-style": "oblique",
                        "font-size": "0.8em",
                        "padding": "0.8em",
                        "padding-left": "var(--block-spacing-horizontal)",
                        "margin-top": 0
                    }}>
                        Click to update
                    </footer>
                </article>
            </Show>
        </div >
    );
};