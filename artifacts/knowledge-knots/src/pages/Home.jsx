import { Link } from 'react-router-dom';
import { getProgress } from '@/lib/progress';
import KKCharacter from '@/components/kk/KKCharacter';

const subjects = [
  {
    id: 'ela',
    label: 'English',
    sub: 'Reading & Writing',
    color: '#F5A623',
    icon: '📖',
    path: '/subject/ela',
  },
  {
    id: 'math',
    label: 'Math',
    sub: 'Numbers & Logic',
    color: '#3CB371',
    icon: '➗',
    path: '/subject/math',
  },
  {
    id: 'science',
    label: 'Science',
    sub: 'Explore the World',
    color: '#64B5F6',
    icon: '🔬',
    path: '/subject/science',
  },
  {
    id: 'history',
    label: 'History',
    sub: 'Stories of People',
    color: '#F06292',
    icon: '🌍',
    path: '/subject/history',
  },
];

export default function Home() {
  const progress = getProgress();
  const completedCount = Object.values(progress.lessons).filter(l => l.status === 'completed').length;

  return (
    <div className="min-h-screen font-nunito" style={{ backgroundColor: '#F5EFE0' }}>

      {/* ── TOP NAV ── */}
      <nav className="bg-navy text-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <KKCharacter type="star" size={36} />
            <span className="font-fredoka text-2xl text-kk-orange">Knowledge Knots</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to="/dashboard"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition font-nunito font-bold text-sm"
            >
              <span className="text-kk-yellow">⭐ {progress.totalPoints}</span>
              <span className="text-white/40">|</span>
              <span>{progress.streakDays}🔥</span>
              <span className="text-white/70 ml-1">Dashboard</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header className="bg-navy text-white relative overflow-hidden">
        {/* soft decorative blobs */}
        <div className="absolute -top-12 -right-16 w-72 h-72 rounded-full opacity-20" style={{ backgroundColor: '#F5A623' }} />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-10" style={{ backgroundColor: '#F06292' }} />

        <div className="relative max-w-5xl mx-auto px-6 py-12 md:py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-block bg-white/10 text-kk-yellow font-fredoka px-3 py-1 rounded-full text-sm mb-4">
              ✨ Hands-on learning, K–12
            </span>
            <h1 className="font-fredoka leading-[1.05] mb-4 text-5xl md:text-6xl">
              <span className="text-kk-orange">Tie new ideas</span><br />
              <span className="text-white">into knowledge knots.</span>
            </h1>
            <p className="font-nunito text-white/80 text-base md:text-lg leading-relaxed mb-6 max-w-md">
              Interactive lessons across English, Math, Science, and History — built around real-world problems your students actually want to solve.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 bg-kk-orange text-white font-fredoka text-lg px-6 py-3 rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                Start Learning 🚀
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-fredoka text-lg px-6 py-3 rounded-2xl transition-all"
              >
                My Progress
              </Link>
            </div>
          </div>

          {/* Hero mascot — big blob reading */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-kk-orange/20 blur-2xl" />
            <KKCharacter type="blob" size={340} className="relative drop-shadow-2xl" />
            <KKCharacter type="star" size={90} className="absolute -top-2 -right-2 md:right-8" />
            <KKCharacter type="flower" size={70} className="absolute bottom-0 -left-2 md:left-8" />
          </div>
        </div>
      </header>

      {/* ── SUBJECT CARDS ── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-fredoka text-navy text-3xl md:text-4xl mb-2">Pick a subject</h2>
            <p className="font-nunito text-gray-600 max-w-xl mx-auto">
              Each subject has lessons for every grade from Kindergarten through 12th — start anywhere.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {subjects.map((s) => (
              <Link
                key={s.id}
                to={s.path}
                className="group relative rounded-3xl p-5 md:p-6 text-white overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
                style={{ backgroundColor: s.color }}
              >
                <div className="text-4xl md:text-5xl mb-3">{s.icon}</div>
                <h3 className="font-fredoka text-xl md:text-2xl leading-tight">{s.label}</h3>
                <p className="font-nunito text-white/80 text-sm mt-1">{s.sub}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-fredoka opacity-90 group-hover:opacity-100">
                  Explore <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
                {/* decorative ring */}
                <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-white/15" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-white py-16 px-6 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-fredoka text-navy text-3xl md:text-4xl mb-2">How it works</h2>
            <p className="font-nunito text-gray-600">Three steps. Real practice. Real progress.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="relative mx-auto mb-4 w-44 h-44 rounded-3xl flex items-center justify-center" style={{ backgroundColor: '#F5A62318' }}>
                <KKCharacter type="square" size={150} />
                <div className="absolute -top-2 -left-2 w-9 h-9 rounded-full bg-kk-orange text-white font-fredoka flex items-center justify-center shadow-md">1</div>
              </div>
              <h3 className="font-fredoka text-navy text-xl mb-2">Choose your subject</h3>
              <p className="font-nunito text-gray-600 text-sm leading-relaxed">
                Pick from English, Math, Science, or History — then choose your grade level.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="relative mx-auto mb-4 w-44 h-44 rounded-3xl flex items-center justify-center" style={{ backgroundColor: '#3CB37118' }}>
                <KKCharacter type="flower" size={140} />
                <div className="absolute -top-2 -left-2 w-9 h-9 rounded-full bg-kk-green text-white font-fredoka flex items-center justify-center shadow-md">2</div>
              </div>
              <h3 className="font-fredoka text-navy text-xl mb-2">Try a hands-on lesson</h3>
              <p className="font-nunito text-gray-600 text-sm leading-relaxed">
                Drag, sort, highlight, sequence — every lesson is interactive, not just reading.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="relative mx-auto mb-4 w-44 h-44 rounded-3xl flex items-center justify-center" style={{ backgroundColor: '#64B5F618' }}>
                <KKCharacter type="star" size={140} />
                <div className="absolute -top-2 -left-2 w-9 h-9 rounded-full bg-kk-lightblue text-white font-fredoka flex items-center justify-center shadow-md">3</div>
              </div>
              <h3 className="font-fredoka text-navy text-xl mb-2">Earn stars & build streaks</h3>
              <p className="font-nunito text-gray-600 text-sm leading-relaxed">
                Track your points, daily streaks, and stars on a personal dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PINK CALLOUT ── */}
      <section className="bg-kk-pink px-6 py-14">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[auto_1fr] gap-8 items-center">
          <div className="flex justify-center">
            <KKCharacter type="blob" size={200} />
          </div>
          <div className="bg-white rounded-3xl px-7 py-7 shadow-xl">
            <p className="font-fredoka text-navy text-2xl mb-3">For students, by students.</p>
            <p className="font-nunito text-gray-700 leading-relaxed">
              Knowledge Knots was built around real-world situations so kids can find and create their own solutions. No filler, no endless videos — just hands-on activities you can finish in under ten minutes.
            </p>
          </div>
        </div>
      </section>

      {/* ── PROGRESS SUMMARY (only when there's progress) ── */}
      {completedCount > 0 && (
        <section className="px-6 py-14">
          <div className="max-w-5xl mx-auto bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-5">
              <KKCharacter type="star" size={56} />
              <div>
                <h2 className="font-fredoka text-2xl text-navy">Your progress so far</h2>
                <p className="font-nunito text-gray-500 text-sm">Keep it up — every lesson counts!</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-kk-orange/10 rounded-2xl py-4">
                <p className="font-fredoka text-3xl md:text-4xl text-kk-orange">{completedCount}</p>
                <p className="font-nunito text-gray-600 text-xs md:text-sm mt-1">Lessons Done</p>
              </div>
              <div className="bg-navy/10 rounded-2xl py-4">
                <p className="font-fredoka text-3xl md:text-4xl text-navy">{progress.totalPoints}</p>
                <p className="font-nunito text-gray-600 text-xs md:text-sm mt-1">Total Points</p>
              </div>
              <div className="bg-kk-green/10 rounded-2xl py-4">
                <p className="font-fredoka text-3xl md:text-4xl text-kk-green">{progress.stars}⭐</p>
                <p className="font-nunito text-gray-600 text-xs md:text-sm mt-1">Stars Earned</p>
              </div>
            </div>
            <div className="text-center mt-6">
              <Link
                to="/dashboard"
                className="inline-block bg-navy text-white font-fredoka px-6 py-2.5 rounded-xl hover:scale-105 active:scale-95 transition-all"
              >
                See full dashboard →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer className="bg-navy text-white py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <KKCharacter type="flower" size={48} />
            <div>
              <p className="font-fredoka text-xl text-kk-orange">Knowledge Knots</p>
              <p className="font-nunito text-white/60 text-sm">Hands-on learning for curious minds 🌟</p>
            </div>
          </div>
          <p className="font-nunito text-white/50 text-xs">© Knowledge Knots — for students, by students.</p>
        </div>
      </footer>
    </div>
  );
}
