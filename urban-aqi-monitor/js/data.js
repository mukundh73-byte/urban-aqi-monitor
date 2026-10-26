/**
 * AEROWATCH URBAN - Environmental Telemetry & Ward Datasets
 * Real-world continuous ambient air quality monitoring stations (CAAQMS)
 * covering Chennai, Delhi-NCR, Mumbai, and Bengaluru.
 */

const URBAN_DATA = {
  chennai: {
    cityName: "Chennai Metropolitan Area",
    state: "Tamil Nadu",
    center: [13.0827, 80.2707],
    zoom: 12,
    population: "11.5 Million",
    monitoringStationsCount: 14,
    lastUpdated: "Just now (Live 15-min sync)",
    overallAqi: 168,
    dominantPollutant: "PM2.5",
    healthCategory: "Moderately Polluted",
    weather: {
      temp: "31°C",
      humidity: "78%",
      windSpeed: "14 km/h",
      windDirection: "SE (Sea Breeze)",
      pressure: "1011 hPa"
    },
    pollutants: {
      aqi: 168,
      pm25: { value: 78.4, unit: "µg/m³", naaqsStandard: 60, whoStandard: 15, trend: "+4.2%" },
      pm10: { value: 142.1, unit: "µg/m³", naaqsStandard: 100, whoStandard: 45, trend: "+2.1%" },
      no2: { value: 58.7, unit: "µg/m³", naaqsStandard: 80, whoStandard: 25, trend: "-1.5%" },
      so2: { value: 44.2, unit: "µg/m³", naaqsStandard: 80, whoStandard: 40, trend: "+8.9%" },
      co: { value: 1.4, unit: "mg/m³", naaqsStandard: 2.0, whoStandard: 4.0, trend: "stable" },
      o3: { value: 38.5, unit: "µg/m³", naaqsStandard: 100, whoStandard: 100, trend: "+0.8%" }
    },
    sourceApportionment: {
      labels: ["Vehicular Emissions", "Industrial (Ennore/Manali)", "Road & Marine Dust", "Waste Burning", "Thermal & Power"],
      data: [36, 28, 18, 9, 9]
    },
    stations: [
      {
        id: "CHN-01",
        name: "Manali Petrochemical & Industrial Hub",
        type: "Industrial Hotspot",
        lat: 13.1678,
        lng: 80.2598,
        aqi: 284,
        pm25: 146.5,
        pm10: 228.3,
        no2: 84.1,
        so2: 124.6, // High SO2 due to refineries & petrochemical complexes
        co: 2.3,
        status: "Spike Detected",
        risk: "Poor",
        trend: "up"
      },
      {
        id: "CHN-02",
        name: "Alandur Urban Transit Hub (Kathipara)",
        type: "Traffic Corridor",
        lat: 13.0042,
        lng: 80.2014,
        aqi: 188,
        pm25: 86.2,
        pm10: 162.0,
        no2: 76.5,
        so2: 32.1,
        co: 1.8,
        status: "Online",
        risk: "Moderate",
        trend: "up"
      },
      {
        id: "CHN-03",
        name: "Velachery Residential Wetland Buffer",
        type: "Residential Zone",
        lat: 12.9759,
        lng: 80.2212,
        aqi: 122,
        pm25: 52.4,
        pm10: 98.7,
        no2: 41.2,
        so2: 18.5,
        co: 0.9,
        status: "Online",
        risk: "Moderate",
        trend: "down"
      },
      {
        id: "CHN-04",
        name: "Guindy Industrial Estate / IIT Campus",
        type: "Mixed Commercial",
        lat: 13.0067,
        lng: 80.2206,
        aqi: 154,
        pm25: 69.8,
        pm10: 135.2,
        no2: 62.4,
        so2: 28.9,
        co: 1.3,
        status: "Online",
        risk: "Moderate",
        trend: "stable"
      },
      {
        id: "CHN-05",
        name: "Ambattur Industrial Estate North",
        type: "Industrial Corridor",
        lat: 13.1143,
        lng: 80.1548,
        aqi: 215,
        pm25: 104.2,
        pm10: 185.0,
        no2: 71.3,
        so2: 54.8,
        co: 1.9,
        status: "Exceeded Threshold",
        risk: "Poor",
        trend: "up"
      },
      {
        id: "CHN-06",
        name: "Royapuram Port & Coastal Buffer",
        type: "Port & Commercial",
        lat: 13.1137,
        lng: 80.2954,
        aqi: 145,
        pm25: 64.1,
        pm10: 128.5,
        no2: 52.8,
        so2: 38.2,
        co: 1.1,
        status: "Online",
        risk: "Moderate",
        trend: "down"
      },
      {
        id: "CHN-07",
        name: "Kodungaiyur Dump Yard & North Ward",
        type: "Waste Treatment Hotspot",
        lat: 13.1367,
        lng: 80.2644,
        aqi: 262,
        pm25: 132.8,
        pm10: 210.4,
        no2: 79.2,
        so2: 68.4,
        co: 2.1,
        status: "Spike Detected",
        risk: "Poor",
        trend: "up"
      }
    ],
    historical24h: {
      timestamps: ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00", "Now"],
      aqi: [142, 138, 175, 210, 185, 155, 192, 178, 168],
      pm25: [64, 61, 82, 102, 88, 72, 94, 84, 78],
      pm10: [118, 110, 150, 188, 162, 134, 170, 152, 142],
      no2: [42, 38, 64, 82, 60, 48, 78, 68, 59],
      so2: [32, 30, 40, 52, 48, 41, 46, 45, 44]
    },
    forecast72h: {
      timestamps: ["+6h", "+12h", "+18h", "+24h", "+36h", "+48h", "+60h", "+72h"],
      predictedAqi: [175, 195, 160, 148, 155, 180, 165, 150],
      lowerBound: [155, 172, 140, 130, 135, 158, 142, 130],
      upperBound: [195, 218, 180, 166, 175, 202, 188, 170]
    }
  },

  delhi: {
    cityName: "National Capital Region (Delhi-NCR)",
    state: "Delhi & NCR",
    center: [28.6139, 77.2090],
    zoom: 11,
    population: "32.9 Million",
    monitoringStationsCount: 38,
    lastUpdated: "Just now (Live 15-min sync)",
    overallAqi: 348,
    dominantPollutant: "PM2.5",
    healthCategory: "Very Poor (GRAP Stage II Active)",
    weather: {
      temp: "26°C",
      humidity: "42%",
      windSpeed: "6 km/h",
      windDirection: "NW (Calm Inversion)",
      pressure: "1015 hPa"
    },
    pollutants: {
      aqi: 348,
      pm25: { value: 198.5, unit: "µg/m³", naaqsStandard: 60, whoStandard: 15, trend: "+12.4%" },
      pm10: { value: 342.0, unit: "µg/m³", naaqsStandard: 100, whoStandard: 45, trend: "+9.2%" },
      no2: { value: 92.4, unit: "µg/m³", naaqsStandard: 80, whoStandard: 25, trend: "+14.8%" },
      so2: { value: 52.1, unit: "µg/m³", naaqsStandard: 80, whoStandard: 40, trend: "+3.2%" },
      co: { value: 3.1, unit: "mg/m³", naaqsStandard: 2.0, whoStandard: 4.0, trend: "+5.1%" },
      o3: { value: 48.0, unit: "µg/m³", naaqsStandard: 100, whoStandard: 100, trend: "-2.1%" }
    },
    sourceApportionment: {
      labels: ["Vehicular Exhaust", "Construction & Road Dust", "Biomass / Agricultural Influx", "Industrial Estates", "Secondary Particulate Matter"],
      data: [34, 25, 22, 11, 8]
    },
    stations: [
      {
        id: "DEL-01",
        name: "Anand Vihar Inter-State Terminal",
        type: "Critical Transit Hotspot",
        lat: 28.6508,
        lng: 77.3152,
        aqi: 432,
        pm25: 278.0,
        pm10: 485.0,
        no2: 122.0,
        so2: 64.0,
        co: 4.5,
        status: "Exceeded Threshold",
        risk: "Severe",
        trend: "up"
      },
      {
        id: "DEL-02",
        name: "Punjabi Bagh Ring Road Junction",
        type: "Traffic & Commercial",
        lat: 28.6740,
        lng: 77.1311,
        aqi: 365,
        pm25: 215.4,
        pm10: 360.2,
        no2: 98.7,
        so2: 48.1,
        co: 3.4,
        status: "Spike Detected",
        risk: "Very Poor",
        trend: "up"
      },
      {
        id: "DEL-03",
        name: "ITO Central Administrative Corridor",
        type: "Urban Core",
        lat: 28.6312,
        lng: 77.2494,
        aqi: 320,
        pm25: 182.0,
        pm10: 310.5,
        no2: 88.3,
        so2: 44.0,
        co: 2.8,
        status: "Online",
        risk: "Very Poor",
        trend: "stable"
      },
      {
        id: "DEL-04",
        name: "RK Puram South Municipal Zone",
        type: "Residential Density",
        lat: 28.5660,
        lng: 77.1767,
        aqi: 312,
        pm25: 174.6,
        pm10: 295.0,
        no2: 78.4,
        so2: 38.6,
        co: 2.2,
        status: "Online",
        risk: "Very Poor",
        trend: "down"
      },
      {
        id: "DEL-05",
        name: "Okhla Industrial Area Phase-II",
        type: "Industrial Hotspot",
        lat: 28.5308,
        lng: 77.2713,
        aqi: 395,
        pm25: 242.0,
        pm10: 410.0,
        no2: 110.5,
        so2: 72.8,
        co: 3.9,
        status: "Spike Detected",
        risk: "Very Poor",
        trend: "up"
      },
      {
        id: "DEL-06",
        name: "Noida Sector-62 Tech Corridor",
        type: "Suburban Mixed",
        lat: 28.6279,
        lng: 77.3688,
        aqi: 338,
        pm25: 190.2,
        pm10: 328.0,
        no2: 84.6,
        so2: 50.2,
        co: 2.6,
        status: "Online",
        risk: "Very Poor",
        trend: "up"
      }
    ],
    historical24h: {
      timestamps: ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00", "Now"],
      aqi: [280, 295, 330, 390, 360, 310, 375, 360, 348],
      pm25: [155, 168, 190, 230, 208, 172, 220, 205, 198],
      pm10: [270, 288, 335, 410, 375, 305, 388, 360, 342],
      no2: [68, 62, 85, 115, 90, 74, 108, 100, 92],
      so2: [42, 40, 48, 60, 55, 46, 56, 54, 52]
    },
    forecast72h: {
      timestamps: ["+6h", "+12h", "+18h", "+24h", "+36h", "+48h", "+60h", "+72h"],
      predictedAqi: [365, 390, 340, 325, 350, 380, 360, 335],
      lowerBound: [340, 360, 315, 300, 320, 350, 330, 305],
      upperBound: [390, 420, 365, 350, 380, 410, 390, 365]
    }
  },

  mumbai: {
    cityName: "Mumbai Metropolitan Region",
    state: "Maharashtra",
    center: [19.0760, 72.8777],
    zoom: 11,
    population: "21.3 Million",
    monitoringStationsCount: 22,
    lastUpdated: "Just now (Live 15-min sync)",
    overallAqi: 182,
    dominantPollutant: "PM10",
    healthCategory: "Moderately Polluted",
    weather: {
      temp: "33°C",
      humidity: "72%",
      windSpeed: "18 km/h",
      windDirection: "WSW (Strong Coastal Tide)",
      pressure: "1012 hPa"
    },
    pollutants: {
      aqi: 182,
      pm25: { value: 72.3, unit: "µg/m³", naaqsStandard: 60, whoStandard: 15, trend: "+1.8%" },
      pm10: { value: 168.4, unit: "µg/m³", naaqsStandard: 100, whoStandard: 45, trend: "+5.4%" },
      no2: { value: 64.2, unit: "µg/m³", naaqsStandard: 80, whoStandard: 25, trend: "+0.5%" },
      so2: { value: 34.0, unit: "µg/m³", naaqsStandard: 80, whoStandard: 40, trend: "-2.1%" },
      co: { value: 1.6, unit: "mg/m³", naaqsStandard: 2.0, whoStandard: 4.0, trend: "stable" },
      o3: { value: 42.1, unit: "µg/m³", naaqsStandard: 100, whoStandard: 100, trend: "+3.0%" }
    },
    sourceApportionment: {
      labels: ["Construction & Metro Works", "Vehicular Transport", "Marine & Port Activity", "Refineries (Chembur)", "Waste Incineration"],
      data: [35, 30, 15, 12, 8]
    },
    stations: [
      {
        id: "MUM-01",
        name: "Bandra Kurla Complex (BKC)",
        type: "Commercial Financial Hub",
        lat: 19.0662,
        lng: 72.8641,
        aqi: 228,
        pm25: 98.4,
        pm10: 215.0,
        no2: 82.5,
        so2: 36.2,
        co: 2.1,
        status: "Exceeded Threshold",
        risk: "Poor",
        trend: "up"
      },
      {
        id: "MUM-02",
        name: "Chembur Refinery Corridor",
        type: "Industrial Corridor",
        lat: 19.0622,
        lng: 72.8973,
        aqi: 245,
        pm25: 112.0,
        pm10: 226.5,
        no2: 78.4,
        so2: 74.5,
        co: 2.4,
        status: "Spike Detected",
        risk: "Poor",
        trend: "up"
      },
      {
        id: "MUM-03",
        name: "Colaba South Coastal Node",
        type: "Coastal Residential",
        lat: 18.9067,
        lng: 72.8147,
        aqi: 94,
        pm25: 38.2,
        pm10: 82.0,
        no2: 35.1,
        so2: 14.2,
        co: 0.8,
        status: "Online",
        risk: "Satisfactory",
        trend: "down"
      },
      {
        id: "MUM-04",
        name: "Andheri East Western Express Highway",
        type: "Traffic Bottleneck",
        lat: 19.1136,
        lng: 72.8697,
        aqi: 204,
        pm25: 88.5,
        pm10: 192.4,
        no2: 79.1,
        so2: 31.8,
        co: 1.9,
        status: "Exceeded Threshold",
        risk: "Poor",
        trend: "up"
      }
    ],
    historical24h: {
      timestamps: ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00", "Now"],
      aqi: [135, 128, 160, 215, 190, 165, 205, 195, 182],
      pm25: [52, 48, 65, 88, 76, 62, 85, 78, 72],
      pm10: [120, 115, 148, 198, 178, 150, 192, 180, 168],
      no2: [45, 40, 58, 80, 65, 52, 75, 70, 64],
      so2: [25, 24, 30, 42, 38, 30, 36, 35, 34]
    },
    forecast72h: {
      timestamps: ["+6h", "+12h", "+18h", "+24h", "+36h", "+48h", "+60h", "+72h"],
      predictedAqi: [188, 205, 170, 158, 168, 192, 175, 162],
      lowerBound: [168, 185, 150, 140, 150, 172, 155, 142],
      upperBound: [208, 225, 190, 176, 186, 212, 195, 182]
    }
  },

  bengaluru: {
    cityName: "Bengaluru Urban Greater Area",
    state: "Karnataka",
    center: [12.9716, 77.5946],
    zoom: 11,
    population: "13.6 Million",
    monitoringStationsCount: 18,
    lastUpdated: "Just now (Live 15-min sync)",
    overallAqi: 115,
    dominantPollutant: "PM10",
    healthCategory: "Moderately Polluted",
    weather: {
      temp: "27°C",
      humidity: "58%",
      windSpeed: "12 km/h",
      windDirection: "E (Moderate Breeze)",
      pressure: "1013 hPa"
    },
    pollutants: {
      aqi: 115,
      pm25: { value: 48.6, unit: "µg/m³", naaqsStandard: 60, whoStandard: 15, trend: "-0.8%" },
      pm10: { value: 118.2, unit: "µg/m³", naaqsStandard: 100, whoStandard: 45, trend: "+2.2%" },
      no2: { value: 52.3, unit: "µg/m³", naaqsStandard: 80, whoStandard: 25, trend: "+1.1%" },
      so2: { value: 18.4, unit: "µg/m³", naaqsStandard: 80, whoStandard: 40, trend: "stable" },
      co: { value: 1.1, unit: "mg/m³", naaqsStandard: 2.0, whoStandard: 4.0, trend: "-1.2%" },
      o3: { value: 34.2, unit: "µg/m³", naaqsStandard: 100, whoStandard: 100, trend: "+0.5%" }
    },
    sourceApportionment: {
      labels: ["Vehicular Congestion", "Road & Infrastructure Resuspension", "Peenya Industrial Sheds", "Diesel Generators", "Domestic / Cooking Fuel"],
      data: [42, 28, 14, 10, 6]
    },
    stations: [
      {
        id: "BLR-01",
        name: "Silk Board Central Junction",
        type: "High Congestion Corridor",
        lat: 12.9176,
        lng: 77.6233,
        aqi: 198,
        pm25: 82.0,
        pm10: 184.2,
        no2: 78.5,
        so2: 24.1,
        co: 2.2,
        status: "Exceeded Threshold",
        risk: "Moderate",
        trend: "up"
      },
      {
        id: "BLR-02",
        name: "Peenya Industrial Cluster Stage-1",
        type: "Industrial Hotspot",
        lat: 13.0285,
        lng: 77.5197,
        aqi: 185,
        pm25: 76.4,
        pm10: 172.0,
        no2: 66.2,
        so2: 42.8,
        co: 1.8,
        status: "Spike Detected",
        risk: "Moderate",
        trend: "up"
      },
      {
        id: "BLR-03",
        name: "Whitefield ITPL Tech Zone",
        type: "Mixed Suburban Corridor",
        lat: 12.9866,
        lng: 77.7374,
        aqi: 126,
        pm25: 54.1,
        pm10: 122.5,
        no2: 54.0,
        so2: 16.5,
        co: 1.0,
        status: "Online",
        risk: "Moderate",
        trend: "down"
      },
      {
        id: "BLR-04",
        name: "Hebbal Outer Ring Flyover",
        type: "Northern Highway Node",
        lat: 13.0358,
        lng: 77.5970,
        aqi: 142,
        pm25: 59.8,
        pm10: 138.4,
        no2: 61.2,
        so2: 19.0,
        co: 1.3,
        status: "Online",
        risk: "Moderate",
        trend: "stable"
      }
    ],
    historical24h: {
      timestamps: ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00", "Now"],
      aqi: [95, 88, 110, 155, 130, 108, 145, 130, 115],
      pm25: [38, 34, 46, 68, 55, 42, 62, 54, 48],
      pm10: [90, 84, 112, 156, 134, 110, 148, 132, 118],
      no2: [36, 32, 48, 72, 54, 40, 68, 58, 52],
      so2: [14, 12, 16, 22, 20, 16, 20, 19, 18]
    },
    forecast72h: {
      timestamps: ["+6h", "+12h", "+18h", "+24h", "+36h", "+48h", "+60h", "+72h"],
      predictedAqi: [125, 140, 118, 105, 112, 130, 120, 110],
      lowerBound: [110, 122, 102, 92, 98, 115, 105, 95],
      upperBound: [140, 158, 134, 118, 126, 145, 135, 125]
    }
  }
};

