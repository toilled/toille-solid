import { Component, For, Show, createSignal } from "solid-js";
import { Page } from "../interfaces/Page";
import { Paragraph } from "./Paragraph";
import { Transition } from "solid-transition-group";

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

  const fadeIn = (el: Element, done: () => void): void => {
    const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 500
    });
    a.finished.then(done);
  };
  const fadeOut = (el: Element, done: () => void): void => {
    const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 500
    });
    a.finished.then(done);
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
          <Transition onEnter={fadeIn} onExit={fadeOut} >
            <Show when={showHint()}>
              <span style="font-weight: 100;font-style: italic;font-size:0.6em;vertical-align: middle;"> - Nothing here</span>
            </Show>
          </Transition>
        </h2>
      </header>
      <For each={page().body}>{
        (paragraph, index) => <Paragraph paragraph={paragraph} last={index() + 1 === page().body.length} />
      }</For>
    </main >
  );
};