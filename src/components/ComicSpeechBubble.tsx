import React, { useState, useEffect } from 'react';
import '../ComicSpeechBubble.css';

// Liste von wetterbezogenen Phrasen
const weatherPhrases = [
  "Wow, what a day!",
  "Is it hot in here?",
  "Brrr... chilly!",
  "Rain, rain, go away!",
  "Sunny side up!",
];

// Komponente für die Comic-Sprechblase, die wetterbezogene Phrasen anzeigt
const ComicSpeechBubble: React.FC = () => {
  const [phrase, setPhrase] = useState(weatherPhrases[0]);

  useEffect(() => {
    // Intervall, um die Phrasen alle 5 Sekunden zu wechseln
    const interval = setInterval(() => {
      setPhrase(weatherPhrases[Math.floor(Math.random() * weatherPhrases.length)]);
    }, 5000);

    // Aufräumen des Intervalls bei Komponentenausblendung
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
