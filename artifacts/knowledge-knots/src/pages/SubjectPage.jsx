import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SUBJECTS, GRADES, LESSONS, getGradeDifficulty } from '@/lib/curriculum';
import { getProgress } from '@/lib/progress';
import LessonCard from '@/components/kk/LessonCard';
import ProgressBar from '@/components/kk/ProgressBar';

export default function SubjectPage() {
  const { subjectId } = useParams();
  const subject = SUBJECTS[subjectId];
  const [selectedGrade, setSelectedGrade] = useState('K');

  if (!subject) return <div className="p-8 font-fredoka text-center text-2xl">Subject not found</div>;

  const lessons = LESSONS[subjectId]?.[selectedGrade] || [];
  const progress = getProgress();

  const completedInGrade = lessons.filter(l => progress.lessons[l.id]?.status === 'completed').length;
  const pct = lessons.length > 0 ? Math.round((completedInGrade / lessons.length) * 100) : 0;
  const difficulty = getGradeDifficulty(selectedGrade);

  return (
    <div className="min-h-screen font-nunito" style={{ backgroundColor: '#F5EFE0' }}>
      {/* Subject Header */}
      <header className="relative overflow-hidden py-8 px-5" style={{ backgroundColor: subject.color }}>
        <div className="max-w-5xl mx-auto">
          <Link to="/" className="text-white/70 hover:text-white font-nunito text-sm mb-4 inline-block transition-colors">
            ← Back to Home
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-fredoka text-4xl md:text-5xl text-white">{subject.fullName}</h1>
              <p className="text-white/80 font-nunito text-base mt-1">{subject.description}</p>
              <div className="mt-3 flex items-center gap-3 flex-wrap">
                <div className="bg-white/20 rounded-xl px-3 py-1.5 inline-block">
                  <span className="font-fredoka text-white text-sm">{completedInGrade}/{lessons.length} completed • {pct}%</span>
                </div>
                <div className="rounded-xl px-3 py-1.5 inline-block font-fredoka text-sm text-white border-2 border-white/40" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
                  {difficulty.label}
                </div>
              </div>
            </div>
            {/* Static emoji instead of animated character */}
            <div className="hidden md:block text-7xl select-none opacity-90">
              {subject.emoji}
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-12 -translate-x-12" />
      </header>

      <div className="max-w-5xl mx-auto px-5 py-6">
        {/* Grade Selector */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
          <h2 className="font-fredoka text-xl text-gray-800 mb-3">Select Your Grade</h2>
          <div className="flex gap-2 flex-wrap">
            {GRADES.map(grade => {
              const gradeLessons = LESSONS[subjectId]?.[grade] || [];
              const gradeCompleted = gradeLessons.filter(l => progress.lessons[l.id]?.status === 'completed').length;
              const isSelected = selectedGrade === grade;
              const diff = getGradeDifficulty(grade);
              return (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  className={`flex flex-col items-center px-4 py-3 rounded-xl font-fredoka transition-all hover:scale-105 ${isSelected ? 'text-white shadow-md scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  style={isSelected ? { backgroundColor: subject.color } : {}}
                >
                  <span className="text-lg">{grade}</span>
                  <span className="text-xs opacity-70">{gradeCompleted}/{gradeLessons.length}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1">
              <ProgressBar pct={pct} color={subject.color} label={`Grade ${selectedGrade} Progress`} />
            </div>
            {/* Difficulty badge */}
            <span className="text-xs font-bold px-3 py-1 rounded-full text-white flex-shrink-0" style={{ backgroundColor: difficulty.color }}>
              {difficulty.label}
            </span>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
          <h2 className="font-fredoka text-2xl text-gray-800">
            Grade {selectedGrade} Lessons
            <span className="ml-2 text-base text-gray-400 font-nunito">({lessons.length} lessons)</span>
          </h2>
        </div>

        {lessons.length === 0 ? (
          <div className="text-center py-16 text-gray-400 font-nunito">
            <div className="text-5xl mb-4">📚</div>
            <p className="text-lg font-fredoka">No lessons yet for Grade {selectedGrade}</p>
            <p className="text-sm mt-1">Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {lessons.map(lesson => (
              <Link key={lesson.id} to={`/lesson/${subjectId}/${selectedGrade}/${lesson.id}`}>
                <LessonCard lesson={lesson} subjectColor={subject.color} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}