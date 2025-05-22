import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export const MapaTodosEventos = ({ eventos }) => {
  const center = [-16.5, -68.15];

  return (
    <MapContainer center={center} zoom={6} style={{ height: "400px", width: "100%", marginBottom: "2rem" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {eventos.filter(e => e.latitud && e.longitud).map((e) => (
        <Marker key={e.id_evento} position={[e.latitud, e.longitud]}>
          <Popup>
            <strong>{e.titulo}</strong><br />
            {e.ubicacion}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
