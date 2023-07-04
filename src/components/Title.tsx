import { Component } from "solid-js";

interface TitleProps {
  title: string,
  heading: string
}

const Title: Component<TitleProps> = (props: TitleProps) => {
  return (
    <ul class="animate__animated animate__slideInLeft">
      <li>
        <hgroup>
          <h1>Elliot Dickerson</h1>
          <h2>A site to test things</h2>
        </hgroup>
      </li>
    </ul>
  );
}

export default Title;