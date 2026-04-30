import { Link } from 'react-router-dom';
import { getProgress } from '@/lib/progress';
import { LESSONS } from '@/lib/curriculum';
import KKCharacter from '@/components/kk/KKCharacter';

const subjectButtons = [
  { id: 'ela', label: 'ELA', color: '#F5A623', path: '/subject/ela' },
  { id: 'math', label: 'Math', color: '#3CB371', path: '/subject/math' },
  { id: 'science', label: 'Science', color: '#64B5F6', path: '/subject/science' },
  { id: 'history', label: 'History', color: '#F06292', path: '/subject/history' },
];

export default function Home() {
  const progress = getProgress();
  const completedCount = Object.values(progress.lessons).filter(l => l.status === 'completed').length;

  return (
    <div className="min-h-screen font-nunito" style={{ backgroundColor: '#F5EFE0' }}>

      {/* ── HERO ── navy bg, yellow title, characters cluster top-right */}
      <header style={{ backgroundColor: '#2D4A7A' }} className="relative overflow-hidden">
        <div className="max-w-lg mx-auto px-6 pt-10 pb-8 flex items-start justify-between gap-4">
          {/* Left: title + subtitle + points pill */}
          <div className="z-10 flex-1">
            <h1 className="font-fredoka leading-tight mb-3" style={{ fontSize: '2.8rem', color: '#F5A623' }}>
              Knowledge<br />Knots
            </h1>
            <p className="font-nunito font-bold text-white/90 text-base leading-snug max-w-[220px]">
              Hands-on lessons to make learning more engaging for students!
            </p>
            <Link to="/dashboard">
              <div className="inline-flex items-center gap-2 mt-5 rounded-2xl px-4 py-2 transition-all cursor-pointer"
                style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}>
                <span className="text-kk-yellow font-fredoka">⭐ {progress.totalPoints} pts</span>
                <span className="text-white/50">|</span>
                <span className="font-fredoka text-white">{progress.streakDays}🔥</span>
              </div>
            </Link>
          </div>
          {/* Right: characters cluster (inline SVG) */}
          <div className="flex-shrink-0 -mt-2 grid grid-cols-2 gap-1">
            <KKCharacter type="star" size={70} animate />
            <KKCharacter type="blob" color="#F06292" size={70} />
            <KKCharacter type="square" color="#3CB371" size={70} />
            <KKCharacter type="flower" size={70} />
          </div>
        </div>
      </header>

      {/* ── LEARN ABOUT A SUBJECT ── cream bg, two col */}
      <section style={{ backgroundColor: '#F5EFE0' }} className="py-10 px-6">
        <div className="max-w-lg mx-auto grid grid-cols-2 gap-6 items-start">
          {/* Left */}
          <div>
            <h2 className="font-fredoka text-gray-900 leading-tight mb-3" style={{ fontSize: '1.7rem' }}>
              Learn about<br />a Subject
            </h2>
            <p className="font-nunito text-gray-600 text-sm leading-relaxed">
              Select a subject, and you'll get to use hands-on lesson plans for each subject depending on your grade level.
            </p>
            {/* Characters below the text */}
            <div className="mt-6 flex gap-3 items-end">
              <KKCharacter type="square" color="#3CB371" size={70} />
              <KKCharacter type="flower" size={70} />
            </div>
          </div>
          {/* Right: buttons */}
          <div className="flex flex-col gap-3">
            {subjectButtons.map(s => (
              <Link key={s.id} to={s.path}>
                <div
                  className="w-full py-3 px-6 rounded-xl text-white font-fredoka text-lg text-center shadow-sm hover:scale-105 active:scale-95 transition-all"
                  style={{ backgroundColor: s.color }}
                >
                  {s.label}
                </div>
              </Link>
            ))}
            <Link to="/dashboard">
              <div className="w-full py-3 px-6 rounded-xl text-white font-fredoka text-lg text-center shadow-sm hover:scale-105 active:scale-95 transition-all"
                style={{ backgroundColor: '#F06292' }}>
                View All
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── PINK CALLOUT BANNER ── */}
      <section style={{ backgroundColor: '#F06292' }} className="px-6 py-8">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          {/* Blue blob character on left */}
          <div className="flex-shrink-0">
            <KKCharacter type="blob" color="#64B5F6" size={90} />
          </div>
          {/* White card */}
          <div className="bg-white rounded-2xl px-5 py-4 shadow flex-1">
            <p className="font-nunito font-bold text-gray-800 text-sm leading-relaxed">
              Encourage students to learn through Knowledge Knots! Hands-on interactive lessons that use real-world situations, allowing students to find and create solutions!
            </p>
            <p className="font-nunito italic text-gray-500 text-xs mt-2">"for students, by students."</p>
          </div>
        </div>
      </section>

      {/* ── START YOUR FIRST LESSON ── cream bg, two col */}
      <section style={{ backgroundColor: '#F5EFE0' }} className="px-6 py-10">
        <div className="max-w-lg mx-auto grid grid-cols-2 gap-6 items-start">
          {/* Left */}
          <div>
            <h2 className="font-fredoka text-gray-900 leading-tight mb-3" style={{ fontSize: '1.7rem' }}>
              Start your first<br />lesson today!
            </h2>
            <p className="font-nunito text-gray-600 text-sm mb-3">
              Most students learn better with hands-on activities
            </p>
            <p className="font-nunito text-gray-600 text-sm mb-2">
              At Knowledge Knots, our priority is your learning and growth.
            </p>
            <ul className="font-nunito text-gray-700 text-sm space-y-1 list-disc list-inside">
              <li>Hands-on Lessons</li>
              <li>Real Life Situations</li>
            </ul>
            <Link to="/subject/ela">
              <button className="mt-5 bg-kk-orange text-white font-fredoka text-base px-6 py-2.5 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-sm">
                Start Learning! 🚀
              </button>
            </Link>
            {/* Blob at bottom */}
            <div className="mt-8">
              <KKCharacter type="blob" color="#64B5F6" size={100} />
            </div>
          </div>
          {/* Right: reminder card */}
          <div className="flex flex-col items-center gap-4 mt-4">
            {/* Flower character */}
            <div className="rounded-full flex items-center justify-center" style={{ backgroundColor: '#3CB371', width: 160, height: 160 }}>
              <KKCharacter type="flower" size={130} />
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm text-center w-full">
              <p className="font-fredoka text-gray-800 text-lg mb-1">Reminder</p>
              <p className="font-nunito text-gray-600 text-xs leading-relaxed">
                If you're ever stuck don't be afraid to ask for help. Learning is all about trial and error
              </p>
            </div>
            {/* Triangle character */}
            <KKCharacter type="triangle" size={90} />
          </div>
        </div>
      </section>

      {/* Progress summary if any */}
      {completedCount > 0 && (
        <section style={{ backgroundColor: '#F5EFE0' }} className="px-6 pb-10">
          <div className="max-w-lg mx-auto bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <h2 className="font-fredoka text-xl text-gray-800 mb-4">Your Progress 📊</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="font-fredoka text-3xl text-kk-orange">{completedCount}</p>
                <p className="font-nunito text-gray-500 text-xs">Lessons Done</p>
              </div>
              <div>
                <p className="font-fredoka text-3xl text-navy">{progress.totalPoints}</p>
                <p className="font-nunito text-gray-500 text-xs">Total Points</p>
              </div>
              <div>
                <p className="font-fredoka text-3xl text-kk-green">{progress.stars}⭐</p>
                <p className="font-nunito text-gray-500 text-xs">Stars Earned</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={{ backgroundColor: '#2D4A7A' }} className="text-white py-6 px-5 text-center">
        <p className="font-fredoka text-xl text-kk-orange mb-1">Knowledge Knots</p>
        <p className="font-nunito text-white/60 text-sm">Hands-on learning for curious minds 🌟</p>
      </footer>
    </div>
  );
}
