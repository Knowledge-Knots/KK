import { useState } from 'react';

export default function SequenceActivity({ lesson, onComplete }) {
  const config = getConfig(lesson.id);
  const [items, setItems] = useState(shuffleArray(config.items));
  const [dragIdx, setDragIdx] = useState(null);
  const [result, setResult] = useState(null);

  function shuffleArray(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  const handleDragStart = (idx) => setDragIdx(idx);

  const handleDrop = (targetIdx) => {
    if (dragIdx === null || dragIdx === targetIdx) return;
    const next = [...items];
    const [moved] = next.splice(dragIdx, 1);
    next.splice(targetIdx, 0, moved);
    setItems(next);
    setDragIdx(null);
    setResult(null);
  };

  const handleCheck = () => {
    const correct = items.every((item, idx) => item.order === idx + 1);
    if (correct) {
      setResult({ type: 'success', msg: 'Perfect order! You nailed it! 🎉' });
    } else {
      const partiallyCorrect = items.filter((item, idx) => item.order === idx + 1).length;
      setResult({ type: 'retry', msg: `${partiallyCorrect}/${items.length} in the right spot. Keep rearranging!` });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-fredoka text-2xl text-gray-800 mb-1">{config.title}</h3>
        <p className="font-nunito text-gray-600">{config.instructions}</p>
      </div>

      {config.scenario && (
        <div className="bg-kk-lightblue/20 rounded-2xl p-4 border border-kk-lightblue/40">
          <p className="font-nunito text-gray-700 italic">{config.scenario}</p>
        </div>
      )}

      <div className="space-y-2">
        <p className="font-fredoka text-gray-600 text-sm">Drag to reorder:</p>
        {items.map((item, idx) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragOver={e => e.preventDefault()}
            onDrop={() => handleDrop(idx)}
            className={`flex items-center gap-3 bg-white border-2 rounded-xl p-3 cursor-grab active:cursor-grabbing transition-all select-none hover:shadow-md ${dragIdx === idx ? 'opacity-50 scale-95' : ''}`}
            style={{ borderColor: '#e5e7eb' }}
          >
            <div className="w-8 h-8 bg-navy text-white rounded-full flex items-center justify-center font-fredoka text-sm flex-shrink-0">
              {idx + 1}
            </div>
            <span className="text-xl flex-shrink-0">{item.emoji}</span>
            <p className="font-nunito font-bold text-gray-800">{item.label}</p>
            <div className="ml-auto text-gray-400 text-lg">⠿</div>
          </div>
        ))}
      </div>

      {result && (
        <div className={`rounded-2xl p-4 text-center font-fredoka text-xl ${result.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
          {result.msg}
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={handleCheck} className="flex-1 bg-navy text-white font-fredoka text-lg py-3 rounded-2xl hover:opacity-90">
          Check Order ✓
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
  if (lessonId.includes('ela') && lessonId.includes('6')) {
    return {
      title: '🏗️ Build the Story Structure',
      instructions: 'Every great story has a beginning, middle, and end. Drag the story events into the correct order!',
      scenario: '"The Little Robot" — A robot wakes up, explores the city, gets lost, makes a friend, and finally finds home.',
      items: [
        { id: '1', order: 1, label: 'The robot powers on for the first time', emoji: '🤖' },
        { id: '2', order: 2, label: 'The robot wanders into the city streets', emoji: '🏙️' },
        { id: '3', order: 3, label: 'The robot gets lost and feels scared', emoji: '😟' },
        { id: '4', order: 4, label: 'A kind girl finds the robot and helps', emoji: '👧' },
        { id: '5', order: 5, label: 'Together they find the robot\'s home', emoji: '🏠' },
      ],
    };
  }

  if (lessonId.includes('sci') && lessonId.includes('2')) {
    return {
      title: '🌱 Plant Life Cycle',
      instructions: 'Put the stages of a plant\'s life cycle in the correct order!',
      items: [
        { id: '1', order: 1, label: 'Seed is planted in soil', emoji: '🌱' },
        { id: '2', order: 2, label: 'Roots grow down, sprout grows up', emoji: '🌿' },
        { id: '3', order: 3, label: 'Stem and leaves develop', emoji: '🍃' },
        { id: '4', order: 4, label: 'Flower blooms', emoji: '🌸' },
        { id: '5', order: 5, label: 'Fruit forms with new seeds', emoji: '🍎' },
      ],
    };
  }

  if (lessonId.includes('hist') && lessonId.includes('1')) {
    return {
      title: '📅 American History Timeline',
      instructions: 'Arrange these important events in the order they happened!',
      items: [
        { id: '1', order: 1, label: 'Pilgrims arrive at Plymouth Rock (1620)', emoji: '⛵' },
        { id: '2', order: 2, label: 'Declaration of Independence signed (1776)', emoji: '📜' },
        { id: '3', order: 3, label: 'Constitution is written (1787)', emoji: '🏛️' },
        { id: '4', order: 4, label: 'Civil War ends (1865)', emoji: '⚔️' },
        { id: '5', order: 5, label: 'Moon landing (1969)', emoji: '🚀' },
      ],
    };
  }

  // Morning routine for K
  if (lessonId.includes('k')) {
    return {
      title: '☀️ Morning Routine Order',
      instructions: 'Help put the morning steps in the right order!',
      items: [
        { id: '1', order: 1, label: 'Wake up and stretch', emoji: '😴' },
        { id: '2', order: 2, label: 'Brush teeth', emoji: '🪥' },
        { id: '3', order: 3, label: 'Eat breakfast', emoji: '🥣' },
        { id: '4', order: 4, label: 'Get dressed', emoji: '👕' },
        { id: '5', order: 5, label: 'Grab backpack and go to school', emoji: '🎒' },
      ],
    };
  }

  return {
    title: '📋 Put It in Order',
    instructions: 'Drag the steps into the correct sequence!',
    items: [
      { id: '1', order: 1, label: 'First step', emoji: '1️⃣' },
      { id: '2', order: 2, label: 'Second step', emoji: '2️⃣' },
      { id: '3', order: 3, label: 'Third step', emoji: '3️⃣' },
      { id: '4', order: 4, label: 'Fourth step', emoji: '4️⃣' },
      { id: '5', order: 5, label: 'Fifth step', emoji: '5️⃣' },
    ],
  };
}