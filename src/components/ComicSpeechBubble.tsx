import React, { useState, useEffect } from 'react';
import '../ComicSpeechBubble.css';

const weatherPhrases = [
  "Wow, what a day!",
  "Is it hot in here?",
  "Brrr... chilly!",
  "Rain, rain, go away!",
  "Sunny side up!",
];

const ComicSpeechBubble: React.FC = () => {
  const [phrase, setPhrase] = useState(weatherPhrases[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhrase(weatherPhrases[Math.floor(Math.random() * weatherPhrases.length)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="speech-bubble-container">
      <div className="speech-bubble">
        <p>{phrase}</p>
      </div>
    </div>
  );
};

export default ComicSpeechBubble;