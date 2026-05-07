import React, { useState, useEffect } from 'react';
import { User, Phone, Edit2, Save, Trash2, ArrowLeft, Camera, Video, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';
import Calendar from '../components/Calendar';
import AmenitiesForm from '../components/AmenitiesForm';

function Cabinet() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [myDachas, setMyDachas] = useState([]);
  const [editingDacha, setEditingDacha] = useState(null);
  const [storyModal, setStoryModal] = useState(null); // { dachaId, url }
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchMyDachas();
  }, []);

  const fetchMyDachas = async () => {
    try {
      const res = await api.get('/api/dachalar');
      // Filter by current user phone
      const filtered = res.data.filter(d => d.phone === user?.phone);
      setMyDachas(filtered);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleUpdateAvatar = () => {
    document.getElementById('avatarInput').click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Rasm hajmi 5MB dan oshmasligi kerak!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = async () => {
        // Simple compression using Canvas
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);

        try {
          const res = await api.put('/api/dachalar/user/profile', {
            phone: user.phone,
            data: { avatarUrl: compressedBase64 }
          });
          const updatedUser = { ...user, avatarUrl: res.data.avatarUrl };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setUser(updatedUser);
          toast.success('Profil rasmi yangilandi!');
        } catch (e) {
          toast.error('Xatolik yuz berdi');
        }
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 60 * 1024 * 1024) {
      toast.error("Fayl hajmi 60MB dan oshmasligi kerak!");
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setStoryModal(prev => ({ ...prev, url: reader.result }));
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateStory = async () => {
    if (!storyModal.url) {
      toast.error("Iltimos, avval fayl tanlang!");
      return;
    }
    try {
      await api.put(`/api/dachalar/${storyModal.dachaId}/story`, {
        storyUrl: storyModal.url
      });
      toast.success('Story saqlandi!');
      setStoryModal(null);
      fetchMyDachas();
    } catch (e) {
      toast.error('Xatolik yuz berdi');
    }
  };

  const handleUpdate = async () => {
    const today = new Date().getDate();
    const calendarEntries = Object.entries(editingDacha.calendar);
    const futureDays = calendarEntries.filter(([day]) => parseInt(day) >= today);
    const missingPrices = futureDays.filter(([_, info]) => !info.price || info.price.toString().trim() === '');

    if (missingPrices.length > 0) {
      toast.error(`Iltimos, bugungi va kelajakdagi barcha kunlar uchun narxlarni kiriting!`);
      return;
    }

    try {
      await api.put(`/api/dachalar/${editingDacha.id}`, editingDacha);
      toast.success('O\'zgarishlar saqlandi!');
      setEditingDacha(null);
      fetchMyDachas();
    } catch (e) {
      toast.error('Xatolik yuz berdi');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Haqiqatdan ham ushbu e'lonni o'chirmoqchimisiz?")) {
      try {
        await api.delete(`/api/dachalar/${id}`);
        toast.success('Dacha o\'chirildi!');
        fetchMyDachas();
      } catch (e) {
        toast.error('O\'chirishda xatolik');
      }
    }
  };

  if (!user) {
    return (
      <div className="cabinet-page" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2 style={{ color: 'var(--primary)' }}>Siz tizimga kirmagansiz</h2>
        <p>Iltimos, avval ro'yxatdan o'ting yoki login qiling.</p>
        <button onClick={() => navigate('/add')} className="btn-primary" style={{ width: 'auto', marginTop: '20px' }}>Asosiyga qaytish</button>
      </div>
    );
  }

  if (editingDacha) {
    return (
      <div className="cabinet-edit">
        <button onClick={() => setEditingDacha(null)} className="nav-link" style={{ marginBottom: '20px', border: 'none', cursor: 'pointer', background: 'none' }}>
          <ArrowLeft size={18} /> Orqaga qaytish
        </button>
        <div className="card">
          <h2>{(editingDacha.dachaName)} tahrirlash</h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>Kunlarni band qilish uchun ustiga bosing</p>
          
          <Calendar 
            data={editingDacha.calendar} 
            setData={(newData) => setEditingDacha(prev => ({ ...prev, calendar: typeof newData === 'function' ? newData(prev.calendar) : newData }))} 
            isEditable={true}
          />

          <h3 style={{ marginTop: '30px', marginBottom: '15px' }}>Qulayliklar</h3>
          <AmenitiesForm 
            selectedAmenities={editingDacha.amenities || {}} 
            setSelectedAmenities={(newData) => setEditingDacha(prev => ({ ...prev, amenities: typeof newData === 'function' ? newData(prev.amenities || {}) : newData }))}
          />

          <button className="btn-primary" onClick={handleUpdate} style={{ marginTop: '30px' }}>
            <Save size={20} /> O'zgarishlarni saqlash
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cabinet-page">
      {/* Instagram Style Profile Header */}
      <div className="card profile-header" style={{ display: 'flex', alignItems: 'center', gap: '30px', padding: '40px' }}>
        <input 
          type="file" 
          id="avatarInput" 
          hidden 
          accept="image/*" 
          onChange={handleAvatarChange} 
        />
        <div className="avatar-wrapper" style={{ position: 'relative' }}>
          <div style={{ 
            width: '120px', 
            height: '120px', 
            borderRadius: '50%', 
            padding: '4px',
            background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ 
              width: '100%', 
              height: '100%', 
              borderRadius: '50%', 
              border: '4px solid white', 
              overflow: 'hidden',
              background: '#f1f5f9'
            }}>
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <User size={60} color="#cbd5e1" style={{ margin: '20px auto', display: 'block' }} />
              )}
            </div>
          </div>
          <button 
            onClick={handleUpdateAvatar}
            style={{ 
              position: 'absolute', bottom: '0', right: '0', 
              background: 'var(--primary)', color: 'white', border: '2px solid white',
              width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <Camera size={18} />
          </button>
        </div>
        
        <div className="user-info">
          <h1 style={{ marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {user.name} {user.surname}
            <svg viewBox="0 0 24 24" width="22" height="22" fill="#0095f6" style={{ flexShrink: 0 }}>
              <path d="M22.12 11.23L20 9.24V6.33A1.33 1.33 0 0 0 18.67 5h-2.91l-1.99-2.12a1.33 1.33 0 0 0-1.95 0L9.83 5H6.92A1.33 1.33 0 0 0 5.59 6.33v2.91l-2.12 1.99a1.33 1.33 0 0 0 0 1.95l2.12 1.99v2.91a1.33 1.33 0 0 0 1.33 1.33h2.91l1.99 2.12a1.33 1.33 0 0 0 1.95 0l1.99-2.12h2.91a1.33 1.33 0 0 0 1.33-1.33v-2.91l2.12-1.99a1.33 1.33 0 0 0 0-1.95zM10.59 15.21L7.29 11.9l1.1-1.1l2.2 2.2l4.8-4.8l1.1 1.1l-5.9 5.91z" />
            </svg>
          </h1>
          <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Phone size={18} /> {user.phone}
          </div>
          <div style={{ marginTop: '15px', display: 'flex', gap: '20px' }}>
            <div><strong>{myDachas.length}</strong> dachalar</div>
          </div>
        </div>
      </div>

      <h2 style={{ marginBottom: '20px', marginTop: '40px' }}>Mening Dachalarim</h2>

      {myDachas.length === 0 ? (
        <div className="empty-state card" style={{ textAlign: 'center', padding: '60px' }}>
          <p>Sizda hali e'lonlar yo'q.</p>
          <button onClick={() => navigate('/add')} className="btn-primary" style={{ width: 'auto', padding: '15px 30px', margin: '20px auto' }}>
            Dacha qo'shish
          </button>
        </div>
      ) : (
        <div className="dacha-list">
          {myDachas.map(dacha => {
            let photosArray = [];
            try {
              photosArray = typeof dacha.photos === 'string' ? JSON.parse(dacha.photos) : dacha.photos;
            } catch (e) {
              photosArray = [];
            }
            
            return (
              <div key={dacha.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ width: '100px', height: '100px', borderRadius: '20px', overflow: 'hidden', flexShrink: 0, boxShadow: 'var(--shadow-sm)' }}>
                    {photosArray[0] ? (
                      <img src={photosArray[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Camera color="#cbd5e1" /></div>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '800', fontSize: '1.3rem', marginBottom: '5px' }}>{dacha.dachaName}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: dacha.storyUrl ? 'var(--success)' : '#94a3b8', fontSize: '0.9rem', fontWeight: '700' }}>
                      <Video size={16} /> {dacha.storyUrl ? 'Story yuklangan' : 'Story yo\'q'}
                    </div>
                  </div>
                </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button 
                  onClick={() => setEditingDacha(dacha)}
                  className="nav-link"
                  style={{ padding: '12px', background: '#f8fafc', color: 'var(--primary)', border: '1px solid #e2e8f0', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '700', cursor: 'pointer' }}
                >
                  <Edit2 size={16} /> Tahrirlash
                </button>
                <button 
                  onClick={() => setStoryModal({ dachaId: dacha.id, url: dacha.storyUrl || '' })}
                  className="nav-link"
                  style={{ padding: '12px', background: dacha.storyUrl ? '#f0fdf4' : '#fff', color: dacha.storyUrl ? 'var(--success)' : '#64748b', border: '1px solid #e2e8f0', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '700', cursor: 'pointer' }}
                >
                  <Video size={16} /> {dacha.storyUrl ? 'Storyni yangilash' : 'Story qo\'shish'}
                </button>
                <button 
                  onClick={() => handleDelete(dacha.id)}
                  style={{ gridColumn: 'span 2', padding: '12px', background: '#fff1f2', color: '#e11d48', border: 'none', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '700', cursor: 'pointer' }}
                >
                  <Trash2 size={16} /> E'lonni o'chirish
                </button>
              </div>
            </div>
          ); })}
        </div>
      )}

      {/* Story Modal */}
      {storyModal && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="card" style={{ maxWidth: '400px', width: '100%', marginBottom: 0, textAlign: 'center' }}>
            <div style={{ background: 'var(--primary)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'white' }}>
              <Video size={30} />
            </div>
            <h3>Story yuklash</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '25px' }}>Telefoningiz galereyasidan video yoki rasm tanlang.</p>
            
            <div className="upload-zone" style={{ 
              border: '2px dashed #e2e8f0', borderRadius: '20px', padding: '30px', marginBottom: '20px',
              background: storyModal.url ? '#f0fdf4' : '#f8fafc',
              position: 'relative'
            }}>
              {isUploading ? (
                <div style={{ color: 'var(--primary)', fontWeight: '700' }}>Yuklanmoqda...</div>
              ) : storyModal.url ? (
                <div style={{ color: 'var(--success)', fontWeight: '700' }}>
                  {storyModal.url.startsWith('data:video') ? 'Video tanlandi ✅' : 'Rasm tanlandi ✅'}
                  <div style={{ fontSize: '0.7rem', marginTop: '5px', opacity: 0.7 }}>O'zgartirish uchun qayta bosing</div>
                </div>
              ) : (
                <div style={{ color: '#94a3b8' }}>Faylni tanlash uchun bosing</div>
              )}
              <input 
                type="file" 
                accept="video/*,image/*"
                onChange={handleFileSelect}
                style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn-primary" style={{ flex: 2 }} onClick={handleUpdateStory} disabled={isUploading}>
                {isUploading ? 'Kuting...' : 'Saqlash'}
              </button>
              <button className="btn-primary" style={{ flex: 1, background: '#f1f5f9', color: '#64748b' }} onClick={() => setStoryModal(null)}>Bekor qilish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cabinet;

