import { Component } from "solid-js";
import Page from "../interfaces/Page";

interface PageProps {
  page: () => Page
}

const PageContent: Component<PageProps> = ({ page }: PageProps) => {

  return (
    <article class="animate__animated animate__zoomIn">
      <header>
        <h2 class="marginless">{page().title}</h2>
      </header>
      {page().body.map((element, index) => {
        const paragraphClasses = { marginless: false };
        if (index + 1 === page().body.length) {
          paragraphClasses.marginless = true;
        }
        return <p innerHTML={element} classList={paragraphClasses}></p>;
      })}
    </article>
  );
}

export default PageContent;