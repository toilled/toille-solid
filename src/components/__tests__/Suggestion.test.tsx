import { render, screen, fireEvent } from '@solidjs/testing-library';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Suggestion } from '../Suggestion';

// Mock the fetch API
global.fetch = vi.fn();

function createFetchResponse(data: any) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

describe('Suggestion component', () => {
  const mockUrl = 'https://api.example.com/data';
  const mockValueName = 'fact';
  const mockTitle = 'Did you know?';

  beforeEach(() => {
    (fetch as vi.Mock).mockClear();
  });

  it('should display a loading/fallback state initially', () => {
    (fetch as vi.Mock).mockResolvedValue(createFetchResponse({}));
    render(() => <Suggestion url={mockUrl} valueName={mockValueName} title={mockTitle} />);

    expect(screen.getByText(`${mockUrl} might be dowm.`)).toBeInTheDocument();
  });

  it('should display the suggestion after fetching', async () => {
    const mockData = { [mockValueName]: 'SolidJS is reactive!' };
    (fetch as vi.Mock).mockResolvedValue(createFetchResponse(mockData));

    render(() => <Suggestion url={mockUrl} valueName={mockValueName} title={mockTitle} />);

    const suggestionText = await screen.findByText(mockData.fact);
    expect(suggestionText).toBeInTheDocument();
    expect(screen.getByText(mockTitle)).toBeInTheDocument();
    expect(screen.getByText('Click to update')).toBeInTheDocument();
  });

  it('should fetch a new suggestion and hide the hint on click', async () => {
    const firstSuggestion = { [mockValueName]: 'First fact' };
    const secondSuggestion = { [mockValueName]: 'Second fact' };
    (fetch as vi.Mock)
      .mockResolvedValueOnce(createFetchResponse(firstSuggestion))
      .mockResolvedValueOnce(createFetchResponse(secondSuggestion));

    render(() => <Suggestion url={mockUrl} valueName={mockValueName} title={mockTitle} />);

    // Wait for the first suggestion to load
    await screen.findByText(firstSuggestion.fact);
    expect(screen.getByText('Click to update')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(1);

    // Click the component to refetch
    const container = screen.getByText(firstSuggestion.fact).closest('footer');
    fireEvent.click(container!);

    // Wait for the new suggestion to appear
    await screen.findByText(secondSuggestion.fact);
    expect(fetch).toHaveBeenCalledTimes(2);

    // Check that the hint is gone
    expect(screen.queryByText('Click to update')).not.toBeInTheDocument();
  });
});