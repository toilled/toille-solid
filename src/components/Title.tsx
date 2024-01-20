import { Component, createSignal } from "solid-js";

interface TitleProps {
  title: string,
  subtitle: string,
  setSecret: (secret: boolean) => void;
};

export const Title: Component<TitleProps> = ({ title, subtitle, setSecret }: TitleProps) => {
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
    pointer: true,
  };

  return (
    <ul classList={titleClasses} onclick={() => { setSecret(true) }}>
      <li>
        <hgroup>
          <h1
            classList={{
              title: true,
              animate__animated: true,
              animate__heartBeat: titleAnimate() === true
            }}
            onclick={animateTitle}
          >{title}</h1>
          <h2
            classList={{
              title: true,
              animate__animated: true,
              animate__heartBeat: subtitleAnimate() === true
            }}
            onclick={animateSubtitle}
          >{subtitle}</h2>
        </hgroup>
      </li>
    </ul>
  );
};