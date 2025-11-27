import { Outlet, Link } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <header style={{ 
        padding: '20px', 
        background: '#1a1a1a', 
        marginBottom: '30px',
        borderBottom: '2px solid #333'
      }}>
        <h1 style={{ margin: '0 0 15px 0' }}>Elder Reminder</h1>
        <nav style={{ display: 'flex', gap: '20px' }}>
          <Link to='/users' style={{ textDecoration: 'none' }}>Users</Link>
          <Link to='/elders' style={{ textDecoration: 'none' }}>Elders</Link>
          <Link to='/tasks' style={{ textDecoration: 'none' }}>Tasks</Link>
          <Link to='/dashboard' style={{ textDecoration: 'none' }}>Dashboard</Link>
        </nav>
      </header>
      <main style={{ padding: '0 20px' }}>
        <Outlet />
      </main>
    </div>
  );
}