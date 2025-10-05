import { render, screen, fireEvent } from '@solidjs/testing-library';
import { describe, it, expect, vi } from 'vitest';
import { Title } from '../Title';

describe('Title component', () => {
  it('should render the title and subtitle', () => {
    const titleText = 'Test Title';
    const subtitleText = 'Test Subtitle';
    const setActivity = vi.fn();
    const setJoke = vi.fn();

    render(() => (
      <Title
        title={titleText}
        subtitle={subtitleText}
        activity={() => false}
        setActivity={setActivity}
        joke={() => false}
        setJoke={setJoke}
      />
    ));

    const titleElement = screen.getByText(titleText);
    const subtitleElement = screen.getByText(subtitleText);

    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
  });

  it('should call setActivity when the title is clicked', async () => {
    const setActivity = vi.fn();
    render(() => (
      <Title
        title="Clickable Title"
        subtitle="Subtitle"
        activity={() => false}
        setActivity={setActivity}
        joke={() => false}
        setJoke={vi.fn()}
      />
    ));

    const titleElement = screen.getByText('Clickable Title');
    fireEvent.mouseDown(titleElement);
    expect(setActivity).toHaveBeenCalledTimes(1);
  });

  it('should call setJoke when the subtitle is clicked', async () => {
    const setJoke = vi.fn();
    render(() => (
      <Title
        title="Title"
        subtitle="Clickable Subtitle"
        activity={() => false}
        setActivity={vi.fn()}
        joke={() => false}
        setJoke={setJoke}
      />
    ));

    const subtitleElement = screen.getByText('Clickable Subtitle');
    fireEvent.mouseDown(subtitleElement);
    expect(setJoke).toHaveBeenCalledTimes(1);
  });
});