import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SUBJECTS, LESSONS } from '@/lib/curriculum';
import { markLessonComplete, markLessonInProgress, getLessonStatus } from '@/lib/progress';
import DragSortActivity from '@/components/activities/DragSortActivity';
import SequenceActivity from '@/components/activities/SequenceActivity';
import HighlightActivity from '@/components/activities/HighlightActivity';
import MatchingActivity from '@/components/activities/MatchingActivity';
import DragLabelActivity from '@/components/activities/DragLabelActivity';
import ClickIdentifyActivity from '@/components/activities/ClickIdentifyActivity';
import JournalActivity from '@/components/activities/JournalActivity';
import KKCharacter from '@/components/kk/KKCharacter';

export default function LessonPage() {
  const { subjectId, grade, lessonId } = useParams();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);

  const subject = SUBJECTS[subjectId];
  const gradeLessons = LESSONS[subjectId]?.[grade] || [];
  const lesson = gradeLessons.find(l => l.id === lessonId);

  useEffect(() => {
    if (lesson && getLessonStatus(lesson.id) === 'not_started') {
      markLessonInProgress(lesson.id);
    }
  }, [lesson]);

  if (!subject || !lesson) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <p className="font-fredoka text-3xl text-gray-600">Lesson not found!</p>
          <Link to="/" className="text-navy underline mt-4 block font-nunito">Go Home</Link>
        </div>
      </div>
    );
  }

  const handleComplete = (points) => {
    const progress = markLessonComplete(lesson.id, points);
    setEarnedPoints(points);
    setCompleted(true);
  };

  const lessonIdx = gradeLessons.findIndex(l => l.id === lessonId);
  const nextLesson = gradeLessons[lessonIdx + 1];

  const ActivityComponent = {
    'drag-sort': DragSortActivity,
    'sequence': SequenceActivity,
    'highlight': HighlightActivity,
    'matching': MatchingActivity,
    'drag-label': DragLabelActivity,
    'click-identify': ClickIdentifyActivity,
    'journal': JournalActivity,
  }[lesson.type] || DragSortActivity;

  if (completed) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-5">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="flex justify-center gap-3">
            <KKCharacter type="star" size={80} />
            <KKCharacter type="flower" size={80} />
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="font-fredoka text-4xl text-navy mb-2">Lesson Complete! 🎉</h2>
            <p className="font-nunito text-gray-600 mb-4">{lesson.title} — {lesson.subtitle}</p>
            <div className="bg-kk-yellow/30 rounded-2xl p-4 mb-4">
              <p className="font-fredoka text-3xl text-kk-orange">+{earnedPoints} points! ⭐</p>
            </div>
            <div className="space-y-3">
              {nextLesson ? (
                <Link to={`/lesson/${subjectId}/${grade}/${nextLesson.id}`}>
                  <button
                    onClick={() => setCompleted(false)}
                    className="w-full py-3 rounded-2xl text-white font-fredoka text-xl hover:opacity-90 transition-all"
                    style={{ backgroundColor: subject.color }}
                  >
                    Next Lesson: {nextLesson.title} →
                  </button>
                </Link>
              ) : (
                <div className="bg-green-100 rounded-2xl p-3 text-green-700 font-fredoka">
                  🏆 You completed all lessons in Grade {grade}!
                </div>
              )}
              <Link to={`/subject/${subjectId}`}>
                <button className="w-full py-3 rounded-2xl border-2 border-navy text-navy font-fredoka text-lg hover:bg-navy hover:text-white transition-all">
                  Back to {subject.name} Lessons
                </button>
              </Link>
              <Link to="/">
                <button className="w-full py-2 text-gray-400 font-nunito text-sm hover:text-gray-600 transition-all">
                  Return Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream font-nunito">
      {/* Lesson Header */}
      <header className="sticky top-0 z-10 shadow-sm" style={{ backgroundColor: subject.color }}>
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to={`/subject/${subjectId}`} className="text-white/80 hover:text-white transition-colors">
            ← Back
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="font-fredoka text-white text-xl truncate">{lesson.title}</h1>
            <p className="text-white/70 text-xs truncate">{subject.name} • Grade {grade} • {lesson.subtitle}</p>
          </div>
          <span className="text-white font-fredoka text-sm flex-shrink-0">⭐ {lesson.points} pts</span>
        </div>
        {/* Progress indicator */}
        <div className="h-1 bg-white/20">
          <div className="h-full bg-white/70 w-0" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Lesson intro */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm" style={{ backgroundColor: subject.color + '22' }}>
            {lesson.icon}
          </div>
          <div>
            <h2 className="font-fredoka text-2xl text-gray-800">{lesson.title}</h2>
            <p className="font-nunito text-gray-500">{lesson.subtitle}</p>
          </div>
        </div>

        {/* Activity */}
        <ActivityComponent lesson={lesson} onComplete={handleComplete} />

        {/* KK character decoration */}
        <div className="flex justify-end mt-6 opacity-50">
          <KKCharacter type="blob" color={subject.color} size={40} />
        </div>
      </main>
    </div>
  );
}