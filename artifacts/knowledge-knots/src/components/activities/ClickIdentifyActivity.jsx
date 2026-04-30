import { useState } from 'react';

export default function ClickIdentifyActivity({ lesson, onComplete }) {
  const config = getConfig(lesson.id);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [complete, setComplete] = useState(false);

  const q = config.questions[step];

  const handleSelect = (optId) => {
    if (answered) return;
    setSelected(optId);
    setAnswered(true);
    if (optId === q.correctId) setScore(prev => prev + 1);
  };

  const handleNext = () => {
    if (step + 1 >= config.questions.length) {
      setComplete(true);
    } else {
      setStep(prev => prev + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const pct = Math.round((score / config.questions.length) * 100);

  if (complete) {
    return (
      <div className="space-y-6 text-center">
        <div className="text-6xl">{pct >= 70 ? '🎉' : '💪'}</div>
        <h3 className="font-fredoka text-3xl text-gray-800">{pct >= 70 ? 'Amazing Work!' : 'Good Effort!'}</h3>
        <p className="font-nunito text-gray-600 text-lg">You got {score} out of {config.questions.length} correct! ({pct}%)</p>
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden mx-auto w-48">
          <div className="h-full bg-kk-green rounded-full" style={{ width: `${pct}%` }} />
        </div>
        {pct >= 70 ? (
          <button onClick={() => onComplete(lesson.points)} className="w-full bg-kk-green text-white font-fredoka text-xl py-4 rounded-2xl hover:opacity-90">
            Complete Lesson! 🌟
          </button>
        ) : (
          <button onClick={() => { setStep(0); setScore(0); setSelected(null); setAnswered(false); setComplete(false); }} className="w-full bg-navy text-white font-fredoka text-xl py-4 rounded-2xl hover:opacity-90">
            Try Again 🔄
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-fredoka text-2xl text-gray-800">{config.title}</h3>
          <span className="font-fredoka text-gray-400 text-sm">{step + 1}/{config.questions.length}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div className="h-2 bg-kk-orange rounded-full transition-all" style={{ width: `${((step + 1) / config.questions.length) * 100}%` }} />
        </div>
      </div>

      {/* Scenario Display */}
      <div className="bg-cream rounded-2xl p-6 text-center border border-gray-200">
        <div className="text-5xl mb-3">{q.sceneEmoji}</div>
        {q.sceneDescription && (
          <div className="bg-white rounded-xl p-3 mb-3 text-sm font-nunito text-gray-700 border border-gray-200">
            {q.sceneDescription}
          </div>
        )}
        <p className="font-fredoka text-xl text-gray-800">{q.question}</p>
      </div>

      {/* Clickable Options */}
      <div className={`grid gap-3 ${q.options.length <= 2 ? 'grid-cols-2' : q.options.length === 4 ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {q.options.map(opt => {
          let cls = 'bg-white border-2 border-gray-200 hover:border-navy hover:scale-105';
          if (answered) {
            if (opt.id === q.correctId) cls = 'bg-green-100 border-kk-green border-3';
            else if (opt.id === selected) cls = 'bg-red-100 border-red-400 border-3';
          }
          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className={`rounded-2xl p-4 text-center transition-all cursor-pointer ${cls}`}
            >
              <div className="text-3xl mb-1">{opt.emoji}</div>
              <p className="font-nunito font-bold text-gray-800 text-sm leading-tight">{opt.label}</p>
            </button>
          );
        })}
      </div>

      {answered && (
        <div className={`rounded-2xl p-4 text-center font-nunito ${selected === q.correctId ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          <p className="font-bold">{selected === q.correctId ? '✅ Correct!' : '❌ Not quite!'}</p>
          <p className="text-sm mt-1">{q.explanation}</p>
        </div>
      )}

      {answered && (
        <button onClick={handleNext} className="w-full bg-navy text-white font-fredoka text-lg py-3 rounded-2xl hover:opacity-90">
          {step + 1 >= config.questions.length ? 'See Results! 📊' : 'Next Question →'}
        </button>
      )}
    </div>
  );
}

function getConfig(lessonId) {
  if (lessonId.includes('math') && lessonId.includes('k-2')) {
    return {
      title: '🧸 Toy Store Add-Up',
      questions: [
        { sceneEmoji: '🏪', sceneDescription: 'The toy shelf has 3 teddy bears and 2 rubber ducks.', question: 'How many toys are there in all?', correctId: 'b', options: [{ id: 'a', emoji: '4️⃣', label: '4' }, { id: 'b', emoji: '5️⃣', label: '5' }, { id: 'c', emoji: '6️⃣', label: '6' }, { id: 'd', emoji: '3️⃣', label: '3' }], explanation: '3 bears + 2 ducks = 5 toys total!' },
        { sceneEmoji: '🎁', sceneDescription: 'A box has 4 toy cars. Santa adds 3 more.', question: 'How many cars are in the box now?', correctId: 'c', options: [{ id: 'a', emoji: '6️⃣', label: '6' }, { id: 'b', emoji: '5️⃣', label: '5' }, { id: 'c', emoji: '7️⃣', label: '7' }, { id: 'd', emoji: '8️⃣', label: '8' }], explanation: '4 + 3 = 7 cars!' },
        { sceneEmoji: '🪀', sceneDescription: 'There are 6 yo-yos and 2 jump ropes in the toy bin.', question: 'How many toys total?', correctId: 'b', options: [{ id: 'a', emoji: '7️⃣', label: '7' }, { id: 'b', emoji: '8️⃣', label: '8' }, { id: 'c', emoji: '9️⃣', label: '9' }, { id: 'd', emoji: '6️⃣', label: '6' }], explanation: '6 + 2 = 8 toys!' },
      ],
    };
  }

  if (lessonId.includes('sci') && lessonId.includes('4')) {
    return {
      title: '🌤️ Weather Station Observer',
      questions: [
        { sceneEmoji: '☀️', sceneDescription: 'The sky is clear and bright. No clouds. Very warm.', question: 'What type of weather is this?', correctId: 'a', options: [{ id: 'a', emoji: '☀️', label: 'Sunny' }, { id: 'b', emoji: '🌧️', label: 'Rainy' }, { id: 'c', emoji: '❄️', label: 'Snowy' }, { id: 'd', emoji: '⛅', label: 'Cloudy' }], explanation: 'A clear, bright, warm sky = sunny weather!' },
        { sceneEmoji: '🌡️', sceneDescription: 'The thermometer reads 28°C. Very humid. Storm clouds forming.', question: 'What weather is likely coming?', correctId: 'b', options: [{ id: 'a', emoji: '☀️', label: 'More sunshine' }, { id: 'b', emoji: '⛈️', label: 'Thunderstorm' }, { id: 'c', emoji: '❄️', label: 'Snow' }, { id: 'd', emoji: '🌬️', label: 'Hail' }], explanation: 'Humid + hot + storm clouds = thunderstorm coming!' },
        { sceneEmoji: '🌡️', sceneDescription: 'Temperature is -5°C. Sky is grey. Wind is blowing.', question: 'What precipitation might fall?', correctId: 'c', options: [{ id: 'a', emoji: '🌧️', label: 'Rain' }, { id: 'b', emoji: '🌞', label: 'Sunshine' }, { id: 'c', emoji: '❄️', label: 'Snow' }, { id: 'd', emoji: '⚡', label: 'Lightning' }], explanation: 'Below zero + grey sky = snow is likely!' },
      ],
    };
  }

  if (lessonId.includes('hist') && lessonId.includes('3')) {
    return {
      title: '🗺️ World Map Explorer',
      questions: [
        { sceneEmoji: '🌍', sceneDescription: 'You are looking at a globe. You see a large landmass to the right of the Atlantic Ocean.', question: 'Which continent is to the RIGHT of the Atlantic Ocean?', correctId: 'b', options: [{ id: 'a', emoji: '🌍', label: 'Africa' }, { id: 'b', emoji: '🌎', label: 'North America' }, { id: 'c', emoji: '🌏', label: 'Asia' }, { id: 'd', emoji: '🏔️', label: 'Australia' }], explanation: 'The Americas are to the right (west) of the Atlantic Ocean!' },
        { sceneEmoji: '🗺️', sceneDescription: 'You see a large continent near the South Pole, covered in ice.', question: 'What continent is this?', correctId: 'd', options: [{ id: 'a', emoji: '🌍', label: 'Africa' }, { id: 'b', emoji: '🐧', label: 'Arctic' }, { id: 'c', emoji: '🌊', label: 'Australia' }, { id: 'd', emoji: '❄️', label: 'Antarctica' }], explanation: 'Antarctica is the continent near the South Pole, covered in ice!' },
      ],
    };
  }

  return {
    title: '🎯 Interactive Challenge',
    questions: [
      { sceneEmoji: '🌍', sceneDescription: 'Look at this scene carefully.', question: 'What is the correct answer?', correctId: 'a', options: [{ id: 'a', emoji: '✅', label: 'Option A (Correct)' }, { id: 'b', emoji: '❌', label: 'Option B' }, { id: 'c', emoji: '❌', label: 'Option C' }, { id: 'd', emoji: '❌', label: 'Option D' }], explanation: 'Option A is correct because it matches the scenario!' },
    ],
  };
}