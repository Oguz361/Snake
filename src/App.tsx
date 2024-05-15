import { useState } from 'react';
import './App.css';
import DataService from './DataService';

function App() {
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name.trim() === '') {
      alert('Bitte geben Sie Ihren Namen ein.');
    } else {
      DataService.getGreeting(name)
        .then(data => setMessage(data))
        .catch(error => console.error('Fehler beim Abrufen der Daten:', error));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {message ? (
          <h1>{message}</h1>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              Bitte geben Sie Ihren Namen ein:
              <input type="text" value={name} onChange={handleChange} />
            </label>
            <button type="submit">Absenden</button>
          </form>
        )}
      </header>
    </div>
  );
}

export default App;
