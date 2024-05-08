import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa FontAwesomeIcon
import { faTwitter } from '@fortawesome/free-brands-svg-icons'; // Importa el icono de Twitter
import './App.css';

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#282c34");
  const [textColor, setTextColor] = useState("white");
  const [buttonColor, setButtonColor] = useState("#61dafb");

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote(data.content);
      setAuthor("- " + data.author);
      changeColors();
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const changeColors = () => {
    const randomBackgroundColor = getRandomColor();
    setBackgroundColor(randomBackgroundColor);
    setTextColor(getContrastColor(randomBackgroundColor));
    setButtonColor(getRandomColor());
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getContrastColor = (hexColor) => {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
  };

  const generateQuote = () => {
    fetchQuote();
  };

  const tweetQuote = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent('"' + quote + '" ' + author)}`;
    window.open(tweetUrl, '_blank');
  };

  return (
    <div id="quote-box" className="App" style={{ backgroundColor: backgroundColor, color: textColor }}>
      <header className="App-header">
        <h1>Random Quote Machine</h1>
        <div className="quote-container">
          <p id="text" className="quote">{quote}</p>
          <p id="author" className="author">{author}</p>
          <div className="buttons">
            <button id="new-quote" className="btn" style={{ backgroundColor: buttonColor }} onClick={generateQuote}>New Quote</button>
            <a id="tweet-quote" className="tweet-btn" style={{ backgroundColor: buttonColor }} href="https://twitter.com/intent/tweet" onClick={tweetQuote}><FontAwesomeIcon icon={faTwitter} /></a>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
