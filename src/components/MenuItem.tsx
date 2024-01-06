import { Component } from "solid-js";
import { Page } from "../interfaces/Page";

interface MenuItemProps {
    setCurrentPage: (page: Page) => void;
    page: Page;
    key: number;
    setActiveItem: (activeItem: number) => void;
    activeItem: () => number;
};

export const MenuItem: Component<MenuItemProps> = ({ setCurrentPage, page, key, setActiveItem, activeItem }: MenuItemProps) => {
    return (
        <li>
            <a
                onClick={() => { setCurrentPage(page); setActiveItem(key) }}
                classList={{
                    pointer: true,
                    animate__animated: true,
                    animate__tada: activeItem() === key,
                    selected: activeItem() === key
                }}
            >
                {page.name}
            </a>
        </li>
    );
};