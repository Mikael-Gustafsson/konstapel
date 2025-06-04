import { useState } from 'react';

function Welcome({ onSelect }) {
  const [name, setName] = useState('');

  const handleSelect = (game) => {
    if (name) {
      onSelect(name, game);
    }
  };

  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold">Välkommen!</h1>
      <p>Skriv ditt namn och välj spel.</p>
      <div>
        <label htmlFor="name" className="block mb-1">Namn</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <div className="flex justify-center gap-4 pt-2">
        <button
          onClick={() => handleSelect('quiz')}
          disabled={!name}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Quiz
        </button>
        <button
          onClick={() => handleSelect('drag')}
          disabled={!name}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
        >
          Ikonspelet
        </button>
      </div>
    </div>
  );
}

export default Welcome;
