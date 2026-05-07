import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Shield, Lock, User } from 'lucide-react';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'martonov' && password === 'MuhammadiyoR7') {
      localStorage.setItem('isAdmin', 'true');
      toast.success('Xush kelibsiz, Super Admin!');
      navigate('/admin-panel');
    } else {
      toast.error('Login yoki parol xato!');
    }
  };

  return (
    <div className="login-container" style={{ 
      maxWidth: '400px', 
      margin: '100px auto', 
      padding: '40px',
      background: 'white',
      borderRadius: '30px',
      boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
      border: '2px solid var(--primary)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <Shield size={60} color="var(--primary)" style={{ marginBottom: '15px' }} />
        <h2 style={{ color: 'var(--primary)', fontWeight: '800' }}>Super Admin Panel</h2>
        <p style={{ color: 'var(--text-muted)' }}>Boshqaruv tizimiga kiring</p>
      </div>

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: '600' }}>
            <User size={18} /> Login
          </label>
          <input 
            type="text" 
            required 
            placeholder="Admin login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: '600' }}>
            <Lock size={18} /> Parol
          </label>
          <input 
            type="password" 
            required 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn-primary" type="submit" style={{ width: '100%', marginTop: '10px' }}>
          Kirish
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
