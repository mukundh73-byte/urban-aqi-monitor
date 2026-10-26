/**
 * AEROWATCH URBAN - Main Application Controller
 * Coordinates UI components, telemetry stream simulations, table rendering,
 * and municipal policy dispatch workflows.
 */

let activeCity = "chennai";
let simulationInterval = null;

document.addEventListener("DOMContentLoaded", () => {
  initializeDashboard("chennai");
  setupEventListeners();
  startLiveTelemetrySimulation();
});

function initializeDashboard(cityKey) {
  activeCity = cityKey;
  const city = URBAN_DATA[cityKey];

  updateCityHero(city);
  updateKpiCards(city);
  renderTelemetryTable(city);
  
  // Initialize Submodules
  initMap(cityKey);
  initCharts(cityKey);
  renderPolicyPanel(cityKey);
}

function updateCityHero(city) {
  const cityNameEl = document.getElementById("hero-city-name");
  const stateEl = document.getElementById("hero-state-name");
  const popEl = document.getElementById("hero-population");
  const stationsEl = document.getElementById("hero-station-count");
  const weatherEl = document.getElementById("hero-weather");
  const windEl = document.getElementById("hero-wind");

  if (cityNameEl) cityNameEl.innerText = city.cityName;
  if (stateEl) stateEl.innerText = `${city.state} • Urban Environmental Command`;
  if (popEl) popEl.innerText = city.population;
  if (stationsEl) stationsEl.innerText = `${city.monitoringStationsCount} Active CAAQMS`;
  if (weatherEl) weatherEl.innerHTML = `<i class="fa-solid fa-cloud-sun"></i> ${city.weather.temp}, ${city.weather.humidity}`;
  if (windEl) windEl.innerHTML = `<i class="fa-solid fa-wind"></i> ${city.weather.windSpeed} ${city.weather.windDirection}`;
}

function updateKpiCards(city) {
  const band = getAqiBand(city.overallAqi);

  // AQI Hero KPI Card
  const aqiValEl = document.getElementById("kpi-aqi-val");
  const aqiCatEl = document.getElementById("kpi-aqi-category");
  const aqiProgressEl = document.getElementById("kpi-aqi-progress");
  const aqiDominantEl = document.getElementById("kpi-aqi-dominant");

  if (aqiValEl) {
    aqiValEl.innerText = city.overallAqi;
    aqiValEl.style.color = band.color;
  }
  if (aqiCatEl) {
    aqiCatEl.innerText = band.category;
    aqiCatEl.style.backgroundColor = `${band.color}22`;
    aqiCatEl.style.color = band.color;
    aqiCatEl.style.border = `1px solid ${band.color}55`;
  }
  if (aqiProgressEl) {
    const percent = Math.min(100, (city.overallAqi / 500) * 100);
    aqiProgressEl.style.width = `${percent}%`;
    aqiProgressEl.style.backgroundColor = band.color;
  }
  if (aqiDominantEl) {
    aqiDominantEl.innerText = `Dominant: ${city.dominantPollutant}`;
  }

  // PM2.5 Card
  updatePollutantCard("pm25", city.pollutants.pm25, 60);

  // PM10 Card
  updatePollutantCard("pm10", city.pollutants.pm10, 100);

  // NO2 Card
  updatePollutantCard("no2", city.pollutants.no2, 80);

  // SO2 Card
  updatePollutantCard("so2", city.pollutants.so2, 80);

  // Public Health Threat Level
  const healthBadgeEl = document.getElementById("kpi-health-badge");
  const healthCatEl = document.getElementById("kpi-health-category");
  if (healthCatEl) healthCatEl.innerText = city.healthCategory;
  if (healthBadgeEl) {
    healthBadgeEl.style.backgroundColor = `${band.color}22`;
    healthBadgeEl.style.color = band.color;
  }
}

function updatePollutantCard(prefix, data, standard) {
  const valEl = document.getElementById(`kpi-${prefix}-val`);
  const trendEl = document.getElementById(`kpi-${prefix}-trend`);
  const progressEl = document.getElementById(`kpi-${prefix}-progress`);
  const deviationEl = document.getElementById(`kpi-${prefix}-deviation`);

  if (valEl) valEl.innerText = data.value.toFixed(1);
  if (progressEl) {
    const ratio = Math.min(100, (data.value / standard) * 50);
    progressEl.style.width = `${ratio}%`;
    progressEl.style.backgroundColor = data.value > standard ? '#ef4444' : '#10b981';
  }
  if (deviationEl) {
    const diff = Math.round(((data.value - standard) / standard) * 100);
    if (diff > 0) {
      deviationEl.innerText = `${diff}% above NAAQS`;
      deviationEl.style.color = "#f87171";
    } else {
      deviationEl.innerText = `${Math.abs(diff)}% within NAAQS`;
      deviationEl.style.color = "#34d399";
    }
  }
  if (trendEl) {
    trendEl.innerText = data.trend;
    if (data.trend.includes("+")) {
      trendEl.className = "kpi-trend trend-up";
      trendEl.innerHTML = `<i class="fa-solid fa-arrow-trend-up"></i> ${data.trend}`;
    } else if (data.trend.includes("-")) {
      trendEl.className = "kpi-trend trend-down";
      trendEl.innerHTML = `<i class="fa-solid fa-arrow-trend-down"></i> ${data.trend}`;
    } else {
      trendEl.className = "kpi-trend trend-stable";
      trendEl.innerHTML = `<i class="fa-solid fa-minus"></i> Stable`;
    }
  }
}

function renderTelemetryTable(city) {
  const tbody = document.getElementById("telemetry-table-body");
  if (!tbody) return;

  tbody.innerHTML = city.stations.map(station => {
    const band = getAqiBand(station.aqi);
    let statusColor = "#10b981";
    if (station.status.includes("Spike")) statusColor = "#f43f5e";
    if (station.status.includes("Threshold")) statusColor = "#f59e0b";

    return `
      <tr>
        <td>
          <div class="station-cell">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: ${statusColor};"></span>
            <div>
              <div style="font-weight: 600; color: #fff;">${station.name}</div>
              <div style="font-size: 0.68rem; color: #64748b;">ID: ${station.id}</div>
            </div>
          </div>
        </td>
        <td>
          <span class="station-type-badge">${station.type}</span>
        </td>
        <td>
          <span class="table-aqi-chip" style="background: ${band.color}22; color: ${band.color}; border: 1px solid ${band.color}55;">
            ${station.aqi} • ${band.category}
          </span>
        </td>
        <td style="font-family: var(--font-mono); font-weight: 600;">${station.pm25}</td>
        <td style="font-family: var(--font-mono); font-weight: 600;">${station.pm10}</td>
        <td style="font-family: var(--font-mono); font-weight: 600;">${station.no2}</td>
        <td style="font-family: var(--font-mono); font-weight: 600;">${station.so2}</td>
        <td>
          <span style="color: ${statusColor}; font-weight: 500; font-size: 0.72rem;">${station.status}</span>
        </td>
        <td>
          <button class="action-btn-small" onclick="handleWardAction('${station.id}', '${station.name}')">
            <i class="fa-solid fa-spray-can-sparkles"></i> Dispatch Unit
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function setupEventListeners() {
  // City Switching
  document.querySelectorAll(".city-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".city-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cityKey = btn.getAttribute("data-city");
      initializeDashboard(cityKey);
      showToast(`Switched active monitoring zone to ${URBAN_DATA[cityKey].cityName}`);
    });
  });

  // Pollutant Filter Buttons on Map
  document.querySelectorAll(".filter-chip").forEach(chip => {
    chip.addEventListener("click", (e) => {
      document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const pollutant = chip.getAttribute("data-filter");
      setPollutantFilter(pollutant);
    });
  });

  // Chart Mode Toggles
  document.querySelectorAll(".btn-chart-mode").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".btn-chart-mode").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const mode = btn.getAttribute("data-mode");
      setTrendMode(mode, activeCity);
    });
  });

  // Policy Simulator Sliders
  ["sim-traffic", "sim-construction", "sim-industry", "sim-mist"].forEach(id => {
    const slider = document.getElementById(id);
    const label = document.getElementById(`${id}-val`);
    if (slider) {
      slider.addEventListener("input", (e) => {
        if (label) label.innerText = `${e.target.value}%`;
        updateSimulatorProjections(activeCity);
      });
    }
  });

  // Table Search Filter
  const searchInput = document.getElementById("station-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();
      const rows = document.querySelectorAll("#telemetry-table-body tr");
      rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(term) ? "" : "none";
      });
    });
  }

  // Export Executive Briefing Button
  const exportBtn = document.getElementById("btn-export-report");
  if (exportBtn) {
    exportBtn.addEventListener("click", openExportModal);
  }

  // Download Raw CSV Button
  const csvBtn = document.getElementById("btn-export-csv");
  if (csvBtn) {
    csvBtn.addEventListener("click", downloadTelemetryCsv);
  }

  // Modal Close
  const closeBtn = document.getElementById("modal-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }
}

function handleWardAction(stationId, stationName) {
  showToast(`Municipal Drone & Water Mist Sprayer dispatched to ${stationName} (${stationId})`);
  
  // Highlight in table
  const rows = document.querySelectorAll("#telemetry-table-body tr");
  rows.forEach(row => {
    if (row.innerText.includes(stationId)) {
      row.style.backgroundColor = "rgba(16, 185, 129, 0.15)";
      setTimeout(() => {
        row.style.backgroundColor = "";
      }, 3500);
    }
  });
}

function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #38bdf8; margin-right: 6px;"></i> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

function openExportModal() {
  const modal = document.getElementById("export-modal");
  const modalBody = document.getElementById("modal-briefing-content");
  if (!modal || !modalBody) return;

  const city = URBAN_DATA[activeCity];
  const band = getAqiBand(city.overallAqi);
  const grap = getGrapStageForAqi(city.overallAqi);

  modalBody.innerHTML = `
    <div style="font-family: 'Inter', sans-serif; line-height: 1.6; color: #e2e8f0;">
      <div style="border-bottom: 2px solid #38bdf8; padding-bottom: 10px; margin-bottom: 14px;">
        <h3 style="margin: 0; color: #fff; font-size: 1.25rem;">OFFICIAL MUNICIPAL AIR QUALITY & POLICY BRIEFING</h3>
        <p style="margin: 2px 0 0 0; font-size: 0.8rem; color: #94a3b8;">Issued by Central Environmental Protection & Public Health Directorate</p>
      </div>

      <div style="background: rgba(0,0,0,0.25); padding: 12px; border-radius: 6px; margin-bottom: 12px; font-size: 0.85rem;">
        <div><strong>Jurisdiction:</strong> ${city.cityName} (${city.state})</div>
        <div><strong>Evaluation Standard:</strong> National Ambient Air Quality Standards (NAAQS - India)</div>
        <div><strong>Current Composite AQI:</strong> <span style="color: ${band.color}; font-weight: 700;">${city.overallAqi} (${band.category})</span></div>
        <div><strong>Active GRAP Mandate:</strong> <span style="color: #f97316; font-weight: 700;">${grap.stage} - ${grap.name}</span></div>
      </div>

      <h4 style="color: #38bdf8; font-size: 0.95rem; margin-top: 14px; margin-bottom: 6px;">Pollutant Concentration Telemetry:</h4>
      <ul style="font-size: 0.82rem; padding-left: 20px; color: #cbd5e1;">
        <li><strong>PM2.5:</strong> ${city.pollutants.pm25.value} µg/m³ (NAAQS Standard: 60 µg/m³) - ${city.pollutants.pm25.value > 60 ? 'Exceeding statutory threshold' : 'Within threshold'}</li>
        <li><strong>PM10:</strong> ${city.pollutants.pm10.value} µg/m³ (NAAQS Standard: 100 µg/m³)</li>
        <li><strong>NO₂:</strong> ${city.pollutants.no2.value} µg/m³ (Vehicular exhaust index)</li>
        <li><strong>SO₂:</strong> ${city.pollutants.so2.value} µg/m³ (Industrial & petrochemical index)</li>
      </ul>

      <h4 style="color: #38bdf8; font-size: 0.95rem; margin-top: 14px; margin-bottom: 6px;">Immediate Statutory Directive:</h4>
      <p style="font-size: 0.82rem; color: #cbd5e1;">
        All ward health officers and police commissioners are directed to enforce 
        <strong>${grap.stage}</strong> protocols, including mechanized dust suppression along arterial corridors and 
        stringent surveillance over illegal industrial emissions.
      </p>

      <div style="margin-top: 20px; display: flex; gap: 10px; justify-content: flex-end;">
        <button onclick="window.print()" style="background: #0284c7; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; cursor: pointer;">
          <i class="fa-solid fa-print"></i> Print Official Briefing
        </button>
        <button onclick="closeModal()" style="background: rgba(255,255,255,0.1); color: #fff; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; cursor: pointer;">
          Dismiss
        </button>
      </div>
    </div>
  `;

  modal.classList.add("active");
}

function closeModal() {
  const modal = document.getElementById("export-modal");
  if (modal) modal.classList.remove("active");
}

function downloadTelemetryCsv() {
  const city = URBAN_DATA[activeCity];
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Station ID,Station Name,Type,AQI,PM2.5 (ug/m3),PM10 (ug/m3),NO2 (ug/m3),SO2 (ug/m3),Status\n";

  city.stations.forEach(s => {
    csvContent += `"${s.id}","${s.name}","${s.type}",${s.aqi},${s.pm25},${s.pm10},${s.no2},${s.so2},"${s.status}"\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `AeroWatch_Urban_${activeCity}_Telemetry.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast(`Exported ${city.cityName} telemetry data to CSV.`);
}

function startLiveTelemetrySimulation() {
  if (simulationInterval) clearInterval(simulationInterval);

  simulationInterval = setInterval(() => {
    const city = URBAN_DATA[activeCity];
    
    // Subtle realistic telemetry noise (+/- 0.5%)
    city.stations.forEach(st => {
      const delta = (Math.random() - 0.49) * 1.5;
      st.pm25 = Math.max(10, parseFloat((st.pm25 + delta * 0.4).toFixed(1)));
      st.pm10 = Math.max(20, parseFloat((st.pm10 + delta * 0.6).toFixed(1)));
    });

    // Update real-time clock indicator in header
    const clockEl = document.getElementById("header-clock");
    if (clockEl) {
      const now = new Date();
      clockEl.innerText = now.toLocaleTimeString();
    }
  }, 3500);
}
