import { useEffect, useState } from 'react';

const THEME_KEY = 'devjobs-theme';

function getInitialTheme() {
  const salvo = localStorage.getItem(THEME_KEY);
  if (salvo === 'dark' || salvo === 'light') return salvo;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export default function Header() {
  const [tema, setTema] = useState(getInitialTheme);

  useEffect(() => {
    document.body.classList.toggle('dark', tema === 'dark');
    localStorage.setItem(THEME_KEY, tema);
  }, [tema]);

  function alternarTema() {
    setTema((atual) => (atual === 'dark' ? 'light' : 'dark'));
  }

  return (
    <header className="header">
      <div className="container header__container">
        <div className="header__brand">
          <h1 className="logo">
            Dev<span>Jobs</span>
          </h1>
          <p className="tagline">Encontre sua próxima vaga em tecnologia</p>
        </div>
        <button
          type="button"
          className="theme-toggle"
          aria-label={tema === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
          onClick={alternarTema}
        >
          {tema === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
