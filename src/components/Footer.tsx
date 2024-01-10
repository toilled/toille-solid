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
            animate__fadeOut: true,
            hide: hintFade(),
        };

        return (
            <footer classList={classes} style="font-style: oblique; font-size: 0.8em; padding: 0.8em; padding-left: var(--block-spacing-horizontal);">
                Click to update
            </footer>
        );
    };

    const footerClasses: any = {
        pointer: true,
        animate__animated: true,
        animate__zoomIn: true,
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
        <div classList={footerClasses}>
            <Show when={activity()} fallback={<article aria-busy="true"><header /></article>}>
                <article
                    onclick={newSuggestion}
                    title="Click for a new suggestion"
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
                    <Show when={!hideHint()} fallback={hintFallback()}>
                        <footer style="font-style: oblique; font-size: 0.8em; padding: 0.8em; padding-left: var(--block-spacing-horizontal);">
                            Click to update
                        </footer>
                    </Show>
                </article>
            </Show>
        </div>
    );
};