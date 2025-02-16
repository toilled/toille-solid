import { Component } from "solid-js";

interface TitleProps {
  title: string,
  subtitle: string,
  activity: () => boolean,
  setActivity: (activity: boolean) => void;
  joke: () => boolean;
  setJoke: (joke: boolean) => void;
}

export const Title: Component<TitleProps> = ({ title, subtitle, activity, setActivity, joke, setJoke }: TitleProps) => {
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
              setActivity(!activity());
            } }
          >{ title }</h1>
          <h2
            classList={ {
              title: true,
              question: true,
            } }
            onMouseDown={ () => {
              setJoke(!joke());
            } }
          >{ subtitle }</h2>
        </hgroup>
      </li>
    </ul>
  );
};