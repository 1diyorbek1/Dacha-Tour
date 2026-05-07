import React, { useEffect } from 'react';
import { formatPriceUz } from '../utils/priceFormatter';

const monthsUz = [
  "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
  "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"
];

const dayLabels = ["DU", "SE", "CH", "PA", "JU", "SH", "YA"];

function Calendar({ data, setData, isEditable = true }) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const startingDay = firstDay === 0 ? 6 : firstDay - 1;

  useEffect(() => {
    if (Object.keys(data).length === 0) {
      const initial = {};
      for (let i = 1; i <= daysInMonth; i++) {
        initial[i] = { status: 'free', price: '' };
      }
      setData(initial);
    }
  }, []);

  const toggleStatus = (day) => {
    if (!isEditable) return;
    setData(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        status: prev[day].status === 'free' ? 'occupied' : 'free'
      }
    }));
  };

  const handlePriceChange = (day, value) => {
    if (!isEditable) return;
    setData(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        price: value
      }
    }));
  };

  return (
    <div className="calendar-container">
      <h3 style={{ marginBottom: '20px', color: '#1b4332' }}>
        {monthsUz[currentMonth]} {currentYear}
      </h3>
      
      <div className="calendar-grid">
        {dayLabels.map(label => (
          <div key={label} className="day-header">{label}</div>
        ))}
        
        {Array(startingDay).fill(null).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
          const info = data[day] || { status: 'free', price: '' };
          const isOccupied = info.status === 'occupied';
          
          const dateObj = new Date(currentYear, currentMonth, day);
          const isPast = new Date(currentYear, currentMonth, day, 23, 59, 59) < now;
          const isToday = day === now.getDate() && currentMonth === now.getMonth() && currentYear === now.getFullYear();

          const dayOfWeekIndex = dateObj.getDay();
          const isWeekend = dayOfWeekIndex === 0 || dayOfWeekIndex === 6;
          const dayName = ["Yak", "Du", "Se", "Chor", "Pay", "Juma", "Shan"][dayOfWeekIndex];
          
          return (
            <div 
              key={day} 
              className={`day-box ${isOccupied ? 'occupied' : 'free'} ${isPast ? 'past' : ''}`}
              onClick={() => !isPast && toggleStatus(day)}
              style={{
                borderColor: isPast ? '#fbbf24' : (isOccupied ? '#e63946' : '#52b788'),
                backgroundColor: isPast ? '#fef3c7' : (isOccupied ? '#fff0f0' : '#f0fff4'),
                cursor: isPast ? 'not-allowed' : 'pointer',
                opacity: isPast ? 0.8 : 1
              }}
            >
              <div className="day-number" style={{ color: isWeekend ? '#e63946' : 'var(--text-main)' }}>
                {day} <span style={{ fontSize: '0.75rem', fontWeight: '600', opacity: 0.8, marginLeft: '4px' }}>{dayName}</span>
              </div>
              
              <div className="status-badge" style={{
                backgroundColor: isPast ? '#fbbf24' : (isOccupied ? '#e63946' : '#52b788'),
                color: isPast ? '#92400e' : 'white'
              }}>
                {isPast ? 'O\'tib ketdi' : (isOccupied ? 'Band' : 'Bo\'sh')}
              </div>
              
              {isEditable && !isPast ? (
                <input 
                  type="number" 
                  className="price-field"
                  placeholder="Narx"
                  value={info.price || ''}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => handlePriceChange(day, e.target.value)}
                />
              ) : (
                <div style={{ fontSize: '0.8rem', marginTop: 'auto', fontWeight: 'bold', color: isPast ? '#92400e' : 'inherit' }}>
                  {info.price ? formatPriceUz(info.price) : '-'}
                </div>
              )}
              
              {isEditable && !isPast && info.price && (
                <div style={{ fontSize: '0.7rem', color: '#666' }}>
                   {formatPriceUz(info.price)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
