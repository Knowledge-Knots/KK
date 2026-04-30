import { useState } from 'react';

export default function HighlightActivity({ lesson, onComplete }) {
  const config = getConfig(lesson.id);
  const [highlighted, setHighlighted] = useState(new Set());
  const [result, setResult] = useState(null);
  const [checked, setChecked] = useState(false);

  const toggleHighlight = (id) => {
    if (checked) return;
    setHighlighted(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setResult(null);
  };

  const handleCheck = () => {
    setChecked(true);
    const correctIds = new Set(config.segments.filter(s => s.correct).map(s => s.id));
    const correct = [...highlighted].filter(id => correctIds.has(id)).length;
    const missed = [...correctIds].filter(id => !highlighted.has(id)).length;
    const wrong = [...highlighted].filter(id => !correctIds.has(id)).length;
    const pct = Math.round((correct / correctIds.size) * 100);
    setResult({ type: pct >= 60 ? 'success' : 'retry', correct, missed, wrong, pct });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-fredoka text-2xl text-gray-800 mb-1">{config.title}</h3>
        <p className="font-nunito text-gray-600">{config.instructions}</p>
        <p className="text-sm text-amber-600 mt-2 font-nunito">💡 Click/tap sentences to highlight them in yellow</p>
      </div>

      {/* Document */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
        <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center gap-2">
          <span className="text-lg">{config.docIcon}</span>
          <span className="font-fredoka text-gray-700">{config.docTitle}</span>
        </div>
        <div className="p-5 space-y-1">
          {config.segments.map(seg => {
            const isHl = highlighted.has(seg.id);
            const isCorrect = checked && seg.correct;
            const isWrong = checked && isHl && !seg.correct;
            const isMissed = checked && seg.correct && !isHl;
            return (
              <span
                key={seg.id}
                onClick={() => toggleHighlight(seg.id)}
                className={`cursor-pointer rounded px-0.5 transition-all font-nunito leading-relaxed inline ${
                  isCorrect && isHl ? 'bg-green-300' :
                  isWrong ? 'bg-red-200' :
                  isMissed ? 'bg-orange-200' :
                  isHl ? 'bg-yellow-300' : 'hover:bg-yellow-100'
                }`}
              >
                {seg.text}{' '}
              </span>
            );
          })}
        </div>
      </div>

      {checked && (
        <div className="bg-blue-50 rounded-xl p-3 text-sm font-nunito space-y-1">
          <p className="text-green-700">✅ Correctly highlighted: {result?.correct}</p>
          {result?.missed > 0 && <p className="text-orange-700">⚠️ Missed highlights: {result.missed} (shown in orange)</p>}
          {result?.wrong > 0 && <p className="text-red-700">❌ Incorrect highlights: {result.wrong} (shown in red)</p>}
        </div>
      )}

      {result && (
        <div className={`rounded-2xl p-4 text-center font-fredoka text-xl ${result.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
          {result.type === 'success' ? `Amazing! ${result.pct}% correct! 🌟` : `Good try! ${result.pct}% correct. Look at the highlighted hints!`}
        </div>
      )}

      <div className="flex gap-3">
        {!checked ? (
          <button onClick={handleCheck} className="flex-1 bg-navy text-white font-fredoka text-lg py-3 rounded-2xl hover:opacity-90">
            Check Highlights ✓
          </button>
        ) : (
          <>
            <button onClick={() => { setHighlighted(new Set()); setChecked(false); setResult(null); }} className="flex-1 bg-gray-400 text-white font-fredoka text-lg py-3 rounded-2xl hover:opacity-90">
              Try Again
            </button>
            {result?.type === 'success' && (
              <button onClick={() => onComplete(lesson.points)} className="flex-1 bg-kk-green text-white font-fredoka text-lg py-3 rounded-2xl hover:opacity-90">
                Complete! 🎉
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function getConfig(lessonId) {
  if (lessonId.includes('ela') && lessonId.includes('3')) {
    return {
      title: '📰 Main Idea Finder',
      instructions: 'Read this zoo brochure. Click all sentences that support the MAIN IDEA: "Zoos help protect endangered animals."',
      docIcon: '📋',
      docTitle: 'City Zoo — Animal Conservation Brochure',
      segments: [
        { id: 1, text: 'Welcome to the City Zoo, open every day from 9am to 5pm.', correct: false },
        { id: 2, text: 'Our zoo is home to over 50 endangered species from around the world.', correct: true },
        { id: 3, text: 'The gift shop sells stuffed animals and t-shirts.', correct: false },
        { id: 4, text: 'We run breeding programs that have helped the snow leopard population grow by 30%.', correct: true },
        { id: 5, text: 'Scientists at our zoo study animal behavior to protect them in the wild.', correct: true },
        { id: 6, text: 'Children under 5 get free admission on weekends.', correct: false },
        { id: 7, text: 'Last year, we released 12 California condors back into the wild.', correct: true },
        { id: 8, text: 'Our cafeteria serves hot dogs, burgers, and salads.', correct: false },
      ],
    };
  }

  if (lessonId.includes('ela') && lessonId.includes('1')) {
    return {
      title: '📖 Story Comprehension — Highlight Key Events',
      instructions: 'Read this short story. Highlight all sentences that tell us what Mia\'s problem is.',
      docIcon: '📖',
      docTitle: 'The Lost Puppy',
      segments: [
        { id: 1, text: 'Mia woke up on a sunny Saturday morning.', correct: false },
        { id: 2, text: 'She ran downstairs to feed her puppy, Biscuit.', correct: false },
        { id: 3, text: 'But Biscuit\'s bowl was full and he was nowhere to be found.', correct: true },
        { id: 4, text: 'The back gate was wide open!', correct: true },
        { id: 5, text: 'Mia grabbed her shoes and ran outside calling his name.', correct: false },
        { id: 6, text: 'Biscuit had escaped into the neighborhood.', correct: true },
        { id: 7, text: 'The neighbors heard Mia calling and came to help.', correct: false },
        { id: 8, text: 'After an hour, Biscuit was still missing.', correct: true },
      ],
    };
  }

  if (lessonId.includes('hist') && lessonId.includes('10')) {
    return {
      title: '📜 Primary Source Detective',
      instructions: 'Read this excerpt from the Declaration of Independence. Highlight sentences that talk about RIGHTS of the people.',
      docIcon: '🏛️',
      docTitle: 'Declaration of Independence (Simplified)',
      segments: [
        { id: 1, text: 'In 1776, the colonies decided to be free from Britain.', correct: false },
        { id: 2, text: 'All people are created equal.', correct: true },
        { id: 3, text: 'Everyone has the right to life, liberty, and the pursuit of happiness.', correct: true },
        { id: 4, text: 'The king had been unfair to the colonists for many years.', correct: false },
        { id: 5, text: 'Governments get their power from the people they serve.', correct: true },
        { id: 6, text: 'When a government is unfair, people have the right to change it.', correct: true },
        { id: 7, text: 'The document was signed by 56 delegates.', correct: false },
      ],
    };
  }

  return {
    title: '🔍 Text Detective',
    instructions: 'Read the document carefully. Highlight the key information requested!',
    docIcon: '📄',
    docTitle: 'Document',
    segments: [
      { id: 1, text: 'This is the main topic sentence of the paragraph.', correct: true },
      { id: 2, text: 'Here is a supporting detail that proves the main idea.', correct: true },
      { id: 3, text: 'This sentence is off-topic and doesn\'t belong.', correct: false },
      { id: 4, text: 'Another key piece of evidence for the main argument.', correct: true },
      { id: 5, text: 'This is background information, not the main point.', correct: false },
    ],
  };
}