import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');

    // Por enquanto, mock — na proxima aula conectaremos à API
    if (email === 'contato@technova.com' && senha === '123456') {
      login({ id: 1, nome: 'TechNova Ltda', email }, 'token-mock');
      navigate('/dashboard');
      return;
    }
    setErro('Email ou senha inválidos');
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Login da Empresa</h1>
        {erro && <p className="form-error" role="alert">{erro}</p>}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit" className="btn btn--primary">
          Entrar
        </button>
      </form>
    </div>
  );
}
