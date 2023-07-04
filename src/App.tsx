import { createSignal, type Component, createEffect, createResource } from 'solid-js';
import Page from "./interfaces/Page";

import '@picocss/pico';

import Title from "./components/Title";
import Menu from "./components/Menu";
import PageContent from "./components/PageContent";

const App: Component<{ pages: Page[] }> = (props: { pages: Page[] }) => {
  const [currentPage, setCurrentPage] = createSignal(props.pages[0]);

  createEffect(() => {
    document.title = "Elliot | " + currentPage().name;
  });

  return (
    <>
      <nav>
        <Title />
        <Menu pages={props.pages} setCurrentPage={setCurrentPage} />
      </nav>
      <PageContent page={currentPage} />
    </>
  );
};

export default App;