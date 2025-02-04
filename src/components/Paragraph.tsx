import { Component } from "solid-js";

interface ParagraphProps {
    paragraph: string;
    last: boolean;
};

export const Paragraph: Component<ParagraphProps> = ({ paragraph, last }: ParagraphProps) => {
    return <p innerHTML={paragraph}></p >;
};