import { useEffect, useState } from 'react';
import Card from './components/Card';
import Navbar from './components/Navbar';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';


const customMarkerIcon = L.divIcon({
  className: 'custom-marker-container', 
  html: `<div class="marker-pulse-ring"></div><div class="marker-core-dot"></div>`,
  iconSize: [30, 30], 
  iconAnchor: [15, 15] 
});
interface LocationMarker {
  id: number;
  name: string;
  position: [number, number];
  description: string;
}
export function AssetMap() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  // 2. Centralized coordinate array for your 3 specific locations
  const locations: LocationMarker[] = [
    { 
      id: 1, 
      name: "Dunga", 
      position: [-0.1411, 34.7368], 
      description: "Dunga Beach and Wetland Area, Kisumu" 
    },
    { 
      id: 2, 
      name: "Usenge", 
      position: [-0.0677, 34.0558], 
      description: "Usenge Town and Port, Siaya" 
    },
    { 
      id: 3, 
      name: "Kendu Bay", 
      position: [-0.3695, 34.6502], 
      description: "Kendu Bay Pier Area, Homa Bay" 
    }
  ];
  if (!isMounted) {
    return (
      <div className="w-full h-[500px] rounded-2xl bg-slate-900 flex items-center justify-center border border-slate-800">
        <span className="text-slate-400 font-medium animate-pulse">Loading Asset Map Grid...</span>
      </div>
    );
  }
  return(
    <div className="w-full h-[500px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative z-10">
        <MapContainer
        center={[-0.0917, 34.7680]}
        zoom={13}
        className="h-full w-full"
        scrollWheelZoom={false}
      >
        <TileLayer
       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {locations.map((location) => (
          <Marker key={location.id} position={location.position} icon={customMarkerIcon}>
            <Popup>
              <strong>{location.name}</strong><br />
              {location.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      </div>
        );
      }

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-50">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Card title="Total Energy Output" value="1,248.5 kWh" change="+3.2%" isPositive={true} />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Monitoring live bio-mass performance parameters and metrics.
          </p>
        </header>
      </main>
    </div>
  );
}

export default App;