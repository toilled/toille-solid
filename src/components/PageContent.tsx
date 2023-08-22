import { Component } from "solid-js";
import { Page } from "../interfaces/Page";
import { Paragraph } from "./Paragraph";

interface PageProps {
  page: () => Page
};

export const PageContent: Component<PageProps> = ({ page }: PageProps) => {
  return (
    <article class="animate__animated animate__zoomIn">
      <header>
        <h2 class="marginless title">{page().title}</h2>
      </header>
      {page().body.map((paragraph, index) => {
        return <Paragraph paragraph={paragraph} index={index} total={page().body.length} />
      })}
    </article>
  );
};