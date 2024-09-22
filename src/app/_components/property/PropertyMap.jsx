'use client';

import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';

import { findCountryByCode } from '@/utils/countries';
import CountryNameComponent from '../card/CountryNameComponent';
import PropertyTitle from './PropertyTitle';


const PropertyMap = ({ countryCode }) => {

  const iconUrl = 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png';

  const markerIcon = icon({
    iconUrl: iconUrl,
    iconSize: [20, 30],
  });

  const defaultLocationInMap = [51.505, -0.09]; 

  const locationOfProperty = findCountryByCode(countryCode)?.location;

  return (
    <div className="mt-4">

      <div className="mb-4">

        <PropertyTitle title="Where you will be staying" />

        <CountryNameComponent countryCode={countryCode} />

      </div>

      <MapContainer
        scrollWheelZoom={false}
        zoomControl={false}
        center={locationOfProperty || defaultLocationInMap} 
        zoom={7}
        className="h-[50vh] rounded-lg relative z-0"
      >

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <ZoomControl position='bottomright' />
        
        <Marker
          position={locationOfProperty || defaultLocationInMap}
          icon={markerIcon}
        ></Marker>

      </MapContainer>

    </div>
  );
};

export default PropertyMap;
