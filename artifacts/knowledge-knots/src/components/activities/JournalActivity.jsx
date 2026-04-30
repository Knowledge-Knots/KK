import { useState } from 'react';

export default function JournalActivity({ lesson, onComplete }) {
  const config = getConfig(lesson.id);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const allFilled = config.prompts.every(p => (responses[p.id] || '').trim().length >= 10);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-fredoka text-2xl text-gray-800 mb-1">{config.title}</h3>
        <p className="font-nunito text-gray-600">{config.instructions}</p>
      </div>

      {/* Document/Journal template */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
        <div className="px-5 py-3 border-b flex items-center gap-3" style={{ backgroundColor: config.headerColor }}>
          <span className="text-2xl">{config.docEmoji}</span>
          <div>
            <p className="font-fredoka text-white text-lg">{config.docTitle}</p>
            <p className="font-nunito text-white/80 text-xs">{config.docSubtitle}</p>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {config.context && (
            <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-gray-300">
              <p className="font-nunito text-gray-700 text-sm leading-relaxed">{config.context}</p>
            </div>
          )}

          {config.prompts.map((prompt, idx) => (
            <div key={prompt.id} className="space-y-2">
              <label className="font-fredoka text-gray-800 text-lg flex items-center gap-2">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: config.headerColor }}>{idx + 1}</span>
                {prompt.label}
              </label>
              {prompt.hint && <p className="text-sm text-gray-500 font-nunito italic">{prompt.hint}</p>}
              <textarea
                value={responses[prompt.id] || ''}
                onChange={e => setResponses(prev => ({ ...prev, [prompt.id]: e.target.value }))}
                disabled={submitted}
                placeholder={prompt.placeholder}
                rows={prompt.rows || 3}
                className="w-full border-2 border-gray-200 rounded-xl p-3 font-nunito text-gray-800 text-sm resize-none focus:border-navy focus:outline-none transition-all"
                style={{ lineHeight: '1.8', background: 'repeating-linear-gradient(transparent, transparent 28px, #e5e7eb 28px, #e5e7eb 29px)' }}
              />
              <div className="text-right text-xs text-gray-400">
                {(responses[prompt.id] || '').length} characters
                {(responses[prompt.id] || '').length < 10 && !submitted && <span className="text-orange-500 ml-2">(min 10 chars)</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {submitted ? (
        <div className="space-y-4">
          <div className="bg-green-100 rounded-2xl p-5 text-center">
            <div className="text-4xl mb-2">📝✅</div>
            <h3 className="font-fredoka text-2xl text-green-700">Excellent Writing!</h3>
            <p className="font-nunito text-green-600 mt-1">Your journal entry has been saved. Keep up the great work!</p>
          </div>
          <button onClick={() => onComplete(lesson.points)} className="w-full bg-kk-green text-white font-fredoka text-xl py-4 rounded-2xl hover:opacity-90">
            Complete Lesson! 🌟 +{lesson.points} pts
          </button>
        </div>
      ) : (
        <button
          onClick={handleSubmit}
          disabled={!allFilled}
          className={`w-full font-fredoka text-xl py-4 rounded-2xl transition-all ${allFilled ? 'bg-navy text-white hover:opacity-90' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          {allFilled ? 'Submit My Writing! ✏️' : 'Fill in all sections to submit'}
        </button>
      )}
    </div>
  );
}

function getConfig(lessonId) {
  if (lessonId.includes('ela') && lessonId.includes('15')) {
    return {
      title: '📓 My Story Journal',
      instructions: 'Fill in your story journal like a real author! Write at least a sentence for each part.',
      headerColor: '#2D4A7A',
      docEmoji: '📓',
      docTitle: 'Story Journal — Creative Writing',
      docSubtitle: 'Student Author',
      context: 'Every great story needs a strong beginning, middle, and end. Use this journal to plan and write your story!',
      prompts: [
        { id: 'character', label: 'My Main Character', hint: 'Describe who the story is about', placeholder: 'My character is...', rows: 2 },
        { id: 'setting', label: 'The Setting', hint: 'Where and when does your story take place?', placeholder: 'The story takes place...', rows: 2 },
        { id: 'problem', label: 'The Problem', hint: 'What challenge does your character face?', placeholder: 'The problem is...', rows: 2 },
        { id: 'solution', label: 'The Solution', hint: 'How does your character solve it?', placeholder: 'The character solves it by...', rows: 2 },
      ],
    };
  }

  if (lessonId.includes('hist') && lessonId.includes('8')) {
    return {
      title: '🚢 Immigration Stories Journal',
      instructions: 'Imagine you are an immigrant arriving at Ellis Island in 1905. Fill in your immigration journal!',
      headerColor: '#F06292',
      docEmoji: '📋',
      docTitle: 'Ellis Island Immigration Record — 1905',
      docSubtitle: 'Official Entry Form',
      context: 'Millions of people immigrated to the United States in the early 1900s, hoping for a better life. They had to answer questions when they arrived.',
      prompts: [
        { id: 'name', label: 'Your Name & Home Country', placeholder: 'My name is... and I come from...', rows: 2 },
        { id: 'reason', label: 'Why did you leave your home?', hint: 'Think about push factors — war, poverty, famine', placeholder: 'I left because...', rows: 3 },
        { id: 'hope', label: 'What do you hope for in America?', placeholder: 'In America, I hope to...', rows: 3 },
        { id: 'feeling', label: 'How do you feel arriving at Ellis Island?', placeholder: 'I feel...', rows: 2 },
      ],
    };
  }

  if (lessonId.includes('sci') && lessonId.includes('4')) {
    return {
      title: '❤️ Heart Rate Lab Journal',
      instructions: 'You\'re a junior scientist! Complete this lab journal after doing a heart rate experiment.',
      headerColor: '#3CB371',
      docEmoji: '🔬',
      docTitle: 'Lab Journal — Heart Rate Experiment',
      docSubtitle: 'Science Class Investigation',
      context: 'Your resting heart rate is about 60-100 bpm. After exercise, it goes higher. Let\'s investigate why!',
      prompts: [
        { id: 'hypothesis', label: 'My Hypothesis', hint: 'What do you predict will happen?', placeholder: 'I think my heart rate will...', rows: 2 },
        { id: 'observation', label: 'What I Observed', placeholder: 'After exercising, I noticed that...', rows: 3 },
        { id: 'data', label: 'My Data', hint: 'Estimate: resting = 70 bpm, after jumping = ?', placeholder: 'My resting heart rate was... After jumping, it was...', rows: 2 },
        { id: 'conclusion', label: 'My Conclusion', placeholder: 'I concluded that...', rows: 3 },
      ],
    };
  }

  return {
    title: '📝 Journal Entry',
    instructions: 'Complete all sections of this interactive journal!',
    headerColor: '#2D4A7A',
    docEmoji: '📓',
    docTitle: 'My Learning Journal',
    docSubtitle: 'Student Notes',
    context: null,
    prompts: [
      { id: 'q1', label: 'What did you learn?', placeholder: 'I learned that...', rows: 3 },
      { id: 'q2', label: 'Why is this important?', placeholder: 'This matters because...', rows: 3 },
      { id: 'q3', label: 'How can you use this?', placeholder: 'I can use this knowledge when...', rows: 2 },
    ],
  };
}