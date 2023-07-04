import { Component } from "solid-js";
import Titles from "../interfaces/Titles";

const Title: Component<Titles> = (props: Titles) => {
  return (
    <ul class="animate__animated animate__slideInLeft">
      <li>
        <hgroup>
          <h1>{props.title}</h1>
          <h2>{props.heading}</h2>
        </hgroup>
      </li>
    </ul>
  );
}

export default Title;