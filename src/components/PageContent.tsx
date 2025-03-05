import { Component, createEffect, createSignal, For, Show } from "solid-js";
import pages from "../configs/pages.json";
import { Paragraph } from "./Paragraph";
import { Transition } from "solid-transition-group";
import { fadeIn, fadeOut } from "../transitions/fades";
import { useParams } from "@solidjs/router";
import { Page } from "../interfaces/Page";

export const PageContent: Component = () => {
  const [showHint, setShowHint] = createSignal<boolean>(false);
  const [page, setPage] = createSignal<Page>(pages[0]);

  const headingClasses = {
    title: true,
  };

  if (useParams().incorrect != undefined) {
    const incorrect = useParams().incorrect;

    return (
      <main>
        <header>
          <h2
            classList={headingClasses}
            onMouseDown={() => {
              setShowHint(true);
              setTimeout(() => {
                setShowHint(false);
              }, 500);
            }}
          >
            404 - Page not found
          </h2>
        </header>
        <Paragraph
          paragraph={`The page <strong>${incorrect}</strong> does not exist!`}
          last={true}
        />
      </main>
    );
  }

  createEffect(() => {
    const currentPage = pages.find(
      (page) => page.link.slice(1) === useParams().name,
    );
    setPage(currentPage || pages[0]);
  });

  return (
    <main>
      <header>
        <h2
          classList={headingClasses}
          onMouseDown={() => {
            setShowHint(true);
            setTimeout(() => {
              setShowHint(false);
            }, 500);
          }}
        >
          {page().title}
          <Transition onEnter={fadeIn} onExit={fadeOut}>
            <Show when={showHint()}>
              <span style="font-weight: 100;font-style: italic;font-size:0.6em;vertical-align: middle;">
                {" "}
                - Nothing here
              </span>
            </Show>
          </Transition>
        </h2>
      </header>
      <For each={page().body}>
        {(paragraph, index) => (
          <Paragraph
            paragraph={paragraph}
            last={index() + 1 === page().body.length}
          />
        )}
      </For>
    </main>
  );
};
