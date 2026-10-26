/**
 * AEROWATCH URBAN - Geospatial Ward Monitoring & Dispersion Map
 * Powered by Leaflet.js with Dark Matter Carto basemaps
 */

let urbanMap = null;
let stationMarkersLayer = null;
let dispersionCirclesLayer = null;
let currentCityKey = "chennai";
let activePollutantFilter = "aqi";

function initMap(cityKey = "chennai") {
  currentCityKey = cityKey;
  const city = URBAN_DATA[cityKey];
  
  const mapElement = document.getElementById("urban-map");
  if (!mapElement) return;

  if (urbanMap) {
    urbanMap.remove();
  }

  urbanMap = L.map("urban-map", {
    center: city.center,
    zoom: city.zoom,
    zoomControl: false,
    attributionControl: false
  });

  L.control.zoom({ position: "bottomright" }).addTo(urbanMap);

  // CartoDB Dark Matter basemap for high-tech command center feel
  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    maxZoom: 19,
    subdomains: "abcd"
  }).addTo(urbanMap);

  stationMarkersLayer = L.layerGroup().addTo(urbanMap);
  dispersionCirclesLayer = L.layerGroup().addTo(urbanMap);

  renderStationsOnMap();
}

function renderStationsOnMap() {
  if (!urbanMap || !stationMarkersLayer) return;

  stationMarkersLayer.clearLayers();
  dispersionCirclesLayer.clearLayers();

  const city = URBAN_DATA[currentCityKey];

  city.stations.forEach(station => {
    const band = getAqiBand(station.aqi);
    
    // Determine displayed value based on active filter
    let displayValue = station.aqi;
    let unit = "";
    if (activePollutantFilter === "pm25") {
      displayValue = Math.round(station.pm25);
      unit = "µg";
    } else if (activePollutantFilter === "pm10") {
      displayValue = Math.round(station.pm10);
      unit = "µg";
    } else if (activePollutantFilter === "no2") {
      displayValue = Math.round(station.no2);
      unit = "µg";
    } else if (activePollutantFilter === "so2") {
      displayValue = Math.round(station.so2);
      unit = "µg";
    }

    // Custom HTML Pin
    const customIcon = L.divIcon({
      className: "custom-leaflet-marker",
      html: `
        <div class="aqi-marker-pin" style="background-color: ${band.color}; box-shadow: 0 0 16px ${band.color}aa;">
          ${displayValue}
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });

    const marker = L.marker([station.lat, station.lng], { icon: customIcon });

    // Interactive Popup with detailed sensor telemetry and municipal action
    const popupHtml = `
      <div style="font-family: 'Inter', sans-serif; color: #fff; background: #0f172a; padding: 12px; border-radius: 8px; min-width: 250px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
          <h4 style="margin: 0; font-size: 0.95rem; font-weight: 700; color: #f8fafc;">${station.name}</h4>
        </div>
        <div style="font-size: 0.72rem; color: #94a3b8; margin-bottom: 8px;">
          <span style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">${station.type}</span> • ID: ${station.id}
        </div>
        
        <div style="background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px; margin-bottom: 8px; border-left: 3px solid ${band.color};">
          <div style="display: flex; justify-content: space-between; font-size: 0.8rem;">
            <span>Current AQI:</span>
            <strong style="color: ${band.color};">${station.aqi} (${band.category})</strong>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; font-size: 0.72rem; margin-top: 6px; color: #cbd5e1;">
            <div>PM2.5: <strong>${station.pm25} µg/m³</strong></div>
            <div>PM10: <strong>${station.pm10} µg/m³</strong></div>
            <div>NO₂: <strong>${station.no2} µg/m³</strong></div>
            <div>SO₂: <strong>${station.so2} µg/m³</strong></div>
          </div>
        </div>

        <div style="font-size: 0.72rem; color: #94a3b8; margin-bottom: 8px;">
          Status: <strong style="color: ${station.status.includes('Spike') ? '#f43f5e' : '#10b981'}">${station.status}</strong>
        </div>

        <button onclick="handleWardAction('${station.id}', '${station.name}')" 
          style="width: 100%; background: #0284c7; color: #fff; border: none; padding: 6px 10px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; cursor: pointer;">
          Trigger Ward Mist Sprayer & Alert
        </button>
      </div>
    `;

    marker.bindPopup(popupHtml, {
      className: "custom-popup",
      closeButton: false
    });

    stationMarkersLayer.addLayer(marker);

    // Add dispersion buffer circles for hotspots
    if (station.aqi > 180) {
      const circleRadius = station.aqi > 300 ? 2500 : 1600;
      const circle = L.circle([station.lat, station.lng], {
        radius: circleRadius,
        color: band.color,
        fillColor: band.color,
        fillOpacity: 0.12,
        weight: 1.5,
        dashArray: "4, 6"
      });
      dispersionCirclesLayer.addLayer(circle);
    }
  });
}

function setPollutantFilter(pollutant) {
  activePollutantFilter = pollutant;
  renderStationsOnMap();
}

function switchMapCity(cityKey) {
  if (!URBAN_DATA[cityKey]) return;
  currentCityKey = cityKey;
  const city = URBAN_DATA[cityKey];
  if (urbanMap) {
    urbanMap.flyTo(city.center, city.zoom, { duration: 1.2 });
    setTimeout(() => {
      renderStationsOnMap();
    }, 400);
  } else {
    initMap(cityKey);
  }
}
