import { getLessonStatus } from '@/lib/progress';

const statusConfig = {
  not_started: { label: 'Start', bg: 'bg-white', border: 'border-gray-200', badge: null },
  in_progress: { label: 'Continue', bg: 'bg-blue-50', border: 'border-kk-lightblue', badge: '▶ In Progress' },
  completed: { label: 'Review', bg: 'bg-green-50', border: 'border-kk-green', badge: '✓ Complete' },
};

export default function LessonCard({ lesson, subjectColor, onClick }) {
  const status = getLessonStatus(lesson.id);
  const cfg = statusConfig[status];

  return (
    <div
      className={`rounded-2xl border-2 ${cfg.border} ${cfg.bg} p-4 transition-all hover:scale-105 hover:shadow-lg active:scale-95`}
      style={{ borderColor: status === 'not_started' ? '#e5e7eb' : undefined }}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-3xl">{lesson.icon}</span>
        {cfg.badge && (
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: status === 'completed' ? '#3CB371' : '#64B5F6' }}
          >
            {cfg.badge}
          </span>
        )}
      </div>
      <h3 className="font-fredoka text-gray-800 text-lg leading-tight">{lesson.title}</h3>
      <p className="font-nunito text-gray-500 text-sm mt-1">{lesson.subtitle}</p>
      <div className="flex items-center justify-between mt-3">
        <span className="text-xs font-bold text-amber-600">⭐ {lesson.points} pts</span>
        <button
          className="text-sm font-bold px-3 py-1 rounded-full text-white transition-all"
          style={{ backgroundColor: subjectColor }}
        >
          {cfg.label}
        </button>
      </div>
    </div>
  );
}