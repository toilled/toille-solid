/* @refresh reload */
import { render } from 'solid-js/web';
import '@picocss/pico';
import 'animate.css';

import './index.css';
import { App } from './App';
import { createSignal } from 'solid-js';

import pagesConfig from './configs/pages.json';
import titlesConfig from './configs/titles.json';

const root = document.getElementById('root');

const [titles] = createSignal(titlesConfig);
const [pages] = createSignal(pagesConfig);

render(() => (
  <>
    <App titles={titles()} pages={pages()} />
  </>
), root!);
