import { Component } from "solid-js";
import Page from "../interfaces/Page";

interface MenuProps {
  pages: Page[];
  setCurrentPage: (page: Page) => void;
}

const Menu: Component<MenuProps> = (props: MenuProps) => {
  return <ul class="animate__animated animate__slideInRight">
    {props.pages.map(page => {
      return <li onClick={() => props.setCurrentPage(page)}><a class='pointer'>{page.name}</a></li>;
    })}
  </ul>;
}

export default Menu;