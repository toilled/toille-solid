import { Component, createSignal } from "solid-js";
import Page from "../interfaces/Page";

interface MenuProps {
  pages: Page[];
  setCurrentPage: (page: Page) => void;
}

const Menu: Component<MenuProps> = ({ pages, setCurrentPage }: MenuProps) => {
  const [activeItem, setActiveItem] = createSignal(0);

  return (
    <ul class="animate__animated animate__fadeInRight">
      {pages.map((page, key) => {
        return (
          <li
              onClick={() => { setCurrentPage(page); setActiveItem(key) }}
              classList={{
                pointer: true,
                animate__animated: true,
                animate__rubberBand: activeItem() === key,
                selected: activeItem() === key
              }}
            >
              {page.name}
          </li>
        );
      })}
    </ul>
  );
}

export default Menu;