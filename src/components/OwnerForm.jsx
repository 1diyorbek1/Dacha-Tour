import React, { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import toast from 'react-hot-toast';

function OwnerForm({ data, setData }) {
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Brauzeringiz lokatsiyani aniqlashni qo'llab-quvvatlamaydi.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setData(prev => ({ ...prev, latitude, longitude }));
        setLoading(false);
        toast.success("Lokatsiya muvaffaqiyatli aniqlandi!");
      },
      (error) => {
        setLoading(false);
        console.error("Geolocation error:", error);
        toast.error("Lokatsiyani aniqlab bo'lmadi. Iltimos, ruxsat berilganini tekshiring.");
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <div className="owner-form">
      <div className="form-group">
        <input 
          type="text" 
          name="dachaName" 
          placeholder="Dacha nomi (masalan: G'azalkent oromi)" 
          value={data.dachaName || ''} 
          onChange={handleChange}
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div className="form-group">
          <input 
            type="text" 
            name="ownerName" 
            placeholder="Ismingiz" 
            value={data.ownerName || ''} 
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input 
            type="text" 
            name="ownerSurname" 
            placeholder="Familiyangiz" 
            value={data.ownerSurname || ''} 
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-group">
        <input 
          type="tel" 
          name="phone" 
          placeholder="Telefon raqamingiz (+998 ...)" 
          value={data.phone || ''} 
          onChange={handleChange}
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div className="form-group">
          <input 
            type="number" 
            name="capacity" 
            placeholder="Necha kishi sig'adi?" 
            min="1"
            onKeyDown={(e) => ["e", "E", "-", "+"].includes(e.key) && e.preventDefault()}
            value={data.capacity || ''} 
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <select 
            name="guestType" 
            value={data.guestType || ''} 
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '16px 20px',
              border: '2px solid #e9ecef',
              borderRadius: '18px',
              fontSize: '1rem',
              background: '#f8fafc',
              cursor: 'pointer'
            }}
          >
            <option value="">Kimlar uchun?</option>
            <option value="family">Faqat oila uchun</option>
            <option value="friends">Ulfatlar uchun</option>
            <option value="both">Oila va ulfatlar uchun</option>
          </select>
        </div>
      </div>

      <div className="form-group" style={{ marginTop: '5px' }}>
        <button 
          type="button" 
          onClick={handleGetLocation}
          disabled={loading}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '18px',
            border: '2px dashed var(--primary)',
            background: data.latitude ? '#f0fdf4' : '#f8fafc',
            color: 'var(--primary)',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          {loading ? (
            <>Qidirilmoqda...</>
          ) : data.latitude ? (
            <>
              <Navigation size={20} fill="var(--primary)" />
              Lokatsiya aniqlandi ({data.latitude.toFixed(4)}, {data.longitude.toFixed(4)})
            </>
          ) : (
            <>
              <MapPin size={20} />
              Dacha lokatsiyasini aniqlash (Hozirgi turgan joyingiz)
            </>
          )}
        </button>
        <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '8px', textAlign: 'center' }}>
          * Tugmani dacha hududida turganingizda bosing
        </p>
      </div>
    </div>
  );
}

export default OwnerForm;
