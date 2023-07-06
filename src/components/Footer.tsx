import { Component } from "solid-js";
import Activity from "../interfaces/Activity";

interface FooterProps {
    activity: Activity;
    refetch: () => void;
}

const Footer: Component<FooterProps> = (props: FooterProps) => {
    return (
        <footer
            class="animate__animated animate__fadeInUp"
            onclick={props.refetch}
            title="Click for a new suggestion"
            style="cursor: pointer"
        >
            <p>
                <a>Try this:</a> {props.activity.activity}
            </p>
        </footer>
    );
}

export default Footer;