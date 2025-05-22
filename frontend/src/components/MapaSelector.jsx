import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

const MarcadorUbicacion = ({ setLatitud, setLongitud }) => {
  useMapEvents({
    click(e) {
      setLatitud(e.latlng.lat);
      setLongitud(e.latlng.lng);
    }
  });
  return null;
};

export const MapaSelector = ({ latitud, longitud, setLatitud, setLongitud }) => {
  const posicion = latitud && longitud ? [latitud, longitud] : [-16.5, -68.15];

  return (
    <MapContainer center={posicion} zoom={13} style={{ height: "300px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {latitud && longitud && <Marker position={posicion} />}
        <MarcadorUbicacion setLatitud={setLatitud} setLongitud={setLongitud} />
    </MapContainer>
  );
};
