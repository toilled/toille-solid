/* @refresh reload */
import { render } from 'solid-js/web';
import '@picocss/pico';
import 'animate.css';
import './index.css';

import { createSignal, type Component, createEffect } from 'solid-js';
import { Title } from "./components/Title";
import { Menu } from "./components/Menu";
import { PageContent } from "./components/PageContent";
import { Footer } from './components/Footer';

import pagesConfig from './configs/pages.json';
import titlesConfig from './configs/titles.json';

const root = document.getElementById('root');

const [titles] = createSignal(titlesConfig);
const [pages] = createSignal(pagesConfig);
const [currentPage, setCurrentPage] = createSignal(pages()[0]);

createEffect(() => {
  document.title = "Elliot | " + currentPage().name;
});

render(() => (
  <>
    <nav>
      <Title title={titles().title} subtitle={titles().subtitle} />
      <Menu pages={pages()} setCurrentPage={setCurrentPage} />
    </nav>
    <PageContent page={currentPage} />
    <Footer />
  </>
), root!);
