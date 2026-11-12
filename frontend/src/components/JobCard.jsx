const badgeMap = {
  remoto: { className: 'job-card__badge--remote', label: 'Remoto' },
  presencial: { className: 'job-card__badge--onsite', label: 'Presencial' },
  hibrido: { className: 'job-card__badge--hybrid', label: 'Híbrido' },
};

export default function JobCard({ vaga }) {
  const badge = badgeMap[vaga.tipo] || { className: '', label: vaga.tipo };
  const techs = vaga.tecnologias.split(',').join(' · ');
  const local = vaga.estado ? `${vaga.cidade}, ${vaga.estado}` : vaga.cidade;

  return (
    <article className="job-card" data-id={vaga.id}>
      <div className="job-card__header">
        <span className={`job-card__badge ${badge.className}`}>{badge.label}</span>
        <h3 className="job-card__title">{vaga.titulo}</h3>
        <p className="job-card__company">{vaga.empresa_nome}</p>
      </div>
      <div className="job-card__body">
        <p className="job-card__tech">{techs}</p>
        <p className="job-card__salary">{vaga.salario}</p>
        <p className="job-card__location">📍 {local}</p>
      </div>
      <div className="job-card__footer">
        <button type="button" className="btn btn--primary">
          Ver detalhes
        </button>
      </div>
    </article>
  );
}
