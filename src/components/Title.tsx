import { Component } from "solid-js";

interface TitleProps {
  title: string;
  subtitle: string;
  isActivityActive: () => boolean;
  setIsActivityActive: (activity: boolean) => void;
  isJokeActive: () => boolean;
  setIsJokeActive: (joke: boolean) => void;
}

export const Title: Component<TitleProps> = ({
  title,
  subtitle,
  isActivityActive,
  setIsActivityActive,
  isJokeActive,
  setIsJokeActive,
}: TitleProps) => {
  
  return (
    <ul>
      <li>
        <hgroup>
          <h1
            classList={{
              title: true,
              question: true,
            }}
            onMouseDown={() => setIsActivityActive(!isActivityActive())}
          >
            {title}
          </h1>
          <h2
            classList={{
              title: true,
              question: true,
            }}
            onMouseDown={() => setIsJokeActive(!isJokeActive())}
          >
            {subtitle}
          </h2>
        </hgroup>
      </li>
    </ul>
  );
};