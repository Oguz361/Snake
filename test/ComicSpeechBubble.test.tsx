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

  it('changes the phrase at intervals', () => {
    jest.useFakeTimers();
    render(<ComicSpeechBubble />);
    
   
    expect(screen.getByText(/Wow, what a day!/i)).toBeInTheDocument();
    

    act(() => {
      jest.advanceTimersByTime(5000);
    });
    
   
    expect(screen.queryByText(/Wow, what a day!/i)).not.toBeInTheDocument();
    
    
    const newPhrase = screen.getByText((content) => {
      return weatherPhrases.includes(content);
    });
    expect(newPhrase).toBeInTheDocument();
    
    jest.useRealTimers();
  });
});