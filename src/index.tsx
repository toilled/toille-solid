/* @refresh reload */
import { render } from 'solid-js/web';
import '@picocss/pico';
import 'animate.css';
import './index.css';

import { createSignal, createEffect, Show } from 'solid-js';
import { Title } from "./components/Title";
import { Menu } from "./components/Menu";
import { PageContent } from "./components/PageContent";
import { Footer } from './components/Footer';

import pages from './configs/pages.json';
import titles from './configs/titles.json';

const root = document.getElementById('root');
const [currentPage, setCurrentPage] = createSignal(pages[0]);
const [secret, setSecret] = createSignal(false);

createEffect(() => {
  document.title = "Elliot | " + currentPage().name;
});

render(() => (
  <>
    <nav>
      <Title title={titles.title} subtitle={titles.subtitle} setSecret={setSecret} />
      <Menu pages={pages} setCurrentPage={setCurrentPage} />
    </nav>
    <PageContent page={currentPage} />
    <Show when={secret()}>
      <Footer />
    </Show>
  </>
), root!);
