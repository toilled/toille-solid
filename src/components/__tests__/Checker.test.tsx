import { render, screen, fireEvent } from '@solidjs/testing-library';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Checker } from '../Checker';

describe('Checker component', () => {
  const mockDate = new Date(2023, 10, 17, 18, 0, 0); // 6:00 PM

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const getExpectedTime = (hoursOffset: number) => {
    return new Date(mockDate.getTime() + hoursOffset * 60 * 60 * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  it('should render the initial state correctly', () => {
    render(() => <Checker />);

    expect(screen.getByText('Units consumed')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    // Both times are the same initially, so we expect to find two elements
    expect(screen.getAllByText(getExpectedTime(0))).toHaveLength(2);
  });

  it('should increment the count and update times when "Add" is clicked', async () => {
    render(() => <Checker />);

    const addButton = screen.getByText('Add');
    fireEvent.click(addButton);

    // Need to wait for Solid's reactivity to update the DOM
    await Promise.resolve();

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText(getExpectedTime(1))).toBeInTheDocument(); // Borderline time
    expect(screen.getByText(getExpectedTime(2))).toBeInTheDocument(); // Sober time
  });

  it('should decrement the count and update times when "Subtract" is clicked', async () => {
    render(() => <Checker />);
    const addButton = screen.getByText('Add');
    const subtractButton = screen.getByText('Subtract');

    // Add twice
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    await Promise.resolve();

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText(getExpectedTime(2))).toBeInTheDocument();
    expect(screen.getByText(getExpectedTime(3))).toBeInTheDocument();

    // Subtract once
    fireEvent.click(subtractButton);
    await Promise.resolve();

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText(getExpectedTime(1))).toBeInTheDocument();
    expect(screen.getByText(getExpectedTime(2))).toBeInTheDocument();
  });

  it('should not decrement the count below zero', async () => {
    render(() => <Checker />);
    const subtractButton = screen.getByText('Subtract');

    // Ensure initial state
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getAllByText(getExpectedTime(0))).toHaveLength(2);

    // Click subtract
    fireEvent.click(subtractButton);
    await Promise.resolve();

    // State should not change
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getAllByText(getExpectedTime(0))).toHaveLength(2);
  });
});