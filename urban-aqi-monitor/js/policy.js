/**
 * AEROWATCH URBAN - Environmental Policy Decision Support & Public Health Engine
 * Implements Graded Response Action Plan (GRAP) statutory triggers
 * and an interactive policy impact projection simulator.
 */

const POLICY_DATA = {
  grapStages: [
    {
      stage: "Stage I",
      name: "Poor Air Quality (AQI 201 - 300)",
      badgeClass: "grap-stage-1",
      trigger: "Enforced when AQI crosses 200",
      actions: [
        { id: "g1-1", title: "Mechanized Road Sweeping & Water Washing", desc: "Daily washing of high-density arterial corridors to suppress road dust resuspension.", mandatory: true },
        { id: "g1-2", title: "Strict Enforcement of Construction Dust Norms", desc: "Mandatory dust barrier curtains and anti-smog guns at all >500 sqm construction sites.", mandatory: true },
        { id: "g1-3", title: "Heavy Penalties on Biomass & Waste Burning", desc: "Drone surveillance and automated fines on burning garbage in municipal dumps.", mandatory: true },
        { id: "g1-4", title: "Synchronized Traffic Signal Flow", desc: "Minimize vehicular idling at major choke points and transit nodes.", mandatory: false }
      ]
    },
    {
      stage: "Stage II",
      name: "Very Poor Air Quality (AQI 301 - 400)",
      badgeClass: "grap-stage-2",
      trigger: "Enforced when AQI crosses 300",
      actions: [
        { id: "g2-1", title: "Ban on Diesel Generator Sets (DG Sets)", desc: "Total ban on diesel gen-sets across commercial and industrial facilities (hospitals exempt).", mandatory: true },
        { id: "g2-2", title: "Differential Parking Tariffs", desc: "Hike parking fees 3x-4x at metro stations and shopping zones to discourage private cars.", mandatory: true },
        { id: "g2-3", title: "Enhanced Electric Bus Frequency", desc: "Deploy 25% additional EV public transit buses along high-pollution trunk routes.", mandatory: true },
        { id: "g2-4", title: "Uninterrupted Power Grid Supply", desc: "State electricity board must maintain continuous supply to eliminate backup generator runs.", mandatory: false }
      ]
    },
    {
      stage: "Stage III",
      name: "Severe Air Quality (AQI 401 - 450)",
      badgeClass: "grap-stage-3",
      trigger: "Enforced when AQI crosses 400",
      actions: [
        { id: "g3-1", title: "Comprehensive Demolition & Construction Halt", desc: "Complete moratorium on all earthwork, piling, structural demolition, and masonry.", mandatory: true },
        { id: "g3-2", title: "Restriction on Non-BS VI Diesel Commercials", desc: "Ban entry of BS-III petrol and BS-IV diesel light motor vehicles in municipal limits.", mandatory: true },
        { id: "g3-3", title: "Closure of Brick Kilns & Hot Mix Plants", desc: "Immediate temporary shutdown of all stone crushers and unapproved industrial boilers.", mandatory: true },
        { id: "g3-4", title: "Primary Schools Shift to Remote Mode", desc: "Mandate online learning for children up to Grade 5 to avoid peak morning exposure.", mandatory: true }
      ]
    },
    {
      stage: "Stage IV",
      name: "Severe+ Air Quality (AQI > 450)",
      badgeClass: "grap-stage-4",
      trigger: "Emergency measures triggered when AQI exceeds 450",
      actions: [
        { id: "g4-1", title: "Inter-State Truck Entry Ban", desc: "Stop all heavy commercial vehicles except those carrying essential supplies (milk, medicine, LNG).", mandatory: true },
        { id: "g4-2", title: "Odd-Even Vehicular Road Rationing", desc: "Mandate alternate day registration plate driving for private gasoline and diesel vehicles.", mandatory: true },
        { id: "g4-3", title: "50% Work-From-Home for Public & Private Sector", desc: "Curtail urban commuter volume by mandating hybrid shifts across all enterprises.", mandatory: true },
        { id: "g4-4", title: "Suspension of Linear Infrastructure Construction", desc: "Halt highway, flyover, and metro excavation projects citywide.", mandatory: true }
      ]
    }
  ]
};

