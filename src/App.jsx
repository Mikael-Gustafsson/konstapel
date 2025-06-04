import { useState } from 'react';
import Welcome from './features/welcome';
import Quiz from './features/quiz';

function App() {
  const [welcomeDone, setWelcomeDone] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-xl text-gray-800">
        {welcomeDone ? (
          <Quiz />
        ) : (
          <Welcome onContinue={() => setWelcomeDone(true)} />
        )}
      </div>
    </div>
  );
}

export default App;
