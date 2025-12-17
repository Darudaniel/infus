import { DRUGS } from "./infus-rules.js";
import * as calc from "./infus-calc.js";
import { round } from "./infus-core.js";

const $ = (id) => document.getElementById(id);
const num = (id) => Number($(id).value);

document.addEventListener("DOMContentLoaded", () => {
  loadDrugs();
  bindEvents();
  recalc();
});

function loadDrugs() {
  const sel = $("drugSelect");
  sel.innerHTML = "";
  Object.entries(DRUGS).forEach(([key, drug]) => {
    const o = document.createElement("option");
    o.value = key;
    o.textContent = drug.label;
    sel.appendChild(o);
  });
  syncDrug();
}

function syncDrug() {
  const drug = DRUGS[$("drugSelect").value];

  const unitSel = $("prepUnit");
  unitSel.innerHTML = "";
  drug.unitsAllowed.forEach((u) => {
    const o = document.createElement("option");
    o.value = u;
    o.textContent = u;
    unitSel.appendChild(o);
  });

  $("prepAmount").value = drug.defaultPreparation.amount;
  $("prepVol").value = drug.defaultPreparation.volumeMl;
}

function addAlert(severity, text) {
  const div = document.createElement("div");
  div.className = `alert ${severity}`; // high | warn | info
  div.textContent = text;
  $("alerts").appendChild(div);
}

function renderAccessAdvice(dose, drug) {
  const a = drug.access;
  if (!a || !Number.isFinite(dose)) return;

  if (dose >= a.centralStronglyAbove) {
    addAlert("high", `Dosis alta: considerar acceso central (≥ ${a.centralStronglyAbove} mcg/kg/min).`);
  } else if (dose >= a.centralRecommendedAbove) {
    addAlert("warn", `Dosis en rango que sugiere acceso central (≥ ${a.centralRecommendedAbove} mcg/kg/min).`);
  } else {
    addAlert("info", `Por debajo del umbral de sugerir central (${a.centralRecommendedAbove} mcg/kg/min).`);
  }
}

function renderDrugWarnings(dose, drug) {
  (drug.warnings || []).forEach(w => {
    try {
      if (w.when({ dose })) addAlert(w.severity || "info", w.text);
    } catch {}
  });
}

function recalc() {
  const drug = DRUGS[$("drugSelect").value];
  const weight = num("weightKg");

  const prepTotalMcg = calc.toMicrograms(num("prepAmount"), $("prepUnit").value);
  const conc = calc.concentrationMcgPerMl(prepTotalMcg, num("prepVol"));
  $("concOut").textContent = conc ? `${round(conc, 2)} mcg/mL` : "—";

  const doseTarget = num("doseTarget");
  const mcgMinTarget = calc.doseToMcgPerMin(doseTarget, weight);
  const flowTargetMlMin = calc.mcgPerMinToFlowMlMin(mcgMinTarget, conc);
  const flowTargetMlH = flowTargetMlMin ? flowTargetMlMin * 60 : null;

  $("orderMainOut").textContent =
    flowTargetMlH != null ? `Bomba objetivo: ${round(flowTargetMlH, 2)} mL/h` : "—";

  $("orderEquivOut").textContent =
    (flowTargetMlMin != null && mcgMinTarget != null && conc != null)
      ? `${round(flowTargetMlMin, 3)} mL/min · ${round(mcgMinTarget, 2)} mcg/min · Conc: ${round(conc, 2)} mcg/mL`
      : "—";

  const pumpValue = num("pumpValue");
  const pumpUnit = $("pumpUnit").value;

  const mcgMinActual = calc.flowToMcgPerMin(pumpValue, pumpUnit, conc);
  const doseActual =
    (Number.isFinite(mcgMinActual) && Number.isFinite(weight) && weight > 0)
      ? (mcgMinActual / weight)
      : null;

  $("verifyMainOut").textContent =
    doseActual != null ? `Dosis real: ${round(doseActual, 3)} mcg/kg/min` : "—";

  const delta = (doseActual != null && Number.isFinite(doseTarget)) ? (doseActual - doseTarget) : null;
  $("verifyEquivOut").textContent =
    (doseActual != null && mcgMinActual != null)
      ? `${round(mcgMinActual, 2)} mcg/min · Δ vs objetivo: ${delta != null ? round(delta, 3) : "—"} mcg/kg/min`
      : "—";

  // Tarjeta clínica
  $("drugSummary").textContent = drug.summary;
  $("doseRanges").textContent = `Baja ${drug.doseRange.low} · Media ${drug.doseRange.mid} · Alta ${drug.doseRange.high}`;
  $("prepExample").textContent = `${drug.defaultPreparation.amount} ${drug.defaultPreparation.unit} en ${drug.defaultPreparation.volumeMl} mL`;

  // Alertas
  $("alerts").innerHTML = "";
  const doseForAdvice = (doseActual != null) ? doseActual : doseTarget;
  renderAccessAdvice(doseForAdvice, drug);
  renderDrugWarnings(doseForAdvice, drug);
}

function bindEvents() {
  $("drugSelect").addEventListener("change", () => {
    syncDrug();
    recalc();
  });

  ["weightKg", "prepAmount", "prepUnit", "prepVol", "doseTarget", "pumpValue", "pumpUnit"].forEach((id) => {
    $(id).addEventListener("input", recalc);
  });
}
