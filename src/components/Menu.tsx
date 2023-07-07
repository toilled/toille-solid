import { Component, createSignal } from "solid-js";
import Page from "../interfaces/Page";

interface MenuProps {
  pages: Page[];
  setCurrentPage: (page: Page) => void;
}

const Menu: Component<MenuProps> = (props: MenuProps) => {
  const [activeItem, setActiveItem] = createSignal(0);

  return (
    <ul class="animate__animated animate__slideInRight">
      {props.pages.map((page, key) => {
        return (
          <li>
            <a
              onClick={() => { props.setCurrentPage(page); setActiveItem(key) }}
              classList={{
                pointer: true,
                animate__animated: true,
                animate__rubberBand: activeItem() === key,
                selected: activeItem() === key
              }}
            >{page.name}</a>
          </li>);
      })}
    </ul>
  );
}

export default Menu;