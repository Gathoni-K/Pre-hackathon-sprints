import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import { useBatchData } from '../hooks/useBatchData';

const customMarkerIcon = L.divIcon({
  className: 'custom-marker-container',
  html: `<div class="marker-pulse-ring"></div><div class="marker-core-dot"></div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});


const locationCoordinates: Record<string, [number, number]> = {
  'dunga':     [-0.1411, 34.7368],
  'usenge':    [-0.0677, 34.0558],
  'kendu bay': [-0.3695, 34.6502],
};

const normalizeLocation = (location: string) => location.trim().toLowerCase();

export default function AssetMap() {
  const [isMounted, setIsMounted] = useState(false);
  const { data: batches = [], loading, error } = useBatchData(); 

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || loading) {
    return (
      <div className="w-full h-[500px] rounded-2xl bg-slate-900 flex items-center justify-center border border-slate-800">
        <span className="text-slate-400 font-medium animate-pulse">
          {loading ? 'Fetching batch locations...' : 'Loading map...'}
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[500px] rounded-2xl bg-slate-900 flex items-center justify-center border border-red-800">
        <span className="text-red-400">Failed to load batch locations: {error}</span>
      </div>
    );
  }

  return (
    <div
      className="w-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl"
      style={{ height: '500px' }}
    >
      <MapContainer
        center={[-0.15, 34.5]}
        zoom={9}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {batches.map(batch => {
          const position = locationCoordinates[normalizeLocation(batch.location)];

          if (!position) return null;

          return (
            <Marker key={batch.id} position={position} icon={customMarkerIcon}>
              <Popup>
                <div className="p-1 min-w-[140px]">
                  <p className="font-bold text-slate-900 m-0">{batch.name}</p>
                  <p className="text-xs text-slate-500 mt-1 m-0">📍 {batch.location}</p>
                  <p className="text-xs text-slate-500 m-0">⚡ {batch.energy_output} kWh</p>
                  <p className="text-xs mt-1 m-0 font-medium" style={{
                    color: batch.status === 'Active' ? '#14b8a6' :
                           batch.status === 'Processing' ? '#eab308' : '#94a3b8'
                  }}>
                    ● {batch.status}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}