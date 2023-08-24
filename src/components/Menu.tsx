import { Component, createSignal } from "solid-js";
import { Page } from "../interfaces/Page";
import { MenuItem } from "./MenuItem";

interface MenuProps {
  pages: Page[];
  setCurrentPage: (page: Page) => void;
};

export const Menu: Component<MenuProps> = ({ pages, setCurrentPage }: MenuProps) => {
  const [activeItem, setActiveItem] = createSignal(0);

  const classes: any = {
    animate__animated: true,
    animate__fadeInRight: true,
  };

  return (
    <ul classList={classes}>
      {pages.map((page, key) => {
        return <MenuItem setCurrentPage={setCurrentPage} page={page} key={key} setActiveItem={setActiveItem} activeItem={activeItem} />
      })}
    </ul>
  );
};