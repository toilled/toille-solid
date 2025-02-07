import { Component } from "solid-js";

interface ParagraphProps {
  paragraph: string;
  last: boolean;
}

export const Paragraph: Component<ParagraphProps> = ({ paragraph, last }: ParagraphProps) => {
  const paragraphClasses = {
    marginless: false,
  };
  if (last) {
    paragraphClasses.marginless = true;
  }

  return <p innerHTML={ paragraph } classList={ paragraphClasses }></p>;
};