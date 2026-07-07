import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">404</h1>
      <p className="text-slate-400 mb-4">Page not found.</p>
      <a href="/" className="text-indigo-400 hover:text-indigo-300">Go back home</a>
    </div>
  );
};

export default NotFound;
