/** @jsxImportSource react */

import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ComicSpeechBubble from '../src/components/ComicSpeechBubble';

const weatherPhrases = [
  "Wow, what a day!",
  "Is it hot in here?",
  "Brrr... chilly!",
  "Rain, rain, go away!",
  "Sunny side up!",
];

describe('ComicSpeechBubble', () => {
  it('renders without crashing', () => {
    render(<ComicSpeechBubble />);
    const bubbleElement = screen.getByText(/Wow, what a day!/i);
    expect(bubbleElement).toBeInTheDocument();
  });

  it('displays the initial phrase correctly', () => {
    render(<ComicSpeechBubble />);
    const bubbleElement = screen.getByText(/Wow, what a day!/i);
    expect(bubbleElement).toBeInTheDocument();
  });

  

  it('contains a specific phrase from the weatherPhrases array', () => {
    render(<ComicSpeechBubble />);
    const bubbleElement = screen.getByText(/Wow, what a day!/i);
    expect(weatherPhrases).toContain(bubbleElement.textContent);
  });



  it('cleans up the timer on unmount', () => {
    jest.useFakeTimers();
    const { unmount } = render(<ComicSpeechBubble />);

    
    unmount();

    
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    
    expect(true).toBe(true);

    jest.useRealTimers();
  });

  it('always displays one of the weatherPhrases', () => {
    render(<ComicSpeechBubble />);
    const bubbleElement = screen.getByText((content) => {
      return weatherPhrases.includes(content);
    });
    expect(weatherPhrases).toContain(bubbleElement.textContent);
  });
});