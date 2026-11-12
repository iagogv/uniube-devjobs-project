import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import JobCard from './components/JobCard';
import Footer from './components/Footer';
import { vagasMock } from './data/vagasMock';
import './App.css';

function filtrarVagas(termo) {
  const busca = termo.trim().toLowerCase();
  if (!busca) return vagasMock;

  return vagasMock.filter((vaga) => {
    const texto = [
      vaga.titulo,
      vaga.empresa_nome,
      vaga.cidade,
      vaga.estado,
      ...vaga.tecnologias.split(','),
    ]
      .join(' ')
      .toLowerCase();

    return texto.includes(busca);
  });
}

export default function App() {
  const [busca, setBusca] = useState('');
  const vagasFiltradas = filtrarVagas(busca);

  const contagem = !busca.trim()
    ? `${vagasFiltradas.length} vagas disponíveis`
    : `${vagasFiltradas.length} vaga(s) encontrada(s) para "${busca}"`;

  return (
    <>
      <Header />
      <main className="main">
        <SearchBar value={busca} onChange={setBusca} />

        { <section className="jobs-section container">
          <h2 className="sr-only">Lista de vagas</h2>
          <p className="result-count" aria-live="polite">
            {contagem}
          </p>
          <div className="jobs-grid">
            {vagasFiltradas.length === 0 ? (
              <p className="empty-msg">Nenhuma vaga encontrada.</p>
            ) : (
              vagasFiltradas.map((vaga) => (
                <JobCard key={vaga.id} vaga={vaga} />
              ))
            )}
          </div>
        </section>}
      </main>
      <Footer />
    </>
  );
}
