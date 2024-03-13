import { Component, createSignal } from "solid-js";

interface TitleProps {
  title: string,
  subtitle: string,
  setActivity: (activity: boolean) => void;
  joke: () => boolean;
  setJoke: (joke: boolean) => void;
  actTop: () => boolean;
  setActTop: (joke: boolean) => void;
};

export const Title: Component<TitleProps> = ({ title, subtitle, setActivity, joke, setJoke, actTop, setActTop }: TitleProps) => {
  const [titleAnimate, setTitleAnimate] = createSignal(false);
  const [subtitleAnimate, setSubtitleAnimate] = createSignal(false);

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

  const titleClasses: any = {
    animate__animated: true,
    animate__fadeInLeft: true,
  };

  return (
    <ul classList={titleClasses}>
      <li>
        <hgroup>
          <h1
            classList={{
              title: true,
              animate__animated: true,
              animate__heartBeat: titleAnimate() === true,
              question: true,
            }}
            onclick={() => { animateTitle(); setActTop(actTop() ? true : !joke()); setActivity(true) }}
          >{title}</h1>
          <h2
            classList={{
              title: true,
              animate__animated: true,
              animate__heartBeat: subtitleAnimate() === true,
              question: true,
            }}
            onclick={() => { animateSubtitle(); setJoke(true) }}
          >{subtitle}</h2>
        </hgroup>
      </li>
    </ul>
  );
};