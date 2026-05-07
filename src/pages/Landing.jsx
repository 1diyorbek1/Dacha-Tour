import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Search, UserCircle, MapPin, Star, ShieldCheck } from 'lucide-react';
import VerifiedBadge from '../components/VerifiedBadge';

function Landing({ settings }) {
  const navigate = useNavigate();
  const siteLogo = settings?.logoUrl || '/logo.jpg';
  const siteName = settings?.siteName || 'Dacha Tour';

  return (
    <div className="landing-page" style={{ padding: '40px 0' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&q=80&w=2000")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '20px',
        padding: '60px 20px',
        color: 'white',
        textAlign: 'center',
        marginBottom: '60px',
        boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden'
      }}>
        <img src={siteLogo} alt={`${siteName} Logo`} style={{ 
          height: '120px', 
          marginBottom: '20px', 
          borderRadius: '50%', 
          border: '4px solid white',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }} />
        <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', fontWeight: '900', marginBottom: '20px', textShadow: '0 4px 10px rgba(0,0,0,0.3)', lineHeight: '1.2', wordBreak: 'break-word' }}>
          {siteName} <VerifiedBadge size={32} style={{ verticalAlign: 'middle', marginTop: '-5px' }} />
        </h1>
        <p style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.3rem)', maxWidth: '700px', margin: '0 auto 40px', opacity: 0.95 }}>
          O'zbekistondagi eng chiroyli va qulay dachalarni biz bilan toping. 100% xavfsiz va ishonchli band qilish tizimi.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/browse')} className="btn-primary" style={{ width: 'auto', padding: '20px 40px' }}>
            <Search size={22} /> Hozir topish
          </button>
          <button onClick={() => navigate('/add')} style={{
            background: 'white',
            color: 'var(--primary)',
            border: 'none',
            padding: '20px 40px',
            borderRadius: '20px',
            fontWeight: '700',
            fontSize: '1.1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <PlusCircle size={22} /> Dacha qo'shish
          </button>
          <button onClick={() => navigate('/cabinet')} style={{
            background: '#e63946',
            color: 'white',
            border: 'none',
            padding: '20px 40px',
            borderRadius: '20px',
            fontWeight: '700',
            fontSize: '1.1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 10px 20px rgba(230, 57, 70, 0.3)'
          }}>
            <UserCircle size={22} /> Shaxsiy kabinet
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '60px' }}>
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <ShieldCheck size={48} color="var(--primary)" style={{ marginBottom: '20px' }} />
          <h3>100% Xavfsiz</h3>
          <p style={{ color: 'var(--text-muted)' }}>Ma'lumotlaringiz himoyalangan va faqat sizga tegishli.</p>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <MapPin size={48} color="var(--primary)" style={{ marginBottom: '20px' }} />
          <h3>Eng yaxshi joylar</h3>
          <p style={{ color: 'var(--text-muted)' }}>Toshkent viloyatining barcha so'lim go'shalarida dachalar.</p>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <Star size={48} color="var(--primary)" style={{ marginBottom: '20px' }} />
          <h3>Premium sifat</h3>
          <p style={{ color: 'var(--text-muted)' }}>Faqat eng yuqori reytingli dachalar bizning platformada.</p>
        </div>
      </section>

      {/* Developer Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '30px 20px',
        borderTop: '1px solid rgba(0,0,0,0.08)',
        marginTop: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '25px' }}>
          <img src={siteLogo} alt="Logo" style={{ height: '50px', borderRadius: '50%', border: '2px solid #e2e8f0' }} />
          <span style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--primary)', letterSpacing: '1px' }}>{siteName.toUpperCase()}</span>
        </div>
        <a 
          href="https://t.me/Martonov_D" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '14px 30px',
            borderRadius: '50px',
            background: 'linear-gradient(135deg, #0088cc, #005f99)',
            color: 'white',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '1rem',
            boxShadow: '0 8px 25px rgba(0, 136, 204, 0.3)',
            transition: 'all 0.3s ease',
            letterSpacing: '0.3px'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.boxShadow = '0 12px 35px rgba(0, 136, 204, 0.45)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 8px 25px rgba(0, 136, 204, 0.3)';
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          Professional Developer — @Martonov_D
        </a>
        <p style={{ marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} Dacha Tour. Barcha huquqlar himoyalangan.
        </p>
      </footer>
    </div>
  );
}

export default Landing;
