import { useState, useMemo } from 'react';
import allQuestions from './questions.json';

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function App() {
  const [graduationYear, setGraduationYear] = useState('');
  const [welcomeDone, setWelcomeDone] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const chapters = Array.from(new Set(allQuestions.map((q) => q.id.split('.')[0])));

  const handleWelcomeContinue = () => {
    if (graduationYear) {
      setWelcomeDone(true);
    }
  };

  const startQuiz = (chapter) => {
    const questionsToUse = chapter === 'ALL'
      ? allQuestions
      : allQuestions.filter((q) => q.id.startsWith(chapter + '.'));

    setSelectedChapter(chapter);
    setFilteredQuestions(questionsToUse);
    setCurrentIndex(0);
    setScore(0);
    setQuizFinished(false);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowFeedback(true);

    if (option === filteredQuestions[currentIndex].answer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      setSelectedOption(null);
      setShowFeedback(false);

      if (currentIndex + 1 >= filteredQuestions.length) {
        setQuizFinished(true);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 1500);
  };

  const handleRestart = () => {
    setSelectedChapter(null);
    setFilteredQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setQuizFinished(false);
  };

  const currentQuestion = filteredQuestions[currentIndex];

  const shuffledOptions = useMemo(() => {
    return currentQuestion ? shuffleArray(currentQuestion.options) : [];
  }, [currentQuestion]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-xl text-gray-800">
        {!welcomeDone ? (
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
              onClick={handleWelcomeContinue}
              disabled={!graduationYear}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Fortsätt
            </button>
          </div>
        ) : !selectedChapter ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Välj kapitel 👮 🚓</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => startQuiz('ALL')}
                className="col-span-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
              >
                Alla kapitel
              </button>
              {chapters.map((chapter) => (
                <button
                  key={chapter}
                  onClick={() => startQuiz(chapter)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                >
                  Kapitel {chapter}
                </button>
              ))}
            </div>
          </div>
        ) : quizFinished ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Klart! 🎉</h2>
            <p className="text-lg mb-6">
              Du fick {score} av {filteredQuestions.length} rätt!
            </p>
            <button
              onClick={handleRestart}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Tillbaka till meny
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-6">{currentQuestion.question}</h2>
            <div className="space-y-4">
              {shuffledOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  disabled={showFeedback}
                  className={`
                    w-full p-3 rounded-md text-left border
                    ${showFeedback
                      ? option === currentQuestion.answer
                        ? 'bg-green-200 border-green-500'
                        : option === selectedOption
                          ? 'bg-red-200 border-red-500'
                          : 'bg-gray-100 border-gray-300'
                      : 'bg-gray-100 hover:bg-blue-100 border-gray-300'}
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="mt-6 text-sm text-gray-600 flex justify-between">
              <span>Fråga {currentIndex + 1} av {filteredQuestions.length}</span>
              <span>Poäng: {score}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
