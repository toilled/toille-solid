import { render, screen, fireEvent } from '@solidjs/testing-library';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PageContent } from '../PageContent';
import pages from '../../configs/pages.json';

// Mock the router hooks
vi.mock('@solidjs/router', async () => {
  const original = await vi.importActual<typeof import('@solidjs/router')>('@solidjs/router');
  return {
    ...original,
    useParams: vi.fn(),
  };
});

// We need to dynamically import useParams to get the mocked version
const { useParams } = await import('@solidjs/router');

describe('PageContent component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    (useParams as vi.Mock).mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render the correct page based on params', () => {
    const aboutPage = pages[1];
    (useParams as vi.Mock).mockReturnValue({ name: 'about' });

    render(() => <PageContent />);

    expect(screen.getByText(aboutPage.title)).toBeInTheDocument();
    expect(screen.getByText(/I am a BSc \(Hons\) graduate/)).toBeInTheDocument();
  });

  it('should render the home page if params.name is not found', () => {
    const homePage = pages[0];
    (useParams as vi.Mock).mockReturnValue({ name: 'a-page-that-does-not-exist' });

    render(() => <PageContent />);

    expect(screen.getByText(homePage.title)).toBeInTheDocument();
  });

  it('should render the 404 page for an "incorrect" param', () => {
    const incorrectRoute = 'non-existent-page';
    (useParams as vi.Mock).mockReturnValue({ incorrect: incorrectRoute });

    render(() => <PageContent />);

    expect(screen.getByText('404 - Page not found')).toBeInTheDocument();
    const errorMessage = screen.getByText(/The page/);
    expect(errorMessage).toHaveTextContent(incorrectRoute);
  });

  it('should show and hide the hint on title mousedown', async () => {
    (useParams as vi.Mock).mockReturnValue({ name: 'home' });
    render(() => <PageContent />);

    const titleElement = screen.getByText(pages[0].title);
    expect(screen.queryByText(/- Nothing here/)).not.toBeInTheDocument();

    fireEvent.mouseDown(titleElement);
    await Promise.resolve();

    expect(screen.getByText(/- Nothing here/)).toBeInTheDocument();

    vi.runAllTimers();
    await Promise.resolve();

    expect(screen.queryByText(/- Nothing here/)).not.toBeInTheDocument();
  });
});