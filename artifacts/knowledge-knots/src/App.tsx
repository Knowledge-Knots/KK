import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
// @ts-expect-error JSX file
import { queryClientInstance } from '@/lib/query-client';
// @ts-expect-error JSX file
import Home from '@/pages/Home';
// @ts-expect-error JSX file
import SubjectPage from '@/pages/SubjectPage';
// @ts-expect-error JSX file
import LessonPage from '@/pages/LessonPage';
// @ts-expect-error JSX file
import Dashboard from '@/pages/Dashboard';
import PageNotFound from '@/pages/PageNotFound';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <TooltipProvider>
        <Router basename={basename}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/subject/:subjectId" element={<SubjectPage />} />
            <Route path="/lesson/:subjectId/:grade/:lessonId" element={<LessonPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
