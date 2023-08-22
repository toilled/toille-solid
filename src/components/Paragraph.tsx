import { Component } from "solid-js";

interface ParagraphProps {
    paragraph: string;
    index: number;
    total: number;
};

export const Paragraph: Component<ParagraphProps> = ({ paragraph, index, total }: ParagraphProps) => {
    const paragraphClasses = { marginless: false };
    if (index + 1 === total) {
        paragraphClasses.marginless = true;
    }

    return (
        <p innerHTML={paragraph} classList={paragraphClasses}></p>
    )
};