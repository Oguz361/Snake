import React from 'react';
import '../AnimatedBackground.css';

// Komponente für den animierten Hintergrund mit Wolken und Sonne
const AnimatedBackground: React.FC = () => {
  return (
    <div className="animated-background">
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
      <div className="cloud cloud3"></div>
      <div className="sun"></div>
    </div>
  );
};

export default AnimatedBackground;