/**
 * Standard Air Quality Index Bands according to India CPCB / NAAQS
 */
const AQI_STANDARDS = [
  { min: 0, max: 50, category: "Good", color: "#10b981", healthAdvisory: "Minimal impact. Clean air ideal for outdoor activity." },
  { min: 51, max: 100, category: "Satisfactory", color: "#84cc16", healthAdvisory: "Minor breathing discomfort to sensitive people." },
  { min: 101, max: 200, category: "Moderate", color: "#eab308", healthAdvisory: "Breathing discomfort to people with lungs, asthma and heart diseases." },
  { min: 201, max: 300, category: "Poor", color: "#f97316", healthAdvisory: "Breathing discomfort to most people on prolonged exposure." },
  { min: 301, max: 400, category: "Very Poor", color: "#ef4444", healthAdvisory: "Respiratory illness on prolonged exposure. Pronounced in vulnerable demographics." },
  { min: 401, max: 500, category: "Severe", color: "#991b1b", healthAdvisory: "Affects healthy people and seriously impacts those with existing diseases." }
];

function getAqiBand(aqi) {
  for (const band of AQI_STANDARDS) {
    if (aqi >= band.min && aqi <= band.max) {
      return band;
    }
  }
  return { min: 501, max: 999, category: "Severe+", color: "#7f1d1d", healthAdvisory: "Emergency public health emergency." };
}
