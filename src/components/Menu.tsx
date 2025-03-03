import { Component, For } from "solid-js";
import { Page } from "../interfaces/Page";
import { MenuItem } from "./MenuItem";

interface MenuProps {
  pages: Page[];
}

export const Menu: Component<MenuProps> = ({ pages }: MenuProps) => {
  return (
    <ul>
      <For each={pages}>{(page) => <MenuItem page={page} />}</For>
    </ul>
  );
};
