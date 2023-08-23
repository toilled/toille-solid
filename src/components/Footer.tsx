import { Component, Show, createResource } from "solid-js";

export const Footer: Component = () => {
    const fetchActivity = async () => (await fetch('https://www.boredapi.com/api/activity/')).json();
    const [activity, { refetch }] = createResource(fetchActivity);

    const fallback = () => {
        return (
            <p class="marginless animate__animated animate__fadeOut">{activity().activity}</p>
        )
    };

    return (
        <Show when={activity()} fallback={<article aria-busy="true" />}>
            <article
                class="pointer animate__animated animate__fadeInUp"
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
                    <p class="marginless animate__animated animate__fadeIn">
                        {activity().activity}
                    </p>
                </Show>
            </article>
        </Show>
    );
};