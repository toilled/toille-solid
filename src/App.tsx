import '@picocss/pico';
import 'animate.css';
import { createSignal, type Component, createEffect } from 'solid-js';
import Titles from './interfaces/Titles';
import Page from "./interfaces/Page";
import Title from "./components/Title";
import Menu from "./components/Menu";
import PageContent from "./components/PageContent";
import Footer from './components/Footer';

interface AppProps {
  titles: Titles,
  pages: Page[]
}

const App: Component<AppProps> = (props: AppProps) => {
  const [currentPage, setCurrentPage] = createSignal(props.pages[0]);

  createEffect(() => {
    document.title = "Elliot | " + currentPage().name;
  });

  return (
    <main class="container">
      <nav>
        <Title title={props.titles.title} heading={props.titles.heading} />
        <Menu pages={props.pages} setCurrentPage={setCurrentPage} />
      </nav>
      <PageContent page={currentPage} />
    </main>
  );
};

export default App;