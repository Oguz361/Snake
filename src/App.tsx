import { useEffect, useState } from 'react'
import './App.css'
import DataService from './DataService';

function App() {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    DataService.getHelloWorld()
      .then(data => setMessage(data))
      .catch(error => console.error('Fehler beim Abrufen der Daten:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{message}</h1>
      </header>
    </div>
  );
}

export default App;
