import { Component, createSignal, For, Show } from "solid-js";
import pages from "../configs/pages.json";
import { Paragraph } from "./Paragraph";
import { Transition } from "solid-transition-group";
import { fadeIn, fadeOut } from "../transitions/fades";
import { useParams } from "@solidjs/router";

export const PageContent: Component = () => {
  const [showHint, setShowHint] = createSignal<boolean>(false);
  const params = useParams();

  const headingClasses = {
    title: true,
  };

  const page = () => {
    return pages.find((p) => p.link.slice(1) === params.name) || pages[0];
  };

  return (
    <Show
      when={params.incorrect === undefined}
      fallback={
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
            paragraph={`The page <strong>${params.incorrect}</strong> does not exist!`}
            last={true}
          />
        </main>
      }
    >
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
    </Show>
  );
};