import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';
import { vagasMock } from '../data/vagasMock';

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

export default function Home() {
  const [busca, setBusca] = useState('');
  const vagasFiltradas = filtrarVagas(busca);

  const contagem = !busca.trim()
    ? `${vagasFiltradas.length} vagas disponíveis`
    : `${vagasFiltradas.length} vaga(s) encontrada(s) para "${busca}"`;

  return (
    <>
      <SearchBar value={busca} onChange={setBusca} />
      <section className="jobs-section">
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
      </section>
    </>
  );
}
