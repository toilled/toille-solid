import { Component } from "solid-js";
import { Page } from "../interfaces/Page";
import { A } from "@solidjs/router";

interface MenuItemProps {
    page: Page;
};

export const MenuItem: Component<MenuItemProps> = ({ page }: MenuItemProps) => {
    return (
        <li>
            <A href={page.link}>
                {page.name}
            </A>
        </li>
    );
};