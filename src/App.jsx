import { useState } from 'react';
import Welcome from './features/welcome';
import Quiz from './features/quiz';
import IconDragGame from './features/iconGame';

function App() {
  const [userName, setUserName] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-xl text-gray-800">
        {!selectedGame ? (
          <Welcome onSelect={(name, game) => { setUserName(name); setSelectedGame(game); }} />
        ) : selectedGame === 'quiz' ? (
          <Quiz userName={userName} />
        ) : (
          <IconDragGame userName={userName} />
        )}
      </div>
    </div>
  );
}

export default App;