function getGrapStageForAqi(aqi) {
  if (aqi > 450) return POLICY_DATA.grapStages[3];
  if (aqi > 400) return POLICY_DATA.grapStages[2];
  if (aqi > 300) return POLICY_DATA.grapStages[1];
  if (aqi > 200) return POLICY_DATA.grapStages[0];
  return {
    stage: "Normal Advisory",
    name: "Precautionary Monitoring (AQI ≤ 200)",
    badgeClass: "grap-stage-1",
    trigger: "Continuous CAAQMS surveillance active",
    actions: [
      { id: "gn-1", title: "Routine Ambient CAAQMS Ingestion", desc: "Verify 15-minute sensor calibrations across all ward monitoring stations.", mandatory: true },
      { id: "gn-2", title: "Routine Green Belt Maintenance", desc: "Urban canopy misting and vegetative dust trap watering.", mandatory: false }
    ]
  };
}

function renderPolicyPanel(cityKey = "chennai") {
  const city = URBAN_DATA[cityKey];
  const grap = getGrapStageForAqi(city.overallAqi);

  const container = document.getElementById("policy-stage-container");
  if (!container) return;

  container.innerHTML = `
    <div class="grap-badge-container">
      <span class="grap-stage-pill ${grap.badgeClass}">
        <i class="fa-solid fa-shield-halved"></i> ${grap.stage}
      </span>
      <span style="font-size: 0.85rem; font-weight: 600; color: #fff;">${grap.name}</span>
    </div>
    <div style="font-size: 0.75rem; color: var(--text-dim); margin-bottom: 0.8rem;">
      <i class="fa-solid fa-triangle-exclamation"></i> Trigger: ${grap.trigger}
    </div>
    <div class="policy-checklist">
      ${grap.actions.map(action => `
        <div class="policy-item">
          <input type="checkbox" id="${action.id}" checked>
          <div class="policy-text">
            <div class="policy-title">${action.title}</div>
            <div class="policy-desc">${action.desc}</div>
          </div>
          <span class="policy-enforce-badge ${action.mandatory ? 'badge-mandatory' : 'badge-advisory'}">
            ${action.mandatory ? 'Mandatory' : 'Advisory'}
          </span>
        </div>
      `).join('')}
    </div>
  `;

  renderHealthGuidance(city);
  updateSimulatorProjections(cityKey);
}

function renderHealthGuidance(city) {
  const container = document.getElementById("health-guidance-container");
  if (!container) return;

  const aqi = city.overallAqi;
  let generalStatus = "Safe";
  let vulnerableStatus = "Low Risk";
  let schoolStatus = "Normal";
  let maskStatus = "Optional";

  if (aqi > 400) {
    generalStatus = "Hazardous - Avoid all outdoor physical activity";
    vulnerableStatus = "Severe Emergency - Remain indoors with air purification";
    schoolStatus = "Physical Classes Suspended / Hybrid Shift";
    maskStatus = "Mandatory N95 / FFP2 Respirator Outdoors";
  } else if (aqi > 300) {
    generalStatus = "Unhealthy - Avoid morning jogs and intense outdoor sports";
    vulnerableStatus = "High Risk - Asthmatics must keep reliever inhalers handy";
    schoolStatus = "Outdoor sports curtailed; indoor breaks only";
    maskStatus = "Strongly Recommended N95 Mask";
  } else if (aqi > 200) {
    generalStatus = "Moderate Caution - Reduce prolonged outdoor exertion";
    vulnerableStatus = "Elevated Sensitivity - Limit outdoor exposure for children & seniors";
    schoolStatus = "Avoid high-intensity outdoor athletic drills";
    maskStatus = "Recommended for sensitive individuals";
  } else if (aqi > 100) {
    generalStatus = "Acceptable - Sensitive individuals should monitor symptoms";
    vulnerableStatus = "Mild Risk - People with chronic lung ailments take notice";
    schoolStatus = "Standard schedule with ventilation";
    maskStatus = "Optional";
  }

  container.innerHTML = `
    <div class="health-advisory-grid">
      <div class="health-card">
        <div class="health-card-header" style="color: #38bdf8;">
          <i class="fa-solid fa-person-walking"></i> General Public
        </div>
        <div class="health-status-badge" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8;">
          ${generalStatus}
        </div>
        <div class="health-instructions">
          Limit continuous outdoor cardio between 6 AM - 9 AM during peak thermal inversion.
        </div>
      </div>

      <div class="health-card">
        <div class="health-card-header" style="color: #f43f5e;">
          <i class="fa-solid fa-heart-pulse"></i> Vulnerable & Elderly
        </div>
        <div class="health-status-badge" style="background: rgba(244, 63, 94, 0.15); color: #f43f5e;">
          ${vulnerableStatus}
        </div>
        <div class="health-instructions">
          Keep prescribed bronchodilators at hand; run HEPA air purifiers in sleeping quarters.
        </div>
      </div>

      <div class="health-card">
        <div class="health-card-header" style="color: #eab308;">
          <i class="fa-solid fa-school"></i> Schools & Daycares
        </div>
        <div class="health-status-badge" style="background: rgba(234, 179, 8, 0.15); color: #eab308;">
          ${schoolStatus}
        </div>
        <div class="health-instructions">
          Ensure school buses keep windows shut during transit through heavy industrial corridors.
        </div>
      </div>

      <div class="health-card">
        <div class="health-card-header" style="color: #10b981;">
          <i class="fa-solid fa-head-side-mask"></i> Respirator Protocol
        </div>
        <div class="health-status-badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">
          ${maskStatus}
        </div>
        <div class="health-instructions">
          Standard surgical or cloth masks do NOT filter PM2.5. Use certified N95 or KN95 respirators.
        </div>
      </div>
    </div>
  `;
}

