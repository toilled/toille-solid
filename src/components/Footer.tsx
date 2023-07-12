import { Component, Show, createResource } from "solid-js";

const Footer: Component = () => {
    const fetchActivity = async () => (await fetch('http://www.boredapi.com/api/activity/')).json();
    const [activity, { refetch }] = createResource(fetchActivity);

    return (
        <Show when={activity()}>
            <article
                class="pointer animate__animated animate__zoomIn"
                onclick={refetch}
                title="Click for a new suggestion"
            >
                <header>
                    <strong>Try this activity</strong> (The Bored API)
                </header>
                <p class="marginless">
                    {activity().activity}
                </p>
            </article>
        </Show>
    );
}

export default Footer;