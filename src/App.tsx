import { createSignal, type Component, createEffect } from 'solid-js';
import { Titles } from './interfaces/Titles';
import { Page } from "./interfaces/Page";
import { Title } from "./components/Title";
import { Menu } from "./components/Menu";
import { PageContent } from "./components/PageContent";
import { Footer } from './components/Footer';

interface AppProps {
  titles: Titles,
  pages: Page[]
};

export const App: Component<AppProps> = ({ titles, pages }: AppProps) => {
  const [currentPage, setCurrentPage] = createSignal(pages[0]);

  createEffect(() => {
    document.title = "Elliot | " + currentPage().name;
  });

  return (
    <>
      <nav>
        <Title title={titles.title} subtitle={titles.subtitle} />
        <Menu pages={pages} setCurrentPage={setCurrentPage} />
      </nav>
      <PageContent page={currentPage} />
      <Footer />
    </>
  );
};