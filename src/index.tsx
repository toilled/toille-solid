/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import { Show, Suspense, createResource } from 'solid-js';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

const fetchTitles = async () => (await fetch('http://toille.uk/api/titles')).json();
const [titles] = createResource(fetchTitles);

const fetchPages = async () => (await fetch('http://toille.uk/api/pages')).json();
const [pages] = createResource(fetchPages);

render(() => (
  <Suspense>
    <Show when={titles() && pages()}>
      <App titles={titles()} pages={pages()} />
    </Show>
  </Suspense>
), root!);