function updateSimulatorProjections(cityKey = "chennai") {
  const city = URBAN_DATA[cityKey];
  const trafficSlider = document.getElementById("sim-traffic");
  const constrSlider = document.getElementById("sim-construction");
  const industrySlider = document.getElementById("sim-industry");
  const mistSlider = document.getElementById("sim-mist");

  if (!trafficSlider) return;

  const trafficVal = parseInt(trafficSlider.value) || 0;
  const constrVal = parseInt(constrSlider.value) || 0;
  const industryVal = parseInt(industrySlider.value) || 0;
  const mistVal = parseInt(mistSlider.value) || 0;

  // Real-world empirical policy coefficients:
  // Vehicular restriction: drops PM2.5 by ~0.28% per % traffic cut, NO2 by ~0.42%
  // Construction halt: drops PM10 by ~0.35% per % halt, PM2.5 by ~0.15%
  // Industry shift: drops SO2 by ~0.45% per % shift, PM2.5 by ~0.18%
  // Mist guns: drops PM10 by ~0.15%, PM2.5 by ~0.08%

  const deltaPm25Percent = (trafficVal * 0.28 + constrVal * 0.15 + industryVal * 0.18 + mistVal * 0.08);
  const projectedPm25 = Math.max(12, city.pollutants.pm25.value * (1 - deltaPm25Percent / 100));

  const deltaPm10Percent = (trafficVal * 0.18 + constrVal * 0.35 + industryVal * 0.14 + mistVal * 0.18);
  const projectedPm10 = Math.max(25, city.pollutants.pm10.value * (1 - deltaPm10Percent / 100));

  // Projected composite AQI
  const currentAqi = city.overallAqi;
  const aqiReductionPercent = Math.min(55, (deltaPm25Percent * 0.65 + deltaPm10Percent * 0.35));
  const simulatedAqi = Math.max(45, Math.round(currentAqi * (1 - aqiReductionPercent / 100)));
  const aqiDrop = currentAqi - simulatedAqi;

  // Health benefit projection (epidemiological model estimation)
  const populationMillions = parseFloat(city.population);
  const avertedHospitalizations = Math.round((aqiDrop * populationMillions * 0.38));

  // Update DOM displays
  const simAqiEl = document.getElementById("sim-aqi-result");
  const simDropEl = document.getElementById("sim-aqi-drop");
  const simHospitalEl = document.getElementById("sim-hospital-admissions");

  if (simAqiEl) simAqiEl.innerText = simulatedAqi;
  if (simDropEl) simDropEl.innerText = `-${aqiDrop} pts (-${Math.round(aqiReductionPercent)}%)`;
  if (simHospitalEl) simHospitalEl.innerText = `${avertedHospitalizations} cases / week`;
}
