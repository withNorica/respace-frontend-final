import React from 'react';

const Header: React.FC = () => (
  <header className="text-center">
    <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-800 dark:text-zinc-100">AI Interior Designer</h1>
    <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
      Upload a photo of your room, choose a style, and let AI generate a new design concept for you.
    </p>
  </header>
);

export default Header;