import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post('/.netlify/functions/server/bfhl', parsedInput);
      setResponse(res.data);
    } catch (error) {
      alert('Invalid JSON or API Error');
    }
  };

  const handleCheckboxChange = (option) => {
    setSelectedOptions(prev => 
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  return (
    <div className="App">
      <h1>BFHL API Frontend</h1>
      <textarea 
        rows="10" 
        value={jsonInput} 
        onChange={(e) => setJsonInput(e.target.value)} 
        placeholder="Enter JSON input here..."
      />
      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <>
          <div>
            <label>
              <input 
                type="checkbox" 
                value="Alphabets" 
                onChange={() => handleCheckboxChange('Alphabets')} 
              />
              Alphabets
            </label>
            <label>
              <input 
                type="checkbox" 
                value="Numbers" 
                onChange={() => handleCheckboxChange('Numbers')} 
              />
              Numbers
            </label>
            <label>
              <input 
                type="checkbox" 
                value="Highest Lowercase Alphabet" 
                onChange={() => handleCheckboxChange('Highest Lowercase Alphabet')} 
              />
              Highest Lowercase Alphabet
            </label>
          </div>

          <div>
            {selectedOptions.includes('Alphabets') && (
              <div>Alphabets: {JSON.stringify(response.alphabets)}</div>
            )}
            {selectedOptions.includes('Numbers') && (
              <div>Numbers: {JSON.stringify(response.numbers)}</div>
            )}
            {selectedOptions.includes('Highest Lowercase Alphabet') && (
              <div>Highest Lowercase Alphabet: {JSON.stringify(response.highest_lowercase_alphabet)}</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;

