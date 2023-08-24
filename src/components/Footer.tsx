import { Component, Show, createResource } from "solid-js";

export const Footer: Component = () => {
    const fetchActivity = async () => (await fetch('https://www.boredapi.com/api/activity/')).json();
    const [activity, { refetch }] = createResource(fetchActivity);

    const fallback = () => {
        const fallbackClasses: any = {
            marginless: true,
            animate__animated: true,
            animate__fadeOut: true,
        };

        return (
            <p classList={fallbackClasses}>{activity().activity}</p>
        )
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

    return (
        <Show when={activity()} fallback={<article aria-busy="true" />}>
            <article
                classList={footerClasses}
                onclick={refetch}
                title="Click for a new suggestion"
            >
                <header>
                    <strong>
                        Try this&nbsp;
                        <Show when={!activity.loading} fallback={<>{activity().type}&nbsp;</>}>
                            {activity().type}&nbsp;
                        </Show>
                        activity&nbsp;
                    </strong> (The Bored API)
                </header>
                <Show when={!activity.loading} fallback={fallback()}>
                    <p classList={activityClasses}>
                        {activity().activity}
                    </p>
                </Show>
            </article>
        </Show>
    );
};