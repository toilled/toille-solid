/* @refresh reload */
import { render } from 'solid-js/web';
import '@picocss/pico';
import 'animate.css';

import './index.css';
import App from './App';
import { Show, createResource } from 'solid-js';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found.',
  );
}

const fetchTitles = async () => (await fetch('http://toille.uk/api/titles')).json();
const [titles] = createResource(fetchTitles);

const fetchPages = async () => (await fetch('http://toille.uk/api/pages')).json();
const [pages] = createResource(fetchPages);

render(() => (
  <>
    <Show when={titles() && pages()} fallback={<h1 class="animate__animated animate__zoomIn">Loading...</h1>}>
      <App titles={titles()} pages={pages()} />
    </Show>
  </>
), root!);
