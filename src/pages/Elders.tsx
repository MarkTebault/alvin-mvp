import { useEffect, useState } from 'react';
import { fetchElders, addElder, updateElder, deleteElder } from '../services/elders';
import type { Elder } from '../types';

export default function Elders() {
  const [elders, setElders] = useState<Elder[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    timezone: 'America/New_York'
  });

  useEffect(() => {
    loadElders();
  }, []);

  const loadElders = async () => {
    setLoading(true);
    try {
      const data = await fetchElders();
      setElders(data);
    } catch (error) {
      console.error('Error loading elders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateElder(editing, formData);
      } else {
        await addElder(formData);
      }
      await loadElders();
      resetForm();
    } catch (error) {
      console.error('Error saving elder:', error);
    }
  };

  const handleEdit = (elder: Elder) => {
    setFormData({
      name: elder.name,
      phone: elder.phone,
      timezone: elder.timezone
    });
    setEditing(elder.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this elder?')) {
      try {
        await deleteElder(id);
        await loadElders();
      } catch (error) {
        console.error('Error deleting elder:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      timezone: 'America/New_York'
    });
    setEditing(null);
    setShowForm(false);
  };

  if (loading) return <p>Loading elders...</p>;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Elders</h2>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Elder'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ 
          background: '#1a1a1a', 
          padding: '20px', 
          borderRadius: '8px', 
          marginBottom: '20px' 
        }}>
          <h3>{editing ? 'Edit Elder' : 'New Elder'}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Phone *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                required
                placeholder="+1234567890"
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Timezone *</label>
              <select
                value={formData.timezone}
                onChange={e => setFormData({ ...formData, timezone: e.target.value })}
                required
                style={{ width: '100%', padding: '8px' }}
              >
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
                <option value="America/Anchorage">Alaska Time</option>
                <option value="Pacific/Honolulu">Hawaii Time</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
            <button type="submit">
              {editing ? 'Update Elder' : 'Create Elder'}
            </button>
            <button type="button" onClick={resetForm}>Cancel</button>
          </div>
        </form>
      )}

      <div style={{ background: '#1a1a1a', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#2a2a2a' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Phone</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Timezone</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {elders.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                  No elders yet. Click "Add Elder" to get started.
                </td>
              </tr>
            ) : (
              elders.map(elder => (
                <tr key={elder.id} style={{ borderTop: '1px solid #333' }}>
                  <td style={{ padding: '12px' }}>{elder.name}</td>
                  <td style={{ padding: '12px' }}>{elder.phone}</td>
                  <td style={{ padding: '12px' }}>{elder.timezone}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      background: elder.active ? '#1a4d1a' : '#4d1a1a',
                      fontSize: '12px'
                    }}>
                      {elder.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleEdit(elder)}
                      style={{ marginRight: '8px', padding: '6px 12px' }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(elder.id)}
                      style={{ padding: '6px 12px', background: '#4d1a1a' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}