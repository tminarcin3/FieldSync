import React, { useState } from 'react';
import { GeoUser } from './GeoUser';
import { Geo } from "./Geo";

import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

interface GeoUserProps {
  users: GeoUser[];
}

export default function UserMap({users}: GeoUserProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBnmE-Wyw5NvIFwLugeXo8LwAsATxY3hS4',
  });
  const [coordinates, setCoordinates] = useState<google.maps.LatLng[]>([]);
  const mapRef = React.useRef();

  const onMapLoad = React.useCallback((currentMap:any) => {
    
    users.map(user => {
      //convert geo info to google maps type
      const geo = new Geo();
      geo.lat = user.address.geo.lat;
      geo.lng = user.address.geo.lng;
      let latFloat = parseFloat(geo.lat);
      let lngFloat = parseFloat(geo.lng);

      //check correct bounds
      if(latFloat < 90 && latFloat > -90 && lngFloat > -180 && lngFloat < 180)
      {
        const coordinate = new google.maps.LatLng(parseFloat(geo.lat) , parseFloat(geo.lng));
        setCoordinates([...coordinates, coordinate]);
      }
      
    });
    mapRef.current = currentMap;
  }, []);


  if (loadError) return <p>'Error loading maps'</p>;
  if (!isLoaded) return <p>'Loading Maps'</p>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={{ height: '400px', width: '800px' }}
        zoom={7}
        center={{ lat: 39.739235, lng: -104.99025 }}
        onLoad={onMapLoad}
      >
        {coordinates.map((coordinate, index) => (
          <MarkerF key={index} position={coordinate} />
        ))}
      </GoogleMap>
    </div>
  );
};