import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { vagasMock } from '../data/vagasMock';

export default function Dashboard() {
  const { isLoggedIn, empresa, logout } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1>Olá, {empresa?.nome}</h1>
        <button type="button" onClick={logout} className="btn">
          Sair
        </button>
      </div>
      <table className="dashboard__table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Tipo</th>
            <th>Salário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vagasMock.map((v) => (
            <tr key={v.id}>
              <td>{v.titulo}</td>
              <td>{v.tipo}</td>
              <td>{v.salario}</td>
              <td>
                <button className="btn btn--danger">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
