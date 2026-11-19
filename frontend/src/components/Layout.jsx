import { Outlet, NavLink } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <>
      <Header />
      <nav className="nav">
        <div className="container">
          <NavLink to="/" end>Vagas</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </div>
      </nav>
      <main className="main container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
