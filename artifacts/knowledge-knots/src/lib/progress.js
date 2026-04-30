const STORAGE_KEY = 'knowledge_knots_progress';

export function getProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultProgress();
    return JSON.parse(raw);
  } catch {
    return createDefaultProgress();
  }
}

function createDefaultProgress() {
  return {
    lessons: {},
    totalPoints: 0,
    streakDays: 0,
    lastActiveDate: null,
    stars: 0,
  };
}

export function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function markLessonComplete(lessonId, points) {
  const progress = getProgress();
  const today = new Date().toDateString();

  if (!progress.lessons[lessonId] || progress.lessons[lessonId].status !== 'completed') {
    progress.lessons[lessonId] = { status: 'completed', completedAt: Date.now() };
    progress.totalPoints += points;
    progress.stars += 1;
  }

  // Streak tracking
  if (progress.lastActiveDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (progress.lastActiveDate === yesterday.toDateString()) {
      progress.streakDays += 1;
    } else {
      progress.streakDays = 1;
    }
    progress.lastActiveDate = today;
  }

  saveProgress(progress);
  return progress;
}

export function markLessonInProgress(lessonId) {
  const progress = getProgress();
  if (!progress.lessons[lessonId]) {
    progress.lessons[lessonId] = { status: 'in_progress', startedAt: Date.now() };
    saveProgress(progress);
  }
}

export function getLessonStatus(lessonId) {
  const progress = getProgress();
  return progress.lessons[lessonId]?.status || 'not_started';
}

export function getSubjectProgress(subjectId, lessons) {
  const progress = getProgress();
  const allLessons = Object.values(lessons).flat();
  const subjectLessons = allLessons.filter(l => l.id.startsWith(subjectId));
  const completed = subjectLessons.filter(l => progress.lessons[l.id]?.status === 'completed').length;
  return { completed, total: subjectLessons.length, pct: Math.round((completed / subjectLessons.length) * 100) };
}