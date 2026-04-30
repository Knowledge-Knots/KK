import { Link } from 'react-router-dom';
import { getProgress } from '@/lib/progress';
import { SUBJECTS, LESSONS } from '@/lib/curriculum';
import ProgressBar from '@/components/kk/ProgressBar';
import KKCharacter from '@/components/kk/KKCharacter';

export default function Dashboard() {
  const progress = getProgress();

  const subjectStats = Object.entries(SUBJECTS).map(([id, subject]) => {
    const allLessons = Object.values(LESSONS[id]).flat();
    const completed = allLessons.filter(l => progress.lessons[l.id]?.status === 'completed').length;
    const inProgress = allLessons.filter(l => progress.lessons[l.id]?.status === 'in_progress').length;
    const pct = Math.round((completed / allLessons.length) * 100);
    return { ...subject, completed, inProgress, total: allLessons.length, pct };
  });

  const totalCompleted = Object.values(progress.lessons).filter(l => l.status === 'completed').length;

  return (
    <div className="min-h-screen bg-cream font-nunito">
      <header className="bg-navy px-5 py-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <Link to="/" className="text-white/60 hover:text-white text-sm transition-colors">← Home</Link>
            <h1 className="font-fredoka text-3xl text-kk-orange mt-1">My Dashboard</h1>
            <p className="text-white/70 font-nunito text-sm">Track your learning journey!</p>
          </div>
          <div className="hidden md:block">
            <KKCharacter type="star" size={70} animate />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 py-6 space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: '⭐', label: 'Total Points', value: progress.totalPoints, bg: 'bg-kk-yellow/30' },
            { icon: '🔥', label: 'Streak Days', value: progress.streakDays, bg: 'bg-kk-orange/20' },
            { icon: '✅', label: 'Lessons Done', value: totalCompleted, bg: 'bg-kk-green/20' },
          ].map(stat => (
            <div key={stat.label} className={`${stat.bg} rounded-2xl p-4 text-center`}>
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="font-fredoka text-3xl text-gray-800">{stat.value}</div>
              <div className="font-nunito text-gray-500 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Stars earned */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="text-4xl">⭐</div>
          <div className="flex-1">
            <p className="font-fredoka text-2xl text-gray-800">{progress.stars} Stars Earned</p>
            <p className="font-nunito text-gray-500 text-sm">Each completed lesson earns you a star!</p>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: Math.min(progress.stars, 5) }).map((_, i) => (
              <span key={i} className="text-2xl">⭐</span>
            ))}
            {progress.stars > 5 && <span className="font-fredoka text-gray-500 self-center">+{progress.stars - 5}</span>}
          </div>
        </div>

        {/* Subject progress */}
        <div>
          <h2 className="font-fredoka text-2xl text-gray-800 mb-4">Subject Progress</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {subjectStats.map(subj => (
              <Link key={subj.id} to={`/subject/${subj.id}`}>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer hover:scale-102">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: subj.color + '22' }}>
                      {subj.emoji}
                    </div>
                    <div>
                      <p className="font-fredoka text-gray-800 text-lg">{subj.fullName}</p>
                      <p className="font-nunito text-gray-400 text-xs">{subj.completed}/{subj.total} lessons</p>
                    </div>
                    <div className="ml-auto font-fredoka text-xl" style={{ color: subj.color }}>{subj.pct}%</div>
                  </div>
                  <ProgressBar pct={subj.pct} color={subj.color} showLabel={false} />
                  {subj.inProgress > 0 && (
                    <p className="text-xs text-gray-400 mt-2 font-nunito">▶ {subj.inProgress} in progress</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        {totalCompleted > 0 && (
          <div>
            <h2 className="font-fredoka text-2xl text-gray-800 mb-4">Recent Completions</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
              {Object.entries(progress.lessons)
                .filter(([, v]) => v.status === 'completed')
                .sort(([, a], [, b]) => (b.completedAt || 0) - (a.completedAt || 0))
                .slice(0, 8)
                .map(([id, data]) => {
                  const subjectId = id.split('-')[0];
                  const subj = SUBJECTS[subjectId];
                  const allLessons = Object.values(LESSONS[subjectId] || {}).flat();
                  const lesson = allLessons.find(l => l.id === id);
                  if (!lesson || !subj) return null;
                  return (
                    <div key={id} className="flex items-center gap-3 px-4 py-3">
                      <span className="text-2xl">{lesson.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-nunito font-bold text-gray-800 text-sm truncate">{lesson.title}</p>
                        <p className="font-nunito text-gray-400 text-xs">{subj.name}</p>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 font-fredoka text-sm">
                        ⭐ {lesson.points}
                      </div>
                      <span className="text-green-500 text-lg">✓</span>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {totalCompleted === 0 && (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
            <KKCharacter type="blob" color="#64B5F6" size={80} animate className="mx-auto mb-4" />
            <h3 className="font-fredoka text-2xl text-gray-700 mb-2">No lessons completed yet!</h3>
            <p className="font-nunito text-gray-500 mb-5">Start your first lesson to earn points and stars!</p>
            <Link to="/subject/ela">
              <button className="bg-kk-orange text-white font-fredoka text-xl px-8 py-3 rounded-2xl hover:scale-105 transition-all">
                Start Learning! 🚀
              </button>
            </Link>
          </div>
        )}

        {/* Characters decoration */}
        <div className="flex justify-center gap-6 pt-4 pb-8">
          {['blob', 'square', 'flower', 'triangle'].map((t, i) => (
            <KKCharacter key={t} type={t} color={['#64B5F6', '#F5A623', '#3CB371', '#F06292'][i]} size={45} animate />
          ))}
        </div>
      </main>
    </div>
  );
}