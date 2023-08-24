import { Component } from "solid-js";
import { Page } from "../interfaces/Page";
import { Paragraph } from "./Paragraph";

interface PageProps {
  page: () => Page
};

export const PageContent: Component<PageProps> = ({ page }: PageProps) => {
  const contentClasses: any = {
    animate__animated: true,
    animate__zoomIn: true,
  };

  const headingClasses: any = {
    marginless: true,
    title: true,
  };

  return (
    <article classList={contentClasses}>
      <header>
        <h2 classList={headingClasses}>{page().title}</h2>
      </header>
      {page().body.map((paragraph, index) => {
        return <Paragraph paragraph={paragraph} last={index + 1 === page().body.length} />;
      })}
    </article>
  );
};