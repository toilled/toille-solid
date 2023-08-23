import { Component, createSignal } from "solid-js";

interface TitleProps {
  title: string,
  subtitle: string
};

export const Title: Component<TitleProps> = ({ title, subtitle }: TitleProps) => {
  const [titleAnimate, setTitleAnimate] = createSignal(false);
  const [subtitleAnimate, setSubtitleAnimate] = createSignal(false);

  return (
    <ul class="animate__animated animate__fadeInLeft pointer">
      <li>
        <hgroup>
          <h1
            classList={{
              title: true,
              animate__animated: true,
              animate__heartBeat: titleAnimate() === true
            }}
            onclick={() => {
              if (!titleAnimate()) {
                setTitleAnimate(true);
                setTimeout(() => setTitleAnimate(false), 900)
              }
            }}
          >{title}</h1>
          <h2
            classList={{
              title: true,
              animate__animated: true,
              animate__heartBeat: subtitleAnimate() === true
            }}
            onclick={() => {
              if (!subtitleAnimate()) {
                setSubtitleAnimate(true);
                setTimeout(() => setSubtitleAnimate(false), 900)
              }
            }}
          >{subtitle}</h2>
        </hgroup>
      </li>
    </ul>
  );
};