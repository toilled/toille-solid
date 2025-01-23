/* @refresh reload */
import { render } from 'solid-js/web';
import '@picocss/pico';
import 'animate.css';
import './index.css';

import { createSignal, createEffect, Show } from 'solid-js';
import { Title } from "./components/Title";
import { Menu } from "./components/Menu";
import { PageContent } from "./components/PageContent";
import { Checker } from "./components/Checker";
import { Hint } from './components/Hint';
import { Activity } from './components/Activity';
import { Joke } from './components/Joke';

import pages from './configs/pages.json';
import titles from './configs/titles.json';
import { Transition } from "solid-transition-group"

const root = document.getElementById('root');
const [currentPage, setCurrentPage] = createSignal(pages[0]);
const [checker, setChecker] = createSignal(false);
const [activity, setActivity] = createSignal(false);
const [joke, setJoke] = createSignal(false);
const [actTop, setActTop] = createSignal(false);

createEffect(() => {
  document.title = "Elliot | " + currentPage().name;
});

render(() => (
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
      <Menu pages={pages} setCurrentPage={setCurrentPage} />
    </nav>
    <PageContent page={currentPage} />
    <div onClick={() => setChecker(true)}>
      <Hint checker={checker} activity={activity} joke={joke} />
    </div>
    <Transition
      onEnter={(el, done) => {
        const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 600
        });
        a.finished.then(done);
      }}
      onExit={(el, done) => {
        const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 600
        });
        a.finished.then(done);
      }}
    >
      <Show when={checker()}>
        <Checker />
      </Show>
    </Transition>
    <Transition
      onEnter={(el, done) => {
        const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 600
        });
        a.finished.then(done);
      }}
      onExit={(el, done) => {
        const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 600
        });
        a.finished.then(done);
      }}
    >
      <Show when={activity()}>
        <Activity />
      </Show>
    </Transition>
    <Transition
      onEnter={(el, done) => {
        const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 600
        });
        a.finished.then(done);
      }}
      onExit={(el, done) => {
        const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 600
        });
        a.finished.then(done);
      }}
    >
      <Show when={joke()}>
        <Joke />
      </Show>
    </Transition>
  </>
), root!);
