# AEROWATCH URBAN: Centralized Air Quality & Environmental Policy Command

**Level 1 Project Submission**  
**Student Name:** B Mukundan  
**Register Number:** 310624104611  

---

## 📌 Project Overview
Urban authorities require centralized monitoring of AQI, PM2.5, PM10, NO₂, SO₂, and pollution trends to support environmental policy and public health.

**AEROWATCH URBAN** is an enterprise-grade web application and decision-support system designed for municipal commissioners, environmental planners, and public health authorities.

## 🚀 Key Features
1. **Multi-City Urban Telemetry Hub:** Seamless switching between **Chennai**, **Delhi-NCR**, **Mumbai**, and **Bengaluru**.
2. **Real-time CAAQMS Sensor Grid:** Dynamic tracking of **AQI, PM2.5, PM10, NO₂, and SO₂** against Indian NAAQS and WHO standards.
3. **Interactive Geospatial Ward Mapping:** Leaflet-powered dark cartography with pulsing status pins, plume dispersion rings, and station popups.
4. **Trend Analytics & AI Trajectory Forecasting:** 24-hour diurnal pollutant graphs, 72-hour forecasting with confidence bands, and source apportionment models.
5. **Graded Response Action Plan (GRAP) Engine:** Automated statutory triggers (Stages I through IV) with municipal action checklists.
6. **Policy Impact Simulator:** Interactive sandbox allowing authorities to test traffic curbs, construction moratoriums, and industrial shift reductions before deployment.
7. **Stratified Public Health Protection:** Tailored advisories for general citizens, asthmatics, the elderly, and schools.
8. **Emergency Action & Briefing Export:** One-click dispatch of ward mist sprayers, raw CSV telemetry download, and printable official municipal briefings.

## 🛠️ Technology Stack
- **Structure & Interface:** HTML5 (Semantic, Accessible, SEO-optimized)
- **Styling:** Vanilla CSS3 (Dark Glassmorphic Command Center Design System, CSS Variables, Responsive Grid)
- **GIS Cartography:** Leaflet.js with CartoDB Dark Matter tiles
- **Analytics & Visualizations:** Chart.js 4.4
- **Iconography & Fonts:** FontAwesome 6, Google Fonts (Inter, Outfit, JetBrains Mono)
- **Execution Runtime:** Python 3 HTTP Server / Standard Web Server

## 🏃 Quick Start Instructions
1. Navigate to the project directory:
   ```bash
   cd /home/mukund/.gemini/antigravity-ide/scratch/urban-aqi-monitor
   ```
2. Start the local server (if not already running):
   ```bash
   python3 -m http.server 4321
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:4321
   ```

## 📁 Directory Structure
```
urban-aqi-monitor/
├── index.html        # Main Command Center UI
├── README.md         # Project documentation and quick start guide
├── css/
│   └── style.css     # Dark glassmorphic design system and responsive styles
└── js/
    ├── app.js        # Main orchestrator, table renderer, modal & event bindings
    ├── charts.js     # Chart.js configs for 24h trends, 72h forecast & sources
    ├── data.js       # Multi-city CAAQMS telemetry datasets & NAAQS breakpoints
    ├── map.js        # Leaflet GIS map with station pins and dispersion plumes
    └── policy.js     # GRAP statutory rules, policy simulator & health advisory
```
