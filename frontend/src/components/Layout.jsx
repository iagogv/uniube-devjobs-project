import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <>
      <Header />
      <nav className="nav">
        <div className="container">
          <NavLink to="/" end>
            Vagas
          </NavLink>
          {isLoggedIn ? (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <button type="button" className="nav__logout" onClick={handleLogout}>
                Sair
              </button>
            </>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </div>
      </nav>
      <main className="main container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
