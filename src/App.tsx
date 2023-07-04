import '@picocss/pico';
import { createSignal, type Component, createEffect, createResource, Suspense, Show } from 'solid-js';
import Page from "./interfaces/Page";
import Title from "./components/Title";
import Menu from "./components/Menu";
import PageContent from "./components/PageContent";

const App: Component<{ pages: Page[] }> = (props: { pages: Page[] }) => {
  const fetchTitles = async () => (await fetch('http://toille.uk/api/titles')).json();
  const [titles] = createResource(fetchTitles);

  const [currentPage, setCurrentPage] = createSignal(props.pages[0]);

  createEffect(() => {
    document.title = "Elliot | " + currentPage().name;
  });

  return (
    <>
      <nav>
        <Suspense fallback={<p>Loading...</p>}>
          <Show when={titles()}>
            <Title title={titles().title} heading={titles().heading} />
          </Show>
        </Suspense>
        <Menu pages={props.pages} setCurrentPage={setCurrentPage} />
      </nav>
      <PageContent page={currentPage} />
    </>
  );
};

export default App;