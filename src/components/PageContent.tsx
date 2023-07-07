import { Component } from "solid-js";
import Page from "../interfaces/Page";
import Footer from "./Footer";

interface PageProps {
  page: () => Page
}

const PageContent: Component<PageProps> = (props: PageProps) => {
  let currentPage = props.page;

  return (
    <article class="animate__animated animate__zoomIn">
      <header>
        <h2 class="no-margin">{currentPage().title}</h2>
      </header>
      {currentPage().body.map((element, index) => {
        return <p innerHTML={element}></p>;
      })}
      <Footer />
    </article>
  );
}

export default PageContent;