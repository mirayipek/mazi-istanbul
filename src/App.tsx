/// <reference types="vite/client" />
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation, Info, Search, Heart, Locate, List, Map } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { places, Place } from './data';

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

// Custom SVG Marker Generator
const createMarkerIcon = (isActive: boolean, isHovered: boolean) => {
  const color = isActive ? '#3E3E2A' : isHovered ? '#7e7e5d' : '#5A5A40';
  const scale = isActive || isHovered ? 'scale(1.2)' : 'scale(1)';
  
  const svgHtml = `
    <div style="transform: ${scale}; transform-origin: bottom center; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); filter: drop-shadow(0px 4px 6px rgba(0,0,0,0.15));">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="${color}" stroke="#ffffff" stroke-width="1.5"/>
        <circle cx="12" cy="9" r="3" fill="#ffffff" opacity="${isActive || isHovered ? '1' : '0.8'}"/>
      </svg>
    </div>
  `;

  return L.divIcon({
    className: 'custom-svg-marker bg-transparent border-none', // remove default leaflet backgrounds
    html: svgHtml,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

// Component to handle map fly-to animations when selected place changes
function MapController({ selectedPlace, mobileView }: { selectedPlace: Place | null, mobileView: string }) {
  const map = useMap();
  
  useEffect(() => {
    // Fix Leaflet sizing issue when toggling mobile views
    const timeout = setTimeout(() => {
      map.invalidateSize();
    }, 100);
    return () => clearTimeout(timeout);
  }, [mobileView, map]);

  useEffect(() => {
    if (selectedPlace) {
      const lat = Number(selectedPlace.latitude);
      const lng = Number(selectedPlace.longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        map.flyTo([lat, lng], 15, {
          duration: 1.5,
          easeLinearity: 0.25
        });
      }
    }
  }, [selectedPlace, map]);
  
  return null;
}

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [selectedDistrict, setSelectedDistrict] = useState("Tümü");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [sortByDistance, setSortByDistance] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('mazi-istanbul-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  
  useEffect(() => {
    localStorage.setItem('mazi-istanbul-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };
  
  const handleLocateMe = () => {
    if (sortByDistance) {
      setSortByDistance(false);
      return;
    }
    if (!navigator.geolocation) {
      alert('Tarayıcınız konum özelliğini desteklemiyor.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setSortByDistance(true);
        setIsLocating(false);
      },
      (error) => {
        alert('Konum alınamadı: ' + error.message);
        setIsLocating(false);
      }
    );
  };

  const categories = ["Tümü", ...Array.from(new Set(places.map(p => p.category))).sort()];
  const districts = ["Tümü", ...Array.from(new Set(places.map(p => p.district))).sort()];
  
  const selectedPlace = places.find(p => p.id === selectedId) || null;
  
  const filteredPlaces = places.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.district.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Tümü" || p.category === selectedCategory;
    const matchesDistrict = selectedDistrict === "Tümü" || p.district === selectedDistrict;
    const matchesFavorites = !showFavoritesOnly || favorites.includes(p.id);
    
    return matchesSearch && matchesCategory && matchesDistrict && matchesFavorites;
  }).map(p => {
    const distance = userLocation 
      ? calculateDistance(userLocation.lat, userLocation.lng, p.latitude, p.longitude) 
      : null;
    return { ...p, distance };
  });

  if (sortByDistance && userLocation) {
    filteredPlaces.sort((a, b) => (a.distance || 0) - (b.distance || 0));
  }

  return (
    <div className="flex flex-col md:flex-row h-[100dvh] w-full bg-[#f5f5f0] text-[#2d2d2a] font-sans overflow-hidden">
      {/* Sidebar List */}
      <div className={`${mobileView === 'list' ? 'flex' : 'hidden'} md:flex w-full md:w-[320px] lg:w-[380px] h-[calc(100dvh-72px)] md:h-full bg-white/30 border-r border-[#d8d8ce] flex-col relative z-20 flex-shrink-0`}>
        <div className="p-8 border-b border-[#d8d8ce] shrink-0 bg-white/50 backdrop-blur-sm">
          <h1 className="font-serif text-4xl text-[#5A5A40] leading-none tracking-tight mb-2">
            Mazi <span className="italic">İstanbul</span>
          </h1>
          <p className="text-[#8a8a7a] font-serif italic text-sm md:text-base mb-6 opacity-90">
            Asırlık lezzet durakları ve tarihi mekanlar
          </p>
          
          <div className="flex flex-col gap-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Mekan ara..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#d8d8ce] rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#5A5A40] transition-colors"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8a7a] w-4 h-4" />
            </div>
            
            <div className="flex gap-2">
              <select 
                value={selectedCategory} 
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full bg-transparent border border-[#d8d8ce] rounded-full px-3 py-2 text-xs text-[#5A5A40] focus:outline-none focus:ring-1 focus:ring-[#5A5A40] transition-colors cursor-pointer hover:border-[#5A5A40]"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <select 
                value={selectedDistrict} 
                onChange={e => setSelectedDistrict(e.target.value)}
                className="w-full bg-transparent border border-[#d8d8ce] rounded-full px-3 py-2 text-xs text-[#5A5A40] focus:outline-none focus:ring-1 focus:ring-[#5A5A40] transition-colors cursor-pointer hover:border-[#5A5A40]"
              >
                {districts.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`flex items-center justify-center px-4 rounded-full border transition-colors shrink-0
                  ${showFavoritesOnly 
                    ? 'border-[#5A5A40] bg-[#5A5A40] text-white' 
                    : 'border-[#d8d8ce] bg-transparent text-[#5A5A40] hover:border-[#5A5A40]'
                  }`}
                title="Favorilerimi Göster"
              >
                <Heart className="w-4 h-4" fill={showFavoritesOnly ? "currentColor" : "transparent"} />
              </button>
              <button
                onClick={handleLocateMe}
                disabled={isLocating}
                className={`flex items-center justify-center px-4 rounded-full border transition-colors shrink-0
                  ${sortByDistance 
                    ? 'border-[#5A5A40] bg-[#5A5A40] text-white' 
                    : 'border-[#d8d8ce] bg-transparent text-[#5A5A40] hover:border-[#5A5A40]'
                  } ${isLocating ? 'opacity-50 cursor-wait' : ''}`}
                title="Yakınımdakiler"
              >
                <Locate className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-px">
          {filteredPlaces.length === 0 ? (
            <div className="py-12 text-center text-[#8a8a7a] text-sm">
              Sonuç bulunamadı
            </div>
          ) : (
            <div className="w-full">
              {filteredPlaces.map((place) => (
                <div
                  key={place.id}
                  onClick={() => setSelectedId(place.id)}
                  onMouseEnter={() => setHoveredId(place.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  role="button"
                  tabIndex={0}
                  className={`w-full text-left p-6 border-b border-[#e5e5de] transition-colors cursor-pointer
                    ${selectedId === place.id 
                      ? 'bg-[#5A5A40] text-white' 
                      : 'hover:bg-white/50'}`}
                >
                  <div className="flex gap-4">
                    <div className="flex flex-1 justify-between items-start">
                      <div>
                        <p className={`text-[10px] uppercase tracking-widest mb-1.5 ${selectedId === place.id ? 'opacity-80' : 'text-[#8a8a7a]'}`}>
                          Kategori • {place.category}
                        </p>
                        <h3 className={`font-serif text-2xl leading-tight mb-1 ${selectedId === place.id ? '' : 'text-[#5A5A40]'}`}>
                          {place.name}
                        </h3>
                        <p className={`text-sm ${selectedId === place.id ? 'opacity-90' : 'text-[#8a8a7a]'}`}>
                          {place.district}, İstanbul
                        </p>
                        {place.distance !== null && sortByDistance && (
                          <p className={`text-[10px] mt-2 font-medium uppercase tracking-widest ${selectedId === place.id ? 'opacity-80' : 'text-[#8a8a7a]'}`}>
                            SİZE UZAKLIĞI: {place.distance.toFixed(1)} km
                          </p>
                        )}
                      </div>
                      <button 
                        onClick={(e) => toggleFavorite(e, place.id)}
                        className={`p-2 rounded-full transition-colors shrink-0 ${selectedId === place.id ? 'text-white hover:bg-white/10' : 'text-[#5A5A40] hover:bg-[#5A5A40]/10'}`}
                      >
                        <Heart 
                          className="w-5 h-5 transition-all outline-none" 
                          fill={favorites.includes(place.id) ? "currentColor" : "transparent"} 
                        />
                      </button>
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {selectedId === place.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className={`text-base font-serif italic leading-relaxed pt-4 mt-4 border-t ${selectedId === place.id ? 'text-white/90 border-white/20' : 'text-[#4a4a45] border-[#d8d8ce]'}`}>
                          {place.description}
                        </p>
                        {place.hours && (
                          <div className={`mt-3 pt-3 border-t flex justify-between items-center ${selectedId === place.id ? 'border-white/20' : 'border-[#d8d8ce]/50'}`}>
                            <span className={`text-[9px] uppercase tracking-widest font-bold ${selectedId === place.id ? 'text-white/70' : 'text-[#8a8a7a]'}`}>Saatler</span>
                            <span className={`text-xs font-medium ${selectedId === place.id ? 'text-white' : 'text-[#5A5A40]'}`}>{place.hours}</span>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Map Area */}
      <div className={`${mobileView === 'map' ? 'block' : 'hidden'} md:block w-full h-[calc(100dvh-72px)] md:h-full relative bg-[#e5e3df] flex-grow z-10`}>
        <MapContainer 
          center={[41.015, 28.979]} // Center of Istanbul roughly
          zoom={12} 
          className="w-full h-full"
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            maxZoom={19}
          />
          <MapController selectedPlace={selectedPlace} mobileView={mobileView} />
          
          {filteredPlaces.map((place) => {
            const isActive = selectedId === place.id;
            const isHovered = hoveredId === place.id;
            
            const lat = Number(place.latitude);
            const lng = Number(place.longitude);
            if (isNaN(lat) || isNaN(lng)) return null;

            return (
              <Marker 
                key={place.id}
                position={[lat, lng]}
                icon={createMarkerIcon(isActive, isHovered)}
                zIndexOffset={isActive || isHovered ? 1000 : 0}
                eventHandlers={{
                  click: () => setSelectedId(place.id),
                  mouseover: () => setHoveredId(place.id),
                  mouseout: () => setHoveredId(null)
                }}
              >
                <Popup className="font-sans">
                  <div className="p-6 overflow-hidden w-[260px] rounded-xl flex flex-col gap-4">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <p className="text-[9px] text-[#8a8a7a] font-bold uppercase tracking-widest mb-1.5">{place.district}</p>
                          <h4 className="font-serif text-2xl text-[#5A5A40] font-medium leading-tight">{place.name}</h4>
                        </div>
                        <button 
                          onClick={(e) => toggleFavorite(e, place.id)}
                          className="text-[#5A5A40] shrink-0 p-1.5 -mr-1.5 -mt-1.5 rounded-full hover:bg-[#f5f5f0] transition-colors"
                        >
                          <Heart 
                            className="w-4 h-4 transition-all" 
                            fill={favorites.includes(place.id) ? "currentColor" : "transparent"} 
                          />
                        </button>
                      </div>
                      <p className="text-sm text-[#4a4a45] font-serif italic line-clamp-3 leading-relaxed opacity-90">
                        {place.description}
                      </p>
                      <button 
                        onClick={() => setSelectedId(place.id)}
                        className="text-xs text-[#5A5A40] font-semibold tracking-wide uppercase border-b-2 border-[#5A5A40]/30 hover:border-[#5A5A40] pb-0.5 transition-colors self-start mt-2"
                      >
                        Detayları Gör
                      </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
        
        {/* Floating Detail Card (Visible mainly on desktop or when active) */}
        <AnimatePresence>
          {selectedPlace && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-8 w-[90%] md:w-96 bg-[#fcfcf9] p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-[#d8d8ce] z-[1000] overflow-y-auto max-h-[calc(100vh-100px)] flex flex-col"
            >
              <div className="flex justify-between items-start mb-8 shrink-0">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-[#d8d8ce]/50 text-[#5A5A40] rounded-full text-[10px] font-bold uppercase tracking-widest">{selectedPlace.category}</span>
                    <span className="text-[#8a8a7a] text-xs uppercase tracking-widest font-medium">{selectedPlace.district}</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-serif text-[#5A5A40] leading-tight mt-3">{selectedPlace.name}</h1>
                </div>
                <button 
                  onClick={(e) => toggleFavorite(e, selectedPlace.id)}
                  className="p-3 rounded-full bg-[#f5f5f0] text-[#5A5A40] hover:bg-[#e4e4df] transition-colors shrink-0 mt-1"
                >
                  <Heart 
                    className="w-6 h-6 transition-all" 
                    fill={favorites.includes(selectedPlace.id) ? "currentColor" : "transparent"} 
                  />
                </button>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto mb-8 pr-2">
                <p className="text-lg leading-relaxed font-serif text-[#4a4a45] opacity-90 mb-6">
                  {selectedPlace.description}
                </p>
                <div className="bg-[#f5f5f0] p-5 rounded-2xl border border-[#d8d8ce]/50">
                  <h4 className="text-xs uppercase tracking-widest text-[#8a8a7a] font-medium mb-3">Tarihçe & Notlar</h4>
                  <p className="text-sm text-[#5A5A40] leading-relaxed mb-4">
                     Bu tarihi mekan, İstanbul'un kültürel mirasının önemli bir parçası olarak günümüze kadar ulaşmayı başarmıştır. Geleneksel dokusunu koruyan bu değerli yapı, şehrin hafızasında özel bir yere sahiptir.
                  </p>
                  {selectedPlace.hours && (
                    <div className="pt-4 border-t border-[#d8d8ce]/50 flex justify-between items-center">
                      <span className="text-[10px] uppercase tracking-widest text-[#8a8a7a] font-bold">Ziyaret Saatleri</span>
                      <span className="text-sm font-sans font-medium text-[#5A5A40]">{selectedPlace.hours}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPlace.latitude},${selectedPlace.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#5A5A40] rounded-3xl p-4 shadow-lg flex items-center justify-between group cursor-pointer transition-transform hover:scale-[1.02] no-underline shrink-0"
              >
                <span className="text-white font-serif text-lg pl-2">Yol Tarifi Al</span>
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                  <Navigation className="h-5 w-5" />
                </div>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-[#d8d8ce] flex items-center justify-around z-[2000] h-[72px] shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
        <button 
          onClick={() => setMobileView('list')}
          className={`flex flex-col items-center justify-center w-full h-full gap-1.5 transition-colors
            ${mobileView === 'list' ? 'text-[#5A5A40]' : 'text-[#8a8a7a] hover:bg-[#f5f5f0]'}`}
        >
          <List className="w-6 h-6" />
          <span className="text-[10px] uppercase tracking-widest font-medium">Liste</span>
        </button>
        <button 
          onClick={() => setMobileView('map')}
          className={`flex flex-col items-center justify-center w-full h-full gap-1.5 transition-colors
            ${mobileView === 'map' ? 'text-[#5A5A40]' : 'text-[#8a8a7a] hover:bg-[#f5f5f0]'}`}
        >
          <Map className="w-6 h-6" />
          <span className="text-[10px] uppercase tracking-widest font-medium">Harita</span>
        </button>
      </div>
    </div>
  );
}
