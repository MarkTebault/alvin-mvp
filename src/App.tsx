import { Outlet, Link } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <header>
        <h1>Elder Reminder Web</h1>
        <nav>
          <Link to='/dashboard'>Dashboard</Link> | <Link to='/elders'>Elders</Link> | <Link to='/tasks'>Tasks</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}