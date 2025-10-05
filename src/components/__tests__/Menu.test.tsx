import { render, screen } from '@solidjs/testing-library';
import { describe, it, expect } from 'vitest';
import { Router, Route } from '@solidjs/router';
import { Menu } from '../Menu';
import { Page } from '../../interfaces/Page';

describe('Menu component', () => {
  const mockPages: Page[] = [
    { name: 'Home', link: '/', title: 'Home Page', body: [] },
    { name: 'About', link: '/about', title: 'About Page', body: [] },
    { name: 'Contact', link: '/contact', title: 'Contact Page', body: [] },
  ];

  it('should render a list of menu items as links', () => {
    render(() => (
      <Router>
        <Route path="/" component={() => <Menu pages={mockPages} />} />
      </Router>
    ));

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(mockPages.length);

    mockPages.forEach((page, index) => {
      expect(links[index]).toHaveAttribute('href', page.link);
      expect(links[index]).toHaveTextContent(page.name);
    });
  });

  it('should render nothing when the pages array is empty', () => {
    render(() => (
      <Router>
        <Route path="/" component={() => <Menu pages={[]} />} />
      </Router>
    ));

    const links = screen.queryAllByRole('link');
    expect(links).toHaveLength(0);
  });
});