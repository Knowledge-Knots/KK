import { useState } from 'react';

// Generic drag-to-sort activity - items dragged into categories
export default function DragSortActivity({ lesson, onComplete }) {
  const configs = getConfig(lesson.id);
  const [bins, setBins] = useState(configs.bins.map(b => ({ ...b, items: [] })));
  const [pool, setPool] = useState(shuffleArray(configs.items));
  const [dragging, setDragging] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const [result, setResult] = useState(null);

  function shuffleArray(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  const handleDragStart = (item, fromBin = null) => {
    setDragging({ item, fromBin });
  };

  const handleDrop = (toBinId) => {
    if (!dragging) return;
    const { item, fromBin } = dragging;
    setPool(prev => prev.filter(i => i.id !== item.id));
    setBins(prev => prev.map(b => {
      if (b.id === toBinId) return { ...b, items: [...b.items, item] };
      if (b.id === fromBin) return { ...b, items: b.items.filter(i => i.id !== item.id) };
      return b;
    }));
    setDragging(null);
    setDragOver(null);
  };

  const handleDropToPool = () => {
    if (!dragging || dragging.fromBin === null) return;
    const { item, fromBin } = dragging;
    setBins(prev => prev.map(b => b.id === fromBin ? { ...b, items: b.items.filter(i => i.id !== item.id) } : b));
    setPool(prev => [...prev, item]);
    setDragging(null);
  };

  const handleCheck = () => {
    let correct = 0;
    let total = 0;
    bins.forEach(bin => {
      bin.items.forEach(item => {
        total++;
        if (item.correctBin === bin.id) correct++;
      });
    });
    const allPlaced = pool.length === 0;
    if (!allPlaced) { setResult({ type: 'warn', msg: 'Place all items before checking!' }); return; }
    const pct = Math.round((correct / total) * 100);
    setResult({ type: pct >= 70 ? 'success' : 'retry', msg: pct >= 70 ? `Great job! ${correct}/${total} correct! 🎉` : `${correct}/${total} correct — try again!`, pct });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-fredoka text-2xl text-gray-800 mb-1">{configs.title}</h3>
        <p className="font-nunito text-gray-600">{configs.instructions}</p>
      </div>

      {/* Item Pool */}
      <div
        className="bg-amber-50 rounded-2xl p-4 border-2 border-dashed border-amber-300 min-h-[80px]"
        onDragOver={e => e.preventDefault()}
        onDrop={handleDropToPool}
      >
        <p className="text-xs font-bold text-amber-700 mb-2">ITEMS TO SORT:</p>
        <div className="flex flex-wrap gap-2">
          {pool.map(item => (
            <div
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(item, null)}
              className="bg-white border-2 border-amber-400 rounded-xl px-3 py-2 cursor-grab active:cursor-grabbing font-nunito font-bold text-gray-800 text-sm shadow-sm hover:shadow-md transition-all select-none"
            >
              {item.emoji && <span className="mr-1">{item.emoji}</span>}{item.label}
            </div>
          ))}
          {pool.length === 0 && <p className="text-amber-600 text-sm italic">All items placed! Check your answers.</p>}
        </div>
      </div>

      {/* Bins */}
      <div className={`grid gap-4 ${bins.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {bins.map(bin => (
          <div
            key={bin.id}
            onDragOver={e => { e.preventDefault(); setDragOver(bin.id); }}
            onDragLeave={() => setDragOver(null)}
            onDrop={() => handleDrop(bin.id)}
            className={`rounded-2xl border-3 border-dashed p-3 min-h-[120px] transition-all ${dragOver === bin.id ? 'scale-102 shadow-lg' : ''}`}
            style={{ backgroundColor: bin.color + '22', borderColor: bin.color, borderWidth: '3px' }}
          >
            <p className="font-fredoka text-center mb-2" style={{ color: bin.color }}>{bin.label}</p>
            <div className="space-y-2">
              {bin.items.map(item => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(item, bin.id)}
                  className="bg-white rounded-lg px-2 py-1 text-sm font-nunito font-bold text-gray-700 cursor-grab shadow-sm text-center"
                >
                  {item.emoji && <span className="mr-1">{item.emoji}</span>}{item.label}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {result && (
        <div className={`rounded-2xl p-4 text-center font-fredoka text-xl ${result.type === 'success' ? 'bg-green-100 text-green-700' : result.type === 'warn' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
          {result.msg}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleCheck}
          className="flex-1 bg-navy text-white font-fredoka text-lg py-3 rounded-2xl hover:opacity-90 transition-all"
        >
          Check Answers ✓
        </button>
        {result?.type === 'success' && (
          <button
            onClick={() => onComplete(lesson.points)}
            className="flex-1 bg-kk-green text-white font-fredoka text-lg py-3 rounded-2xl hover:opacity-90 transition-all"
          >
            Complete Lesson! 🎉
          </button>
        )}
      </div>
    </div>
  );
}

function getConfig(lessonId) {
  // Fact vs Opinion - Cereal Box
  if (lessonId.includes('ela') && lessonId.includes('2')) {
    return {
      title: '🥣 Cereal Box Fact vs Opinion Sorter',
      instructions: 'Drag each claim from the cereal box into the correct bin — FACT or OPINION!',
      bins: [
        { id: 'fact', label: '📋 FACT', color: '#2D4A7A' },
        { id: 'opinion', label: '💭 OPINION', color: '#F06292' },
      ],
      items: [
        { id: '1', label: 'Contains 12g of sugar per serving', emoji: '', correctBin: 'fact' },
        { id: '2', label: 'This is the best cereal ever made', emoji: '', correctBin: 'opinion' },
        { id: '3', label: 'Made with whole grain wheat', emoji: '', correctBin: 'fact' },
        { id: '4', label: 'Everyone loves the crunchy taste', emoji: '', correctBin: 'opinion' },
        { id: '5', label: 'Provides 8 vitamins and minerals', emoji: '', correctBin: 'fact' },
        { id: '6', label: 'Tastes better with cold milk', emoji: '', correctBin: 'opinion' },
      ],
    };
  }

  // Math: Sharing snacks (division)
  if (lessonId.includes('math') && lessonId.includes('15')) {
    return {
      title: '🍫 Share the Snacks Equally!',
      instructions: 'A class of 3 groups needs to share 12 snacks. Drag snacks into equal groups!',
      bins: [
        { id: 'g1', label: '👧 Group 1', color: '#F5A623' },
        { id: 'g2', label: '👦 Group 2', color: '#3CB371' },
        { id: 'g3', label: '🧑 Group 3', color: '#64B5F6' },
      ],
      items: Array.from({ length: 12 }, (_, i) => ({ id: `snack-${i}`, label: `Snack ${i + 1}`, emoji: '🍫', correctBin: `g${(i % 3) + 1}` })),
    };
  }

  // Science: Sort living vs non-living
  if (lessonId.includes('sci') && lessonId.includes('1')) {
    return {
      title: '🌳 Living vs Non-Living Sorter',
      instructions: 'You\'re on a nature walk! Sort each thing you see into Living or Non-Living.',
      bins: [
        { id: 'living', label: '🌱 Living', color: '#3CB371' },
        { id: 'nonliving', label: '🪨 Non-Living', color: '#9E9E9E' },
      ],
      items: [
        { id: '1', label: 'Oak Tree', emoji: '🌳', correctBin: 'living' },
        { id: '2', label: 'Rock', emoji: '🪨', correctBin: 'nonliving' },
        { id: '3', label: 'Butterfly', emoji: '🦋', correctBin: 'living' },
        { id: '4', label: 'Water Bottle', emoji: '🍶', correctBin: 'nonliving' },
        { id: '5', label: 'Mushroom', emoji: '🍄', correctBin: 'living' },
        { id: '6', label: 'Bicycle', emoji: '🚲', correctBin: 'nonliving' },
        { id: '7', label: 'Earthworm', emoji: '🐛', correctBin: 'living' },
        { id: '8', label: 'Sand', emoji: '⏳', correctBin: 'nonliving' },
      ],
    };
  }

  // History: Needs vs Wants
  if (lessonId.includes('hist') && lessonId.includes('8')) {
    return {
      title: '🛒 Needs vs Wants Store',
      instructions: 'Help sort the shopping cart! Which items are NEEDS and which are WANTS?',
      bins: [
        { id: 'need', label: '✅ NEED', color: '#3CB371' },
        { id: 'want', label: '🛍️ WANT', color: '#F5A623' },
      ],
      items: [
        { id: '1', label: 'Food', emoji: '🍎', correctBin: 'need' },
        { id: '2', label: 'Video Game', emoji: '🎮', correctBin: 'want' },
        { id: '3', label: 'Warm Coat', emoji: '🧥', correctBin: 'need' },
        { id: '4', label: 'Candy Bar', emoji: '🍫', correctBin: 'want' },
        { id: '5', label: 'Medicine', emoji: '💊', correctBin: 'need' },
        { id: '6', label: 'Toy Car', emoji: '🚗', correctBin: 'want' },
        { id: '7', label: 'Clean Water', emoji: '💧', correctBin: 'need' },
        { id: '8', label: 'New Sneakers', emoji: '👟', correctBin: 'want' },
      ],
    };
  }

  // Default generic sort
  return {
    title: `🎯 ${getLessonTitle(lessonId)} Sorter`,
    instructions: 'Drag each item into the correct category!',
    bins: [
      { id: 'a', label: '✅ Category A', color: '#3CB371' },
      { id: 'b', label: '🔵 Category B', color: '#64B5F6' },
    ],
    items: [
      { id: '1', label: 'Item 1', emoji: '🔴', correctBin: 'a' },
      { id: '2', label: 'Item 2', emoji: '🔵', correctBin: 'b' },
      { id: '3', label: 'Item 3', emoji: '🟢', correctBin: 'a' },
      { id: '4', label: 'Item 4', emoji: '🟡', correctBin: 'b' },
      { id: '5', label: 'Item 5', emoji: '🟠', correctBin: 'a' },
      { id: '6', label: 'Item 6', emoji: '🟣', correctBin: 'b' },
    ],
  };
}

function getLessonTitle(id) {
  return id.split('-').slice(2).join(' ').replace(/\b\w/g, c => c.toUpperCase());
}