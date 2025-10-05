import { render, screen } from '@solidjs/testing-library';
import { describe, it, expect } from 'vitest';
import { Paragraph } from '../Paragraph';

describe('Paragraph component', () => {
  const paragraphText = 'This is a test paragraph.';
  const paragraphHtml = `This contains <strong>bold</strong> text.`;

  it('should render a standard paragraph correctly', () => {
    const { container } = render(() => <Paragraph paragraph={paragraphText} last={false} />);
    const p = container.querySelector('p');

    expect(p).toBeInTheDocument();
    expect(p).toHaveTextContent(paragraphText);
    expect(p).not.toHaveClass('marginless');
  });

  it('should apply the "marginless" class when "last" is true', () => {
    const { container } = render(() => <Paragraph paragraph={paragraphText} last={true} />);
    const p = container.querySelector('p');

    expect(p).toHaveClass('marginless');
  });

  it('should correctly render inner HTML', () => {
    render(() => <Paragraph paragraph={paragraphHtml} last={false} />);

    // Use getByText with a text matcher function to find the element
    // despite the nested <strong> tag.
    const p = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'p' && content.startsWith('This contains');
    });

    expect(p).toBeInTheDocument();
    expect(p.querySelector('strong')).not.toBeNull();
    expect(p.querySelector('strong')).toHaveTextContent('bold');
  });
});