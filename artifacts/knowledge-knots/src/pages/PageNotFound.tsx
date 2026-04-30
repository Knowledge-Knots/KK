import { useLocation, Link } from 'react-router-dom';

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname.substring(1);

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#F5EFE0' }}>
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="font-fredoka text-7xl text-navy">404</h1>
          <div className="h-0.5 w-16 bg-slate-200 mx-auto"></div>
        </div>
        <div className="space-y-3">
          <h2 className="font-fredoka text-2xl text-slate-800">Page Not Found</h2>
          <p className="font-nunito text-slate-600 leading-relaxed">
            The page <span className="font-bold text-slate-700">"{pageName}"</span> could not be found.
          </p>
        </div>
        <div className="pt-6">
          <Link
            to="/"
            className="inline-flex items-center px-5 py-2.5 font-fredoka text-white rounded-xl transition-all hover:scale-105 active:scale-95 shadow-sm"
            style={{ backgroundColor: '#F5A623' }}
          >
            ← Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
