/* @refresh reload */
import { render } from 'solid-js/web';
import '@picocss/pico';
import 'animate.css';
import './index.css';

import { createSignal, createEffect, Show } from 'solid-js';
import { Title } from "./components/Title";
import { Menu } from "./components/Menu";
import { PageContent } from "./components/PageContent";
import { Hint } from './components/Hint';
import { Activity } from './components/Activity';
import { Joke } from './components/Joke';

import pages from './configs/pages.json';
import titles from './configs/titles.json';

const root = document.getElementById('root');
const [currentPage, setCurrentPage] = createSignal(pages[0]);
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
        setActivity={setActivity}
        joke={joke}
        setJoke={setJoke}
        actTop={actTop}
        activity={activity}
        setActTop={setActTop}
      />
      <Menu pages={pages} setCurrentPage={setCurrentPage} />
    </nav>
    <PageContent page={currentPage} />
    <Hint activity={activity} joke={joke} />
    <Show when={activity() && actTop()}>
      <Activity />
    </Show>
    <Show when={joke()}>
      <Joke />
    </Show>
    <Show when={activity() && !actTop()}>
      <Activity />
    </Show>
  </>
), root!);
