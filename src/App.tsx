import React, { useEffect, useState } from 'react';
import './App.css';
import DataService from './DataService';

function App() {
  const [snakeText, setSnakeText] = useState("");
  const [helloText, setHelloText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const dataService = new DataService();
      const snakeData = await dataService.getSnakeText();
      const helloData = await dataService.getHelloText();
      setSnakeText(snakeData);
      setHelloText(helloData);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>{snakeText}</h1>
      <div className="HW">
        <h2>{helloText}</h2>
      </div>
    </div>
  );
}

export default App;
