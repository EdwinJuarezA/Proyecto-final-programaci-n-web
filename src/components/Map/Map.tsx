import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';

interface MapProps {
    latitude: number;
    longitude: number;
}

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZWR3aW4yNzExIiwiYSI6ImNseDBsbXhoNzAxeDUybG9obHE2eHZvZjYifQ.s73N0eNPyxljsj60ZkbAOg';

        if (map.current) return; 
        if (mapContainer.current) {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [longitude, latitude],
                zoom: 15
            });

            new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map.current);
        }
    }, [latitude, longitude]);

    return <div className="map-container" ref={mapContainer} />;
};

export default Map;
