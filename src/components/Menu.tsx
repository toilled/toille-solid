import { Component, createSignal } from "solid-js";
import { Page } from "../interfaces/Page";
import { MenuItem } from "./MenuItem";

interface MenuProps {
  pages: Page[];
  setCurrentPage: (page: Page) => void;
};

export const Menu: Component<MenuProps> = ({ pages, setCurrentPage }: MenuProps) => {
  const [activeItem, setActiveItem] = createSignal(0);

  return (
    <ul class="animate__animated animate__fadeInRight">
      {pages.map((page, key) => {
        return (<MenuItem setCurrentPage={setCurrentPage} page={page} key={key} setActiveItem={setActiveItem} activeItem={activeItem} />)
      })}
    </ul>
  );
};