import { render, screen, fireEvent } from '@solidjs/testing-library';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Activity } from '../Activity';

// Mock the fetch API
global.fetch = vi.fn();

function createFetchResponse(data: any) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

describe('Activity component', () => {
  beforeEach(() => {
    (fetch as vi.Mock).mockClear();
  });

  it('should display a loading state initially', () => {
    (fetch as vi.Mock).mockResolvedValue(createFetchResponse({}));
    render(() => <Activity />);
    expect(screen.getByText('Loading from The Bored API.')).toBeInTheDocument();
  });

  it('should display the activity after fetching', async () => {
    const mockActivity = {
      activity: 'Learn a new programming language',
      type: 'education',
    };
    (fetch as vi.Mock).mockResolvedValue(createFetchResponse(mockActivity));

    render(() => <Activity />);

    const activityText = await screen.findByText(mockActivity.activity);
    const activityType = await screen.findByText(new RegExp(mockActivity.type));

    expect(activityText).toBeInTheDocument();
    expect(activityType).toBeInTheDocument();
    expect(screen.getByText('Click to update')).toBeInTheDocument();
  });

  it('should fetch a new activity and hide the hint on click', async () => {
    const firstActivity = { activity: 'First', type: 'test' };
    const secondActivity = { activity: 'Second', type: 'test' };
    (fetch as vi.Mock)
      .mockResolvedValueOnce(createFetchResponse(firstActivity))
      .mockResolvedValueOnce(createFetchResponse(secondActivity));

    render(() => <Activity />);

    // Wait for the first activity to load
    await screen.findByText('First');
    const hint = screen.getByText('Click to update');
    expect(hint).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(1);

    // Click the component to refetch
    const container = screen.getByText('First').closest('footer');
    fireEvent.click(container!);

    // Wait for the new activity to appear
    await screen.findByText('Second');
    expect(fetch).toHaveBeenCalledTimes(2);

    // Check that the hint is gone
    expect(screen.queryByText('Click to update')).not.toBeInTheDocument();
  });
});