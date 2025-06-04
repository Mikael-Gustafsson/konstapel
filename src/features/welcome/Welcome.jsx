import { useState } from 'react';

function Welcome({ onContinue }) {
  const [graduationYear, setGraduationYear] = useState('');

  const handleContinue = () => {
    if (graduationYear) {
      onContinue(graduationYear);
    }
  };

  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold">Välkommen!</h1>
      <p>Vad kul att du ska utbilda dig till polis.</p>
      <div>
        <label htmlFor="year" className="block mb-1">Välj examensår</label>
        <select
          id="year"
          value={graduationYear}
          onChange={(e) => setGraduationYear(e.target.value)}
          className="border rounded p-2 w-full"
        >
          <option value="">Välj år...</option>
          {Array.from({ length: 7 }).map((_, i) => {
            const year = 2024 + i;
            return (
              <option key={year} value={year}>{year}</option>
            );
          })}
        </select>
      </div>
      <button
        onClick={handleContinue}
        disabled={!graduationYear}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        Fortsätt
      </button>
    </div>
  );
}

export default Welcome;
