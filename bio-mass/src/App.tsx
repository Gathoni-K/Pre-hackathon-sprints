import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import Card from './components/Card';
import Navbar from './components/Navbar';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
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

const locations: LocationMarker[] = [
  { id: 1, name: "Dunga",     position: [-0.1411, 34.7368], description: "Dunga Beach and Wetland Area, Kisumu" },
  { id: 2, name: "Usenge",    position: [-0.0677, 34.0558], description: "Usenge Town and Port, Siaya" },
  { id: 3, name: "Kendu Bay", position: [-0.3695, 34.6502], description: "Kendu Bay Pier Area, Homa Bay" }
];

function AssetMap() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-[500px] rounded-2xl bg-slate-900 flex items-center justify-center border border-slate-800">
        <span className="text-slate-400 font-medium animate-pulse">Loading Asset Map Grid...</span>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl"  style={{ height: '500px', touchAction: 'none' }} >
      <MapContainer
        center={[-0.15, 34.5]}
        zoom={9}
        scrollWheelZoom={true}
        dragging={true}
        style={{ height: '100%', width: '100%' }}  // ← inline style, not just Tailwind
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {locations.map((loc) => (
          <Marker key={loc.id} position={loc.position} icon={customMarkerIcon}>
            <Popup>
              <strong>{loc.name}</strong><br />
              {loc.description}
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
    document.documentElement.classList.toggle('dark', !darkMode);
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

        {/* ← This was missing entirely */}
        <AssetMap />
      </main>
    </div>
  );
}

export default App;