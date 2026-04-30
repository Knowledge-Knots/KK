import { useState } from 'react';

export default function MatchingActivity({ lesson, onComplete }) {
  const config = getConfig(lesson.id);
  const [selected, setSelected] = useState({ left: null, right: null });
  const [matches, setMatches] = useState({});
  const [wrong, setWrong] = useState(null);
  const [result, setResult] = useState(null);

  const leftItems = config.pairs.map(p => ({ id: p.id, content: p.left, emoji: p.leftEmoji }));
  const rightItems = [...config.pairs].sort(() => Math.random() - 0.5).map(p => ({ id: p.id, content: p.right, emoji: p.rightEmoji }));

  const handleSelect = (side, id) => {
    if (matches[id]) return;
    if (side === 'left') {
      if (selected.right !== null) {
        // Check match
        if (selected.right === id) {
          setMatches(prev => ({ ...prev, [id]: true }));
          setSelected({ left: null, right: null });
          setWrong(null);
        } else {
          setWrong({ left: id, right: selected.right });
          setTimeout(() => { setWrong(null); setSelected({ left: null, right: null }); }, 800);
        }
      } else {
        setSelected(prev => ({ ...prev, left: id }));
      }
    } else {
      if (selected.left !== null) {
        if (selected.left === id) {
          setMatches(prev => ({ ...prev, [id]: true }));
          setSelected({ left: null, right: null });
          setWrong(null);
        } else {
          setWrong({ left: selected.left, right: id });
          setTimeout(() => { setWrong(null); setSelected({ left: null, right: null }); }, 800);
        }
      } else {
        setSelected(prev => ({ ...prev, right: id }));
      }
    }
  };

  const allMatched = Object.keys(matches).length === config.pairs.length;

  const getBtnClass = (side, id) => {
    if (matches[id]) return 'bg-green-100 border-kk-green text-green-800';
    if (wrong?.left === id || wrong?.right === id) return 'bg-red-100 border-red-400 animate-wiggle';
    if ((side === 'left' && selected.left === id) || (side === 'right' && selected.right === id)) return 'bg-navy border-navy text-white scale-105';
    return 'bg-white border-gray-300 hover:border-navy hover:scale-102';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-fredoka text-2xl text-gray-800 mb-1">{config.title}</h3>
        <p className="font-nunito text-gray-600">{config.instructions}</p>
        <p className="text-sm text-blue-600 mt-2">💡 Click one from each column to match them!</p>
      </div>

      {config.scenario && (
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
          <p className="font-nunito text-gray-700">{config.scenario}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          {leftItems.map(item => (
            <button
              key={item.id}
              onClick={() => !matches[item.id] && handleSelect('left', item.id)}
              className={`w-full border-2 rounded-xl p-3 text-left font-nunito font-bold transition-all text-sm ${getBtnClass('left', item.id)}`}
            >
              {item.emoji && <span className="mr-2">{item.emoji}</span>}{item.content}
              {matches[item.id] && <span className="ml-auto float-right">✓</span>}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {rightItems.map(item => (
            <button
              key={item.id}
              onClick={() => !matches[item.id] && handleSelect('right', item.id)}
              className={`w-full border-2 rounded-xl p-3 text-left font-nunito font-bold transition-all text-sm ${getBtnClass('right', item.id)}`}
            >
              {item.emoji && <span className="mr-2">{item.emoji}</span>}{item.content}
              {matches[item.id] && <span className="ml-auto float-right">✓</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between text-sm font-nunito text-gray-500">
        <span>Matched: {Object.keys(matches).length} / {config.pairs.length}</span>
        <div className="h-2 w-48 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-kk-green rounded-full transition-all" style={{ width: `${(Object.keys(matches).length / config.pairs.length) * 100}%` }} />
        </div>
      </div>

      {allMatched && (
        <div className="bg-green-100 rounded-2xl p-4 text-center font-fredoka text-xl text-green-700">
          All matched! You're a superstar! ⭐⭐⭐
        </div>
      )}

      {allMatched && (
        <button onClick={() => onComplete(lesson.points)} className="w-full bg-kk-green text-white font-fredoka text-lg py-3 rounded-2xl hover:opacity-90">
          Complete Lesson! 🎉
        </button>
      )}
    </div>
  );
}

function getConfig(lessonId) {
  if (lessonId.includes('ela') && lessonId.includes('4')) {
    return {
      title: '🏪 Vocabulary Word Market',
      instructions: 'Match each word to its definition — like reading the grocery store labels!',
      scenario: '🛒 You\'re shopping for words at the Word Market. Match the item on the shelf to the right description!',
      pairs: [
        { id: 1, left: 'Enormous', leftEmoji: '🐘', right: 'Very, very big', rightEmoji: '' },
        { id: 2, left: 'Ancient', leftEmoji: '🏺', right: 'Very old', rightEmoji: '' },
        { id: 3, left: 'Fragile', leftEmoji: '🥚', right: 'Easily broken', rightEmoji: '' },
        { id: 4, left: 'Vivid', leftEmoji: '🎨', right: 'Bright and colorful', rightEmoji: '' },
        { id: 5, left: 'Timid', leftEmoji: '🐭', right: 'Shy and nervous', rightEmoji: '' },
        { id: 6, left: 'Ferocious', leftEmoji: '🦁', right: 'Very fierce and wild', rightEmoji: '' },
      ],
    };
  }

  if (lessonId.includes('sci') && lessonId.includes('3')) {
    return {
      title: '🐻 Animal Habitat Match',
      instructions: 'Match each animal to its natural habitat!',
      pairs: [
        { id: 1, left: 'Polar Bear', leftEmoji: '🐻❄️', right: 'Arctic Tundra', rightEmoji: '❄️' },
        { id: 2, left: 'Camel', leftEmoji: '🐪', right: 'Hot Desert', rightEmoji: '🏜️' },
        { id: 3, left: 'Clownfish', leftEmoji: '🐠', right: 'Coral Reef Ocean', rightEmoji: '🌊' },
        { id: 4, left: 'Toucan', leftEmoji: '🦜', right: 'Tropical Rainforest', rightEmoji: '🌴' },
        { id: 5, left: 'Moose', leftEmoji: '🫎', right: 'Northern Forest', rightEmoji: '🌲' },
        { id: 6, left: 'Kangaroo', leftEmoji: '🦘', right: 'Australian Grasslands', rightEmoji: '🌾' },
      ],
    };
  }

  if (lessonId.includes('hist') && lessonId.includes('6')) {
    return {
      title: '🌍 World Cultures Market',
      instructions: 'Match each cultural tradition to the correct country!',
      pairs: [
        { id: 1, left: 'Holi Festival of Colors', leftEmoji: '🎨', right: 'India', rightEmoji: '🇮🇳' },
        { id: 2, left: 'Cherry Blossom Festival', leftEmoji: '🌸', right: 'Japan', rightEmoji: '🇯🇵' },
        { id: 3, left: 'Dia de los Muertos', leftEmoji: '💀', right: 'Mexico', rightEmoji: '🇲🇽' },
        { id: 4, left: 'Carnival in Rio', leftEmoji: '🎭', right: 'Brazil', rightEmoji: '🇧🇷' },
        { id: 5, left: 'Mardi Gras', leftEmoji: '🎊', right: 'USA/New Orleans', rightEmoji: '🇺🇸' },
      ],
    };
  }

  return {
    title: '🔗 Make the Match!',
    instructions: 'Connect each item on the left with its correct match on the right!',
    pairs: [
      { id: 1, left: 'Sun', leftEmoji: '☀️', right: 'Star at center of Solar System', rightEmoji: '' },
      { id: 2, left: 'Moon', leftEmoji: '🌙', right: 'Earth\'s natural satellite', rightEmoji: '' },
      { id: 3, left: 'Rain', leftEmoji: '🌧️', right: 'Water falling from clouds', rightEmoji: '' },
      { id: 4, left: 'Wind', leftEmoji: '💨', right: 'Moving air', rightEmoji: '' },
    ],
  };
}