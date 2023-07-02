import { createSignal, type Component, createEffect } from 'solid-js';

import pages from "./assets/pages.json";
import Title from "./components/Title";
import Menu from "./components/Menu";
import PageContent from "./components/PageContent";

const App: Component = () => {
  const [currentPage, setCurrentPage] = createSignal(pages[0]);

  createEffect(() => {
    document.title = currentPage().title;
  });

  return (
    <>
      <nav>
        <Title />
        <Menu pages={pages} setCurrentPage={setCurrentPage} />
      </nav>
      <PageContent page={currentPage} />
    </>
  );
};

export default App;
