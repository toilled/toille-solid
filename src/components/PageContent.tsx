import { Component, For, Show, createEffect, createSignal } from "solid-js";
import pages from '../configs/pages.json';
import { Paragraph } from "./Paragraph";
import { Transition } from "solid-transition-group";
import { useParams } from "@solidjs/router";

export const PageContent: Component = () => {
  const [showHint, setShowHint] = createSignal(false);
  const [page, setPage] = createSignal(pages[0]);

  createEffect(() => {
    const currentPage = pages.find((page) => page.link.slice(1) === useParams().name);
    setPage(currentPage || pages[0]);
  });

  const contentClasses = {
    animate__animated: true,
    animate__zoomIn: true,
  };

  const headingClasses = {
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

  if (useParams().incorrect != undefined) {
    const incorrect = useParams().incorrect;

    const contentClasses = {
      animate__animated: true,
      animate__shakeX: true,
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
          >404 - Page not found
            <Transition onEnter={fadeIn} onExit={fadeOut} >
              <Show when={showHint()}>
                <span style="font-weight: 100;font-style: italic;font-size:0.6em;vertical-align: middle;"> - Nothing here</span>
              </Show>
            </Transition>
          </h2>
        </header>
        <Paragraph paragraph={`The path <strong>${incorrect}</strong> does not exist!`} last={true} />
      </main >
    );
  }

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