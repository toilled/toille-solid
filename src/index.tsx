/* @refresh reload */
import { render } from "solid-js/web";
import "@picocss/pico";
import "./index.css";

import { Component, createEffect, createSignal, Show } from "solid-js";
import { Title } from "./components/Title";
import { Menu } from "./components/Menu";
import { PageContent } from "./components/PageContent";
import { Checker } from "./components/Checker";
import { Activity } from "./components/Activity";
import { Suggestion } from "./components/Suggestion";

import pages from "./configs/pages.json";
import titles from "./configs/titles.json";
import { Transition } from "solid-transition-group";
import {
  MatchFilters,
  Navigate,
  Route,
  Router,
  RouteSectionProps,
  useParams,
} from "@solidjs/router";

const Layout: Component<RouteSectionProps> = (props) => {
  const [checker, setChecker] = createSignal<boolean>(false);
  const [activity, setActivity] = createSignal<boolean>(false);
  const [joke, setJoke] = createSignal<boolean>(false);
  const [showHint, setShowHint] = createSignal<boolean>(false);

  createEffect(() => {
    const currentPage = pages.find(
      (page) => page.link.slice(1) === useParams().name,
    );
    document.title = "Elliot > " + (currentPage || pages[0]).title;
  });

  setTimeout(() => {
    setShowHint(true);
  }, 2000);

  setTimeout(() => {
    setShowHint(false);
  }, 5000);

  const fadeIn = (el: Element, done: () => void): void => {
    const a = el.animate([{ opacity: 0, height: 0 }, { opacity: 1 }], {
      duration: 600,
    });
    a.finished.then(done);
  };
  const fadeOut = (el: Element, done: () => void): void => {
    const a = el.animate([{ opacity: 1 }, { opacity: 0, height: 0 }], {
      duration: 600,
    });
    a.finished.then(done);
  };

  function noFootersShowing() {
    return !activity() && !checker() && !joke();
  }

  return (
    <>
      <nav>
        <Title
          title={titles.title}
          subtitle={titles.subtitle}
          activity={activity}
          setActivity={setActivity}
          joke={joke}
          setJoke={setJoke}
        />
        <Menu pages={pages} />
      </nav>
      {props.children}
      <Transition onEnter={fadeIn} onExit={fadeOut}>
        <Show when={noFootersShowing() && showHint()}>
          <footer onClick={() => setChecker(true)}>
            The titles might be clickable...
          </footer>
        </Show>
      </Transition>
      <Transition onEnter={fadeIn} onExit={fadeOut}>
        <Show when={checker()}>
          <Checker />
        </Show>
      </Transition>
      <Transition onEnter={fadeIn} onExit={fadeOut}>
        <Show when={activity()}>
          <Activity />
        </Show>
      </Transition>
      <Transition onEnter={fadeIn} onExit={fadeOut}>
        <Show when={joke()}>
          <Suggestion
            url="https://icanhazdadjoke.com/"
            valueName="joke"
            title="Have a laugh!"
          />
        </Show>
      </Transition>
    </>
  );
};

const root = document.getElementById("root");
const filters: MatchFilters = {
  name: pages.map((page) => {
    return page.link.slice(1);
  }),
};

render(
  () => (
    <Router root={Layout}>
      <Route path="/" component={() => <Navigate href={pages[0].link} />} />
      <Route path="/:name?" component={PageContent} matchFilters={filters} />
      <Route path="/checker" component={Checker} />
      <Route path="*incorrect" component={PageContent} />
    </Router>
  ),
  root!,
);
