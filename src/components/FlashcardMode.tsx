import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, ShuffleIcon, CheckIcon, XIcon } from 'lucide-react';
// Mock flashcard data
const mockFlashcards = [{
  id: '1',
  front: 'What are the essential elements of a valid contract?',
  back: 'The essential elements of a valid contract are: 1) Offer, 2) Acceptance, 3) Consideration, 4) Legal capacity, 5) Legal purpose, and 6) Proper form if required by law.'
}, {
  id: '2',
  front: 'Define "consideration" in contract law.',
  back: 'Consideration is something of value exchanged between the parties to a contract. It can be money, goods, services, or a promise to do or not do something. It must be bargained for and legally sufficient.'
}, {
  id: '3',
  front: 'What is the "mirror image rule" in contract formation?',
  back: 'The mirror image rule states that an acceptance must match the terms of the offer exactly (be a "mirror image") to form a valid contract. If the acceptance changes or adds terms, it constitutes a rejection and counteroffer rather than an acceptance.'
}, {
  id: '4',
  front: 'What is the statute of frauds?',
  back: 'The statute of frauds requires certain types of contracts to be in writing to be enforceable. These typically include: contracts for the sale of land, contracts that cannot be performed within one year, contracts for the sale of goods over $500 (UCC), and contracts to pay the debt of another.'
}, {
  id: '5',
  front: 'What is the parol evidence rule?',
  back: 'The parol evidence rule prevents parties from introducing extrinsic evidence (oral or written statements made prior to or contemporaneous with the signing of a written contract) that would contradict, vary, or add to the terms of a complete, integrated written agreement.'
}];
const FlashcardMode: React.FC = () => {
  const {
    setId
  } = useParams<{
    setId: string;
  }>();
  const navigate = useNavigate();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cards, setCards] = useState(mockFlashcards);
  const [knownCards, setKnownCards] = useState<string[]>([]);
  const [showSessionComplete, setShowSessionComplete] = useState(false);
  const [studyTime, setStudyTime] = useState(0);
  const [sessionStartTime] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => {
      setStudyTime(Math.floor((Date.now() - sessionStartTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [sessionStartTime]);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };
  const nextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      setShowSessionComplete(true);
    }
  };
  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };
  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };
  const markAsKnown = () => {
    const currentCardId = cards[currentCardIndex].id;
    if (!knownCards.includes(currentCardId)) {
      setKnownCards([...knownCards, currentCardId]);
    }
    nextCard();
  };
  const markAsUnknown = () => {
    const currentCardId = cards[currentCardIndex].id;
    setKnownCards(knownCards.filter(id => id !== currentCardId));
    nextCard();
  };
  const endSession = () => {
    navigate(`/study-room/${setId}`);
  };
  const restartSession = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setShowSessionComplete(false);
    setKnownCards([]);
  };
  // Calculate progress percentage
  const progress = (currentCardIndex + 1) / cards.length * 100;
  return <div className="max-w-4xl mx-auto text-white">
      {/* Session complete modal */}
      {showSessionComplete && <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-background-card rounded-xl shadow-xl p-8 max-w-md w-full border border-gray-800">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckIcon size={32} className="text-emerald-100" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Session Complete!
              </h2>
              <p className="text-gray-400 mb-6">
                Great job! You've completed all flashcards in this set.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-sm text-gray-400">Time Spent</p>
                  <p className="text-xl font-semibold text-white">
                    {formatTime(studyTime)}
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-sm text-gray-400">Cards Mastered</p>
                  <p className="text-xl font-semibold text-white">
                    {knownCards.length} of {cards.length}
                  </p>
                </div>
              </div>
              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-2">Mastery Progress</p>
                <div className="w-full bg-gray-800 rounded-full h-2.5">
                  <div className="h-2.5 rounded-full bg-emerald-500" style={{
                width: `${knownCards.length / cards.length * 100}%`
              }}></div>
                </div>
              </div>
              <div className="flex space-x-4">
                <button onClick={endSession} className="flex-1 px-4 py-2 border border-gray-700 rounded-md text-sm font-medium text-gray-300 bg-background-card hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-yellow">
                  Return to Study Room
                </button>
                <button onClick={restartSession} className="flex-1 px-4 py-2 border border-transparent rounded-md text-sm font-medium text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-yellow">
                  Study Again
                </button>
              </div>
            </div>
          </div>
        </div>}
      {/* Header with progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => navigate(`/study-room/${setId}`)} className="inline-flex items-center px-3 py-1.5 text-sm text-gray-400 hover:text-accent-yellow transition-colors">
            <ArrowLeftIcon size={16} className="mr-1" />
            Back to Study Room
          </button>
          <div className="text-sm text-gray-400">
            {currentCardIndex + 1} of {cards.length} cards
          </div>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div className="h-2 rounded-full bg-accent-yellow transition-all duration-300 ease-in-out" style={{
          width: `${progress}%`
        }}></div>
        </div>
      </div>
      {/* Flashcard */}
      <div className="w-full aspect-[3/2] bg-background-card rounded-xl shadow-md border border-gray-800 cursor-pointer perspective-1000 mb-8" onClick={flipCard}>
        <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front of card */}
          <div className={`absolute inset-0 backface-hidden p-8 flex flex-col ${isFlipped ? 'invisible' : ''}`}>
            <div className="text-xs font-medium text-gray-400 mb-2">
              QUESTION
            </div>
            <div className="flex-1 flex items-center justify-center">
              <p className="text-xl text-white text-center">
                {cards[currentCardIndex].front}
              </p>
            </div>
            <div className="text-sm text-gray-500 text-center mt-4">
              Click to flip
            </div>
          </div>
          {/* Back of card */}
          <div className={`absolute inset-0 backface-hidden rotate-y-180 p-8 flex flex-col bg-background-card rounded-xl border border-gray-800 ${!isFlipped ? 'invisible' : ''}`}>
            <div className="text-xs font-medium text-accent-yellow mb-2">
              ANSWER
            </div>
            <div className="flex-1 overflow-auto">
              <p className="text-lg text-white">
                {cards[currentCardIndex].back}
              </p>
            </div>
            <div className="text-sm text-gray-500 text-center mt-4">
              Click to flip back
            </div>
          </div>
        </div>
      </div>
      {/* Controls */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button onClick={prevCard} disabled={currentCardIndex === 0} className={`px-4 py-2 rounded-md text-sm font-medium border ${currentCardIndex === 0 ? 'border-gray-800 text-gray-600 cursor-not-allowed' : 'border-gray-700 text-gray-300 hover:bg-gray-800'} transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-yellow`}>
          <ArrowLeftIcon size={16} className="inline mr-2" />
          Previous
        </button>
        <button onClick={shuffleCards} className="px-4 py-2 rounded-md text-sm font-medium border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-yellow">
          <ShuffleIcon size={16} className="inline mr-2" />
          Shuffle
        </button>
        <button onClick={markAsUnknown} className="px-4 py-2 rounded-md text-sm font-medium border border-rose-900 text-rose-300 bg-rose-950 hover:bg-rose-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
          <XIcon size={16} className="inline mr-2" />
          Don't Know
        </button>
        <button onClick={markAsKnown} className="px-4 py-2 rounded-md text-sm font-medium border border-emerald-900 text-emerald-300 bg-emerald-950 hover:bg-emerald-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
          <CheckIcon size={16} className="inline mr-2" />
          Know It
        </button>
        <button onClick={nextCard} className="px-4 py-2 rounded-md text-sm font-medium bg-white text-black hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-yellow">
          Next
          <ArrowRightIcon size={16} className="inline ml-2" />
        </button>
        <button onClick={() => setShowSessionComplete(true)} className="px-4 py-2 rounded-md text-sm font-medium border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-yellow">
          End Session
        </button>
      </div>
      {/* Keyboard shortcuts */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Keyboard shortcuts: Space to flip, ← Previous, → Next</p>
      </div>
    </div>;
};
export default FlashcardMode;