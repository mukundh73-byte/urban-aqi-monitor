/**
 * AEROWATCH URBAN - Telemetry Trend & Predictive Analytics Charts
 * Powered by Chart.js 4.x
 */

let trendChartInstance = null;
let sourceChartInstance = null;
let activeTrendMode = "pollutants"; // 'pollutants' | 'aqi' | 'forecast'

function initCharts(cityKey = "chennai") {
  renderTrendChart(cityKey);
  renderSourceApportionmentChart(cityKey);
}

function renderTrendChart(cityKey = "chennai") {
  const city = URBAN_DATA[cityKey];
  const ctx = document.getElementById("trendChart");
  if (!ctx) return;

  if (trendChartInstance) {
    trendChartInstance.destroy();
  }

  let chartData = {};
  let chartOptions = {};

  if (activeTrendMode === "pollutants") {
    chartData = {
      labels: city.historical24h.timestamps,
      datasets: [
        {
          label: "PM2.5 (µg/m³)",
          data: city.historical24h.pm25,
          borderColor: "#38bdf8",
          backgroundColor: "rgba(56, 189, 248, 0.12)",
          fill: true,
          tension: 0.38,
          borderWidth: 2.5,
          pointRadius: 4,
          pointBackgroundColor: "#38bdf8"
        },
        {
          label: "PM10 (µg/m³)",
          data: city.historical24h.pm10,
          borderColor: "#eab308",
          backgroundColor: "rgba(234, 179, 8, 0.08)",
          fill: true,
          tension: 0.38,
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: "#eab308"
        },
        {
          label: "NO₂ (µg/m³)",
          data: city.historical24h.no2,
          borderColor: "#f97316",
          backgroundColor: "transparent",
          tension: 0.38,
          borderWidth: 2,
          pointRadius: 3,
          borderDash: [4, 4],
          pointBackgroundColor: "#f97316"
        },
        {
          label: "SO₂ (µg/m³)",
          data: city.historical24h.so2,
          borderColor: "#a855f7",
          backgroundColor: "transparent",
          tension: 0.38,
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: "#a855f7"
        }
      ]
    };
  } else if (activeTrendMode === "aqi") {
    chartData = {
      labels: city.historical24h.timestamps,
      datasets: [
        {
          label: "Composite AQI",
          data: city.historical24h.aqi,
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.2)",
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointRadius: 5,
          pointBackgroundColor: "#10b981"
        }
      ]
    };
  } else if (activeTrendMode === "forecast") {
    chartData = {
      labels: city.forecast72h.timestamps,
      datasets: [
        {
          label: "Upper 95% Confidence Band",
          data: city.forecast72h.upperBound,
          borderColor: "rgba(244, 63, 94, 0.3)",
          backgroundColor: "transparent",
          borderDash: [5, 5],
          tension: 0.4,
          pointRadius: 0
        },
        {
          label: "Predicted AQI (ARIMA/LSTM Trajectory)",
          data: city.forecast72h.predictedAqi,
          borderColor: "#f43f5e",
          backgroundColor: "rgba(244, 63, 94, 0.15)",
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointRadius: 4,
          pointBackgroundColor: "#f43f5e"
        },
        {
          label: "Lower 95% Confidence Band",
          data: city.forecast72h.lowerBound,
          borderColor: "rgba(244, 63, 94, 0.3)",
          backgroundColor: "transparent",
          borderDash: [5, 5],
          tension: 0.4,
          pointRadius: 0
        }
      ]
    };
  }

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false
    },
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          boxWidth: 10,
          color: "#94a3b8",
          font: { size: 11, family: "'Inter', sans-serif" },
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: "#0f172a",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        titleColor: "#f8fafc",
        bodyColor: "#cbd5e1",
        padding: 10,
        boxPadding: 4,
        usePointStyle: true
      }
    },
    scales: {
      x: {
        grid: { color: "rgba(255, 255, 255, 0.04)" },
        ticks: { color: "#64748b", font: { size: 10 } }
      },
      y: {
        grid: { color: "rgba(255, 255, 255, 0.05)" },
        ticks: { color: "#64748b", font: { size: 10 } }
      }
    }
  };

  trendChartInstance = new Chart(ctx, {
    type: "line",
    data: chartData,
    options: chartOptions
  });
}

function renderSourceApportionmentChart(cityKey = "chennai") {
  const city = URBAN_DATA[cityKey];
  const ctx = document.getElementById("sourceChart");
  if (!ctx) return;

  if (sourceChartInstance) {
    sourceChartInstance.destroy();
  }

  sourceChartInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: city.sourceApportionment.labels,
      datasets: [
        {
          data: city.sourceApportionment.data,
          backgroundColor: [
            "#38bdf8", // Vehicular
            "#f43f5e", // Industrial
            "#eab308", // Dust
            "#a855f7", // Waste
            "#10b981"  // Others
          ],
          borderColor: "#0f172a",
          borderWidth: 2,
          hoverOffset: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "68%",
      plugins: {
        legend: {
          position: "right",
          labels: {
            boxWidth: 12,
            color: "#94a3b8",
            font: { size: 11, family: "'Inter', sans-serif" }
          }
        },
        tooltip: {
          backgroundColor: "#0f172a",
          borderColor: "rgba(255, 255, 255, 0.1)",
          borderWidth: 1,
          callbacks: {
            label: function(context) {
              return ` ${context.label}: ${context.raw}% contribution`;
            }
          }
        }
      }
    }
  });
}

function setTrendMode(mode, cityKey = "chennai") {
  activeTrendMode = mode;
  renderTrendChart(cityKey);
}
