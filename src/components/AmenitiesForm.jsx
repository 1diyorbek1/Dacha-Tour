import React from 'react';
import { 
  Waves, 
  Snowflake, 
  Activity, 
  Target, 
  Flame, 
  Film, 
  CircleDashed, 
  Tent, 
  Monitor, 
  Gamepad2,
  Check,
  Wifi,
  Wind,
  Tv
} from 'lucide-react';

export const AMENITIES_LIST = [
  { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
  { id: 'ac', label: 'Konditsioner', icon: Wind },
  { id: 'tv', label: 'Televizor', icon: Tv },
  { id: 'pool_summer', label: 'Basseyn (Yozgi)', icon: Waves },
  { id: 'pool_winter', label: 'Basseyn (Qishgi)', icon: Snowflake },
  { id: 'tennis', label: 'Stol tennisi', icon: Activity },
  { id: 'billiards', label: 'Bilyard', icon: Target },
  { id: 'sauna', label: 'Sauna', icon: Flame },
  { id: 'cinema', label: 'Kinoteatr', icon: Film },
  { id: 'bowling', label: 'Bovling', icon: CircleDashed },
  { id: 'tapchan', label: 'Tapchan', icon: Tent },
  { id: 'computer', label: 'Kompyuter', icon: Monitor },
  { id: 'playstation', label: 'PlayStation', icon: Gamepad2 }
];

function AmenitiesForm({ selectedAmenities, setSelectedAmenities }) {
  const toggleAmenity = (id) => {
    setSelectedAmenities(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="amenities-grid">
      {AMENITIES_LIST.map(({ id, label, icon: Icon }) => {
        const isSelected = selectedAmenities[id];
        return (
          <div 
            key={id}
            onClick={() => toggleAmenity(id)}
            className={`amenity-toggle ${isSelected ? 'selected' : ''}`}
            data-id={id}
          >
            <div className="amenity-icon">
              <Icon size={24} />
            </div>
            <span className="amenity-label">{label}</span>
            {isSelected && (
              <div className="amenity-check">
                <Check size={14} color="white" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default AmenitiesForm;
