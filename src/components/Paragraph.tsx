import { Component } from "solid-js";

interface ParagraphProps {
  paragraph: string;
  hasMargin: boolean;
}

export const Paragraph: Component<ParagraphProps> = ({
  paragraph,
  hasMargin,
}: ParagraphProps) => {
  return (
    <p
      innerHTML={paragraph}
      classList={{
        marginless: !hasMargin,
      }}
    />
  );
};