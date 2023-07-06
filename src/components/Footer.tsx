import { Component, Show, createResource } from "solid-js";

const Footer: Component = () => {
    const fetchActivity = async () => (await fetch('http://www.boredapi.com/api/activity/')).json();
    const [activity, { refetch }] = createResource(fetchActivity);

    return (
        <Show when={activity()}>
            <footer
                class="animate__animated animate__fadeInUp"
                onclick={refetch}
                title="Click for a new suggestion"
                style="cursor: pointer; user-select: none;"
            >
                <p>
                    <strong>Try this activity:</strong> {activity().activity}
                </p>
            </footer>
        </Show>
    );
}

export default Footer;