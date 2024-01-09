import { Component, Show, createResource, createSignal } from "solid-js";

export const Footer: Component = () => {
    const fetchActivity = async () => (await fetch('https://www.boredapi.com/api/activity/')).json();
    const [activity, { refetch }] = createResource(fetchActivity);
    const [hideHint, setHideHint] = createSignal(false);

    const fallback = () => {
        const fallbackClasses: any = {
            marginless: true,
            animate__animated: true,
            animate__fadeOut: true,
        };

        return (
            <p classList={fallbackClasses}>{activity().activity}</p>
        );
    };

    const hintFallback = () => {
        const classes: any = {
            animate__animated: true,
            animate__fadeOut: true,
        };

        return (
            <span classList={classes} style="float: right;font-style: oblique;">Click for suggestions</span>
        );
    };

    const footerClasses: any = {
        pointer: true,
        animate__animated: true,
        animate__fadeInUp: true,
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
                        </strong> (The Bored API)<Show when={!hideHint()} fallback={hintFallback()}><span style="float: right;font-style: oblique;">Click for suggestions</span></Show>
                    </header>
                    <Show when={!activity.loading} fallback={fallback()}>
                        <p classList={activityClasses}>
                            {activity().activity}
                        </p>
                    </Show>
                </article>
            </Show>
        </div>
    );
};