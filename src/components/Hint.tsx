import { Component, Show, createResource, createSignal } from "solid-js";

interface HintProps {
    activity: () => boolean;
    joke: () => boolean;
}

export const Hint: Component<HintProps> = ({ activity, joke }: HintProps) => {
    const [hintFade, setHintFade] = createSignal(false);

    const animationClasses: any = {
        animate__animated: true,
        animate__zoomIn: true,
    };

    const fallback = () => {
        const animationClasses: any = {
            animate__animated: true,
            animate__zoomOut: true,
            hide: hintFade(),
        };

        setTimeout(() => {
            setHintFade(true);
        }, 400);

        return (
            <footer classList={animationClasses}>
                <article>I won't what happens when you click things?</article>
            </footer>
        );
    };

    return (
        <Show when={!activity() && !joke()} fallback={fallback()}>
            <footer classList={animationClasses}>
                <article>I wonder what happens when you click things like titles?</article>
            </footer>
        </Show>
    )
}