import '@testing-library/jest-dom';

// Mock the Web Animations API
if (!Element.prototype.animate) {
  Element.prototype.animate = () => {
    return {
      finished: Promise.resolve(),
      cancel: () => {},
    } as Partial<Animation>;
  };
}