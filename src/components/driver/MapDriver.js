import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { map } from "leaflet";
import "leaflet-routing-machine";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerRetina from "leaflet/dist/images/marker-icon-2x.png";
import requestApi from "../../helpers/api";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";
import * as actions from "../../redux/actions";
import { toast } from "react-toastify";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
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
const busIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1819/1819616.png", // Đường dẫn đến biểu tượng xe buýt
  iconSize: [40, 40], // Kích thước icon
  iconAnchor: [15, 15], // Điểm neo của icon (giữa icon)
  popupAnchor: [0, -15], // Điểm neo của popup (nếu có)
});
L.Marker.prototype.options.icon = DefaultIcon;

const Routing = ({ startLatLng, endLatLng, bid }) => {
  const map = useMap();
  console.log("j", startLatLng, endLatLng);
  // useEffect(() => {
  //   const routingControl = L.Routing.control({
  //     waypoints: [
  //       L.latLng(startLatLng), // Hà Nội
  //       L.latLng(endLatLng), // TP.HCM
  //     ],
  //     routeWhileDragging: true,
  //     show: false, // Tắt chỉ dẫn
  //   }).addTo(map);

  //   let movingMarker;

  //   // const updateMarkerPosition = async () => {
  //   //   requestApi("/map/get-location", "POST", { id: bid })
  //   //     .then((res) => {
  //   //       if (res.data.lat && res.data.lng) {
  //   //         if (
  //   //           res.data.lat === startLatLng.lat &&
  //   //           res.data.lng === startLatLng.lng
  //   //         )
  //   //           toast.success("Xe bắt đầu xuất phát");
  //   //         if (
  //   //           res.data.lat === endLatLng.lat &&
  //   //           res.data.lng === endLatLng.lng
  //   //         )
  //   //           toast.success("Xe đã tới điểm cuối");
  //   //         if (!movingMarker) {
  //   //           // Tạo marker nếu chưa có
  //   //           movingMarker = L.marker([res.data.lat, res.data.lng], {
  //   //             icon: busIcon,
  //   //           }).addTo(map);
  //   //         } else {
  //   //           // Cập nhật vị trí marker
  //   //           movingMarker.setLatLng([res.data.lat, res.data.lng]);
  //   //           //console.log(res);
  //   //         }
  //   //       } else {
  //   //         console.warn("Dữ liệu API không đầy đủ:", res);
  //   //       }
  //   //     })
  //   //     .catch((err) => {
  //   //       console.log(err);
  //   //     });
  //   // };

  //   // // Lặp lại việc gọi API sau mỗi 2 giây
  //   // const intervalId = setInterval(updateMarkerPosition, 2200);

  //   return () => {
  //     map.removeControl(routingControl); // Hủy control khi component unmount
  //     clearInterval(intervalId); // Dừng lặp khi component unmount
  //     if (movingMarker) {
  //       map.removeLayer(movingMarker); // Xóa marker khi unmount
  //     }
  //   };
  // }, [map]);
  useEffect(() => {
    if (startLatLng && endLatLng) {
      const latLngBounds = L.latLngBounds(
        L.latLng(startLatLng),
        L.latLng(endLatLng)
      );
      map.fitBounds(latLngBounds); // Adjust map to fit bounds
    }
  }, [startLatLng, endLatLng]);
  return null;
};
const MapDriver = () => {
  const [go, setGo] = useState(false);
  const [busid, setB] = useState(null);
  const [startLatLng, setStartLatLng] = useState(null);
  const [endLatLng, setEndLatLng] = useState(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const getBus = async () => {
    try {
      dispatch(actions.controlLoading(true));
      const res = await requestApi("/bus/get-bus", "GET");
      console.log(res);
      setB(res.data.bus.id);
      dispatch(actions.controlLoading(false));
    } catch (error) {
      dispatch(actions.controlLoading(false));
      console.log(error);
    }
  };
  const view = async () => {
    try {
      dispatch(actions.controlLoading(true));
      const res = await requestApi(`/bus/get-st-end?bus_id=${busid}`, "GET");
      console.log(res);
      setGo(true);
      setStartLatLng(res.data.data.start);
      setEndLatLng(res.data.data.end);
      console.log("ennd;st", startLatLng, endLatLng);
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 3000,
      });
      dispatch(actions.controlLoading(false));
    } catch (error) {
      dispatch(actions.controlLoading(false));
      console.log(error);
      if (typeof error.response !== "undefined") {
        if (error.response.status !== 201) {
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } else {
        toast.error("Server is down. Please try again!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };
  // useEffect(() => {
  //   console.log("abcd");
  //   getBus();
  //   view();
  // }, [busid]);

  return (
    <div>
      <MapContainer
        center={[21.0285, 105.8542]} // Trung tâm bản đồ giữa Hà Nội và TP.HCM
        zoom={12}
        scrollWheelZoom={true}
        zoomControl={false}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Routing component */}
        {go && (
          <Routing
            startLatLng={startLatLng}
            endLatLng={endLatLng}
            bid={busid}
          />
        )}
        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  );
};

export default MapDriver;
