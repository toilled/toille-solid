import { Component, createSignal } from "solid-js";

interface TitleProps {
  title: string,
  subtitle: string,
  activity: () => boolean,
  setActivity: (activity: boolean) => void;
  joke: () => boolean;
  setJoke: (joke: boolean) => void;
}

export const Title: Component<TitleProps> = ({ title, subtitle, activity, setActivity, joke, setJoke }: TitleProps) => {
  const [ titleAnimate, setTitleAnimate ] = createSignal(false);
  const [ subtitleAnimate, setSubtitleAnimate ] = createSignal(false);

  function animateTitle() {
    if (!titleAnimate()) {
      setTitleAnimate(true);
      setTimeout(() => setTitleAnimate(false), 900);
    }
  }

  function animateSubtitle() {
    if (!subtitleAnimate()) {
      setSubtitleAnimate(true);
      setTimeout(() => setSubtitleAnimate(false), 900);
    }
  }

  return (
    <ul>
      <li>
        <hgroup>
          <h1
            classList={ {
              title: true,
              question: true,
            } }
            onMouseDown={ () => {
              animateTitle();
              setActivity(!activity());
            } }
          >{ title }</h1>
          <h2
            classList={ {
              title: true,
              question: true,
            } }
            onMouseDown={ () => {
              animateSubtitle();
              setJoke(!joke());
            } }
          >{ subtitle }</h2>
        </hgroup>
      </li>
    </ul>
  );
};