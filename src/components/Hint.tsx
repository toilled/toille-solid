import { Component, Show, createSignal } from "solid-js";

interface HintProps {
    activity: () => boolean;
    joke: () => boolean;
}

export const Hint: Component<HintProps> = ({ activity, joke }: HintProps) => {
    const [hintFade, setHintFade] = createSignal(true);
    const [showHint, setShowHint] = createSignal(false);

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

        return (
            <footer classList={animationClasses}>
                <article>The titles might be clickable...</article>
            </footer>
        );
    };

    setTimeout(() => {
        setHintFade(false);
        setShowHint(true);
    }, 3000);

    setTimeout(() => {
        setShowHint(false);
    }, 5000);

    setTimeout(() => {
        setHintFade(true);
    }, 5400);

    return (
        <Show when={!activity() && !joke()}>
            <Show when={showHint()} fallback={fallback()}>
                <footer classList={animationClasses}>
                    <article>The titles might be clickable...</article>
                </footer>
            </Show>
        </Show>
    )
}