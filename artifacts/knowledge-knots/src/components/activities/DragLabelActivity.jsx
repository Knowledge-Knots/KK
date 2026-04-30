import { useState } from 'react';

export default function DragLabelActivity({ lesson, onComplete }) {
  const config = getConfig(lesson.id);
  const [labels, setLabels] = useState(config.labels.map(l => ({ ...l, placed: null })));
  const [slots, setSlots] = useState(config.slots.map(s => ({ ...s, filledBy: null })));
  const [dragging, setDragging] = useState(null);
  const [result, setResult] = useState(null);

  const availableLabels = labels.filter(l => !l.placed);

  const handleDrop = (slotId) => {
    if (!dragging) return;
    // Remove from old slot if re-placing
    const updatedSlots = slots.map(s => s.filledBy === dragging.id ? { ...s, filledBy: null } : s);
    const newSlots = updatedSlots.map(s => s.id === slotId ? { ...s, filledBy: dragging.id } : s);
    const newLabels = labels.map(l => l.id === dragging.id ? { ...l, placed: slotId } : l);
    setSlots(newSlots);
    setLabels(newLabels);
    setDragging(null);
  };

  const handleCheck = () => {
    const allFilled = slots.every(s => s.filledBy !== null);
    if (!allFilled) { setResult({ type: 'warn', msg: 'Fill all the blank labels first!' }); return; }
    let correct = 0;
    slots.forEach(slot => {
      if (slot.filledBy === slot.correctLabel) correct++;
    });
    const pct = Math.round((correct / slots.length) * 100);
    setResult({ type: pct >= 70 ? 'success' : 'retry', correct, total: slots.length, pct });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-fredoka text-2xl text-gray-800 mb-1">{config.title}</h3>
        <p className="font-nunito text-gray-600">{config.instructions}</p>
      </div>

      {/* Visual diagram */}
      <div className="bg-cream rounded-2xl p-6 border border-gray-200 relative">
        <div className="text-center text-6xl mb-4">{config.mainEmoji}</div>
        <h4 className="text-center font-fredoka text-gray-700 mb-6">{config.diagramTitle}</h4>

        <div className="grid grid-cols-2 gap-3">
          {slots.map(slot => {
            const filledLabel = labels.find(l => l.id === slot.filledBy);
            return (
              <div
                key={slot.id}
                onDragOver={e => e.preventDefault()}
                onDrop={() => handleDrop(slot.id)}
                className="bg-white rounded-xl border-2 border-dashed border-gray-400 p-3 text-center min-h-[70px] flex flex-col items-center justify-center gap-1"
              >
                <span className="text-2xl">{slot.emoji}</span>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{slot.hint}</span>
                {filledLabel ? (
                  <div
                    draggable
                    onDragStart={() => setDragging(filledLabel)}
                    className="bg-navy text-white rounded-lg px-2 py-1 text-xs font-bold cursor-grab mt-1"
                  >
                    {filledLabel.text}
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg px-3 py-1 text-xs text-gray-400 mt-1">drop here</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Label bank */}
      <div className="bg-amber-50 rounded-2xl p-4 border-2 border-dashed border-amber-300">
        <p className="text-xs font-bold text-amber-700 mb-2">LABEL BANK — Drag labels above:</p>
        <div className="flex flex-wrap gap-2">
          {availableLabels.map(label => (
            <div
              key={label.id}
              draggable
              onDragStart={() => setDragging(label)}
              className="bg-navy text-white rounded-xl px-3 py-2 text-sm font-bold cursor-grab active:cursor-grabbing hover:opacity-80 transition-all"
            >
              {label.text}
            </div>
          ))}
          {availableLabels.length === 0 && <p className="text-amber-600 text-sm italic">All labels placed! Check your answers.</p>}
        </div>
      </div>

      {result && (
        <div className={`rounded-2xl p-4 text-center font-fredoka text-xl ${result.type === 'success' ? 'bg-green-100 text-green-700' : result.type === 'warn' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
          {result.type === 'success' ? `${result.correct}/${result.total} correct — Great labeling! 🏷️` : result.type === 'warn' ? result.msg : `${result.correct}/${result.total} correct — Try rearranging!`}
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={handleCheck} className="flex-1 bg-navy text-white font-fredoka text-lg py-3 rounded-2xl hover:opacity-90">
          Check Labels ✓
        </button>
        {result?.type === 'success' && (
          <button onClick={() => onComplete(lesson.points)} className="flex-1 bg-kk-green text-white font-fredoka text-lg py-3 rounded-2xl hover:opacity-90">
            Complete! 🎉
          </button>
        )}
      </div>
    </div>
  );
}

function getConfig(lessonId) {
  if (lessonId.includes('sci') && (lessonId.includes('6') || lessonId.includes('7'))) {
    return {
      title: '🫀 Label the Human Body Parts',
      instructions: 'Drag the correct labels onto each body part shown!',
      mainEmoji: '🧍',
      diagramTitle: 'Human Body Systems',
      labels: [
        { id: 'brain', text: 'Brain' },
        { id: 'heart', text: 'Heart' },
        { id: 'lungs', text: 'Lungs' },
        { id: 'stomach', text: 'Stomach' },
        { id: 'bones', text: 'Skeleton/Bones' },
        { id: 'muscles', text: 'Muscles' },
      ],
      slots: [
        { id: 's1', hint: 'Controls everything', emoji: '🧠', correctLabel: 'brain' },
        { id: 's2', hint: 'Pumps blood', emoji: '❤️', correctLabel: 'heart' },
        { id: 's3', hint: 'Breathe here', emoji: '💨', correctLabel: 'lungs' },
        { id: 's4', hint: 'Digests food', emoji: '🍎', correctLabel: 'stomach' },
        { id: 's5', hint: 'Your frame', emoji: '🦴', correctLabel: 'bones' },
        { id: 's6', hint: 'Help you move', emoji: '💪', correctLabel: 'muscles' },
      ],
    };
  }

  if (lessonId.includes('ela') && lessonId.includes('5')) {
    return {
      title: '🧺 Parts of Speech Lunchbox',
      instructions: 'Label each word in the sentence with its part of speech!',
      mainEmoji: '🍱',
      diagramTitle: '"The quick brown fox jumps over the lazy dog"',
      labels: [
        { id: 'noun', text: 'Noun' },
        { id: 'verb', text: 'Verb' },
        { id: 'adj1', text: 'Adjective' },
        { id: 'adj2', text: 'Adjective' },
        { id: 'prep', text: 'Preposition' },
        { id: 'article', text: 'Article' },
      ],
      slots: [
        { id: 's1', hint: '"The"', emoji: '📝', correctLabel: 'article' },
        { id: 's2', hint: '"quick"', emoji: '💨', correctLabel: 'adj1' },
        { id: 's3', hint: '"fox"', emoji: '🦊', correctLabel: 'noun' },
        { id: 's4', hint: '"jumps"', emoji: '🏃', correctLabel: 'verb' },
        { id: 's5', hint: '"over"', emoji: '↗️', correctLabel: 'prep' },
        { id: 's6', hint: '"lazy"', emoji: '😴', correctLabel: 'adj2' },
      ],
    };
  }

  return {
    title: '🏷️ Label It!',
    instructions: 'Drag the correct labels to match each item shown!',
    mainEmoji: '🌱',
    diagramTitle: 'Parts of a Plant',
    labels: [
      { id: 'roots', text: 'Roots' },
      { id: 'stem', text: 'Stem' },
      { id: 'leaf', text: 'Leaf' },
      { id: 'flower', text: 'Flower' },
      { id: 'seed', text: 'Seed' },
      { id: 'soil', text: 'Soil' },
    ],
    slots: [
      { id: 's1', hint: 'Underground', emoji: '🌿', correctLabel: 'roots' },
      { id: 's2', hint: 'Holds it up', emoji: '📏', correctLabel: 'stem' },
      { id: 's3', hint: 'Makes food', emoji: '💚', correctLabel: 'leaf' },
      { id: 's4', hint: 'Makes seeds', emoji: '🌸', correctLabel: 'flower' },
      { id: 's5', hint: 'New plant', emoji: '🌰', correctLabel: 'seed' },
      { id: 's6', hint: 'Holds plant', emoji: '🟫', correctLabel: 'soil' },
    ],
  };
}