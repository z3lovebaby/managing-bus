import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerRetina from "leaflet/dist/images/marker-icon-2x.png";

// Cấu hình icon cho Marker
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconRetinaUrl: markerRetina,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = () => {
  return (
    <MapContainer
      center={[21.0285, 105.8542]}
      zoom={13.5}
      scrollWheelZoom={true}
      zoomControl={false}
      style={{ height: "1000px", width: "100%" }}
    >
      <ZoomControl position="topright" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Marker tại Hà Nội */}
      <Marker position={[21.0285, 105.8542]}>
        <Popup>Hà Nội - Thủ đô Việt Nam</Popup>
      </Marker>
      {/* Marker tại TP.HCM */}
      <Marker position={[10.8231, 106.6297]}>
        <Popup>Thành phố Hồ Chí Minh</Popup>
      </Marker>
      {/* Marker tại Đà Nẵng */}
      <Marker position={[16.0471, 108.2068]}>
        <Popup>Đà Nẵng - Thành phố biển</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
