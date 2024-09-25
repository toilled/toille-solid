import { Component, Show, createSignal } from "solid-js";
import { Page } from "../interfaces/Page";
import { Paragraph } from "./Paragraph";

interface PageProps {
  page: () => Page
};

export const PageContent: Component<PageProps> = ({ page }: PageProps) => {
  const [showHint, setShowHint] = createSignal(false);

  const contentClasses: any = {
    animate__animated: true,
    animate__zoomIn: true,
  };

  const headingClasses: any = {
    title: true,
  };

  return (
    <main classList={contentClasses}>
      <header>
        <h2
          classList={headingClasses}
          onMouseDown={() => {
            setShowHint(true);
            setTimeout(() => {
              setShowHint(false);
            }, 500);
          }}
        >{page().title}
          <Show when={showHint()}>
            <span
              classList={{ animate__animated: true, animate__zoomIn: true, }}
              style="font-weight: 100;font-style: italic;font-size:0.6em;vertical-align: middle;"
            > - Nothing here</span>
          </Show>
        </h2>
      </header>
      {page().body.map((paragraph, index) => {
        return <Paragraph paragraph={paragraph} last={index + 1 === page().body.length} />;
      })}
    </main>
  );
};