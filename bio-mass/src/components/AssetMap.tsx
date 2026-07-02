import 'leaflet/dist/leaflet.css';
import { useEffect, useState, useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useBatchData } from '../hooks/useBatchData';

const locationCoordinates: Record<string, [number, number]> = {
  'dunga':     [-0.1411, 34.7368],
  'usenge':    [-0.0677, 34.0558],
  'kendu bay': [-0.3695, 34.6502],
};


function calculateUrgency(batch: { start_date: string; energy_output: number }): number {
  let score = 0;


  const hoursOld = (Date.now() - new Date(batch.start_date).getTime()) / 3600000;
  if (hoursOld > 72) score += 40;
  else if (hoursOld > 24) score += 25;
  else if (hoursOld > 6) score += 10;

  if (batch.energy_output > 800) score += 35;
  else if (batch.energy_output > 400) score += 20;
  else score += 5;

  return Math.min(score, 100);
}

function urgencyColor(score: number): string {
  if (score >= 70) return '#EF4444';  
  if (score >= 40) return '#F59E0B';  
  return '#22C55E';              
}

function urgencyLabel(score: number): string {
  if (score >= 70) return 'Critical';
  if (score >= 40) return 'Moderate';
  return 'Low';
}


function getMarkerIcon(isSelected: boolean, urgencyScore: number) {
  const color = urgencyColor(urgencyScore);
  return L.divIcon({
    className: 'custom-marker-container',
    html: `
      <div class="marker-pulse-ring${isSelected ? ' marker-pulse-ring--active' : ''}" style="border-color: ${color}"></div>
      <div class="marker-core-dot${isSelected ? ' marker-core-dot--active' : ''}" style="background-color: ${color}"></div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

function getLocationCoordinates(location: string): [number, number] | undefined {
  return locationCoordinates[location.trim().toLowerCase()];
}

function FlyToSelected({ position }: { position: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 12, { duration: 0.8 });
    }
  }, [position, map]);
  return null;
}

interface AssetMapProps {
  selectedBatchId: number | null;
  onPinClick: (id: number) => void;
}

export default function AssetMap({ selectedBatchId, onPinClick }: AssetMapProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { data: batches, loading, error } = useBatchData();

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

  const selectedBatch = batches.find(b => b.id === selectedBatchId);
  const selectedPosition = selectedBatch ? getLocationCoordinates(selectedBatch.location) ?? null : null;

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl" style={{ height: '500px' }}>
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

        <FlyToSelected position={selectedPosition} />

        {batches.map(batch => {
          const position = getLocationCoordinates(batch.location);
          if (!position) return null;
          const isSelected = batch.id === selectedBatchId;
          const urgency = calculateUrgency(batch);

          return (
            <Marker
              key={batch.id}
              position={position}
              icon={getMarkerIcon(isSelected, urgency)}
              eventHandlers={{
                click: () => onPinClick(batch.id),
              }}
            >
              <Popup>
                <div className="p-1 min-w-[140px]">
                  <p className="font-bold text-slate-900 m-0">{batch.name}</p>
                  <p className="text-xs text-slate-500 mt-1 m-0">📍 {batch.location}</p>
                  <p className="text-xs text-slate-500 m-0">⚡ {batch.energy_output} kWh</p>
                  <p className="text-xs font-semibold mt-1 m-0" style={{ color: urgencyColor(urgency) }}>
                    {urgencyLabel(urgency)} — {urgency}/100
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