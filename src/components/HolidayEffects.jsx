import React from 'react';

const HolidayEffects = ({ mode, text }) => {
  if (!mode || mode === 'none') return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 }}>
      <style>
        {`
          .snowflake {
            position: absolute;
            top: -20px;
            color: white;
            text-shadow: 0 0 5px rgba(0,0,0,0.2);
            font-size: 1.5rem;
            user-select: none;
            animation: fall linear infinite;
          }
          @keyframes fall {
            0% { transform: translateY(-20px) rotate(0deg); }
            100% { transform: translateY(105vh) rotate(360deg); }
          }
          .year-badge {
            position: fixed;
            top: 80px;
            right: 20px;
            background: #ef4444;
            color: white;
            padding: 10px 20px;
            border-radius: 50px;
            font-weight: 900;
            font-size: 1.5rem;
            box-shadow: 0 10px 20px rgba(239, 68, 68, 0.4);
            animation: pulse 2s infinite;
            pointer-events: auto;
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          .ramadan-overlay, .eid-overlay {
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 9999;
          }
          .premium-badge {
            position: fixed;
            top: 100px;
            right: 30px;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            padding: 12px 24px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            gap: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.4);
            animation: badgeSlideIn 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67);
            border: 1px solid rgba(255,255,255,0.2);
            pointer-events: auto;
          }
          .ramadan-green {
            background: rgba(6, 95, 70, 0.85);
            border: 1px solid rgba(16, 185, 129, 0.3);
          }
          .ramadan-green .badge-text { color: #fcd34d; }
          .eid-gold {
            background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,215,0,0.1));
            border: 1px solid rgba(255,215,0,0.3);
          }
          .badge-icon { font-size: 24px; }
          .badge-text { 
            font-weight: 800; 
            font-size: 1.1rem; 
            color: #1d1d1f;
            letter-spacing: -0.3px;
          }
          @keyframes badgeSlideIn {
            from { transform: translateX(100%) scale(0.8); opacity: 0; }
            to { transform: translateX(0) scale(1); opacity: 1; }
          }
        `}
      </style>

      {/* New Year Snow Effect */}
      {mode === 'newyear' && (
        <div className="snow-container">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i} 
              className="snowflake" 
              style={{ 
                left: `${Math.random() * 100}%`, 
                animationDuration: `${Math.random() * 5 + 3}s`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() + 0.3,
                fontSize: `${Math.random() * 1 + 0.5}rem`
              }}
            >
              ❄
            </div>
          ))}
          <div className="year-badge">🎄 {text || '2027'}</div>
        </div>
      )}

      {/* Ramadan Effect */}
      {mode === 'ramadan' && (
        <div className="ramadan-overlay">
          <div className="premium-badge ramadan-green">
            <span className="badge-icon">🌙</span>
            <span className="badge-text">Ramazon Muborak {text}</span>
          </div>
        </div>
      )}

      {/* Eid Effect */}
      {mode === 'eid' && (
        <div className="eid-overlay">
          <div className="premium-badge eid-gold">
            <span className="badge-icon">✨</span>
            <span className="badge-text">Hayit Muborak! {text}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HolidayEffects;
