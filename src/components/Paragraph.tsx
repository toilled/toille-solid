import { Component } from "solid-js";

interface ParagraphProps {
    paragraph: string;
    index: number;
};

export const Paragraph: Component<ParagraphProps> = ({ paragraph, index }: ParagraphProps) => {
    const paragraphClasses = { marginless: false };
    if (index + 1 === paragraph.length) {
        paragraphClasses.marginless = true;
    }

    return (
        <p innerHTML={paragraph} classList={paragraphClasses}></p>
    )
};