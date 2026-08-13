import { DRUGS } from "./infus-rules.js";
import * as calc from "./infus-calc.js";
import { round } from "./infus-core.js";

const $ = id => document.getElementById(id);
const num = id => Number($(id).value);

document.addEventListener("DOMContentLoaded", () => {
  loadDrugs();
  bindEvents();
  recalc();
});

function loadDrugs(){
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

function syncDrug(){
  const drug = DRUGS[$("drugSelect").value];

  // Unidades permitidas de preparación
  const unitSel = $("prepUnit");
  unitSel.innerHTML = "";
  (drug.unitsAllowed || []).forEach(u=>{
    const o = document.createElement("option");
    o.value = u;
    o.textContent = u;
    unitSel.appendChild(o);
  });

  // Defaults
  $("prepAmount").value = drug.defaultPreparation.amount;
  $("prepVol").value = drug.defaultPreparation.volumeMl;

  // Dosis objetivo UI
  $("doseTargetLabel").textContent = `Dosis objetivo (${drug.doseUnit})`;
  $("doseTargetHint").textContent = drug.weightBased
    ? "Se interpreta como dosis por kg (requiere peso)."
    : "Se interpreta como dosis directa por minuto (no depende del peso).";

  // Ajuste de step por defecto (solo UX)
  $("doseTarget").step = String(drug.doseStep ?? (drug.baseUnit === "mUI" ? 1 : 0.01));
  if (!Number.isFinite(drug.defaultDose) && drug.baseUnit === "mUI" && Number($("doseTarget").value) < 1) {
    $("doseTarget").value = "20";
  }
  if (Number.isFinite(drug.defaultDose)) $("doseTarget").value = String(drug.defaultDose);
}

function addAlert(severity, text){
  const div = document.createElement("div");
  div.className = `alert ${severity}`;
  div.textContent = text;
  $("alerts").appendChild(div);
}

function renderAccessAdvice(dose, drug){
  if(!drug.access) return;
  if(!Number.isFinite(dose)) return;

  const a = drug.access;
  if(dose >= a.centralStronglyAbove){
    addAlert("high", `Dosis alta: considerar acceso central (≥ ${a.centralStronglyAbove} mcg/kg/min).`);
  } else if(dose >= a.centralRecommendedAbove){
    addAlert("warn", `Dosis en rango que sugiere acceso central (≥ ${a.centralRecommendedAbove} mcg/kg/min).`);
  }
}

function renderDrugWarnings(dose, drug){
  (drug.warnings || []).forEach(w=>{
    try{
      if(w.when({ dose })) addAlert(w.severity || "info", w.text);
    }catch{}
  });
}

function renderDrugReferences(drug){
  if(!Array.isArray(drug.references) || drug.references.length === 0) return;

  const section = document.createElement("div");
  section.className = "drug-references";

  const title = document.createElement("strong");
  title.textContent = "Fuentes clínicas";
  section.appendChild(title);

  const list = document.createElement("ul");
  drug.references.forEach(reference => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = reference.url;
    link.textContent = reference.label;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    item.appendChild(link);
    list.appendChild(item);
  });

  section.appendChild(list);
  $("alerts").appendChild(section);
}

function recalc(){
  const drug = DRUGS[$("drugSelect").value];
  const weight = num("weightKg");

  // Preparación -> concentración (base/mL)
  const totalBase = calc.toBaseUnits(num("prepAmount"), $("prepUnit").value);
  const concBase = calc.concentrationBasePerMl(totalBase, num("prepVol"));

  $("concOut").textContent = concBase
    ? `${round(concBase,2)} ${drug.baseUnit}/mL`
    : "—";

  // Objetivo -> bomba
  const doseTarget = num("doseTarget"); // (mcg/kg/min) o (mUI/min)
  const doseToBaseFactor = drug.doseToBaseFactor ?? 1;
  const targetBaseMin = calc.targetBasePerMin(doseTarget * doseToBaseFactor, weight, !!drug.weightBased);
  const flowMlMin = calc.basePerMinToFlowMlMin(targetBaseMin, concBase);
  const flowMlH = (flowMlMin != null) ? flowMlMin * 60 : null;

  $("orderMainOut").textContent =
    (flowMlH != null) ? `Bomba objetivo: ${round(flowMlH,2)} mL/h` : "—";

  $("orderEquivOut").textContent =
    (flowMlMin != null && targetBaseMin != null && concBase != null)
      ? `${round(flowMlMin,3)} mL/min · ${round(targetBaseMin,2)} ${drug.baseUnit}/min · Conc: ${round(concBase,2)} ${drug.baseUnit}/mL`
      : "—";

  // Bomba actual -> dosis real
  const pumpValue = num("pumpValue");
  const pumpUnit = $("pumpUnit").value;

  const actualBaseMin = calc.pumpToBasePerMin(
    pumpUnit === "unit_min" ? pumpValue * doseToBaseFactor : pumpValue,
    pumpUnit,
    concBase
  );

  let doseActual = null;
  if(actualBaseMin != null){
    const actualDoseInBaseUnits = drug.weightBased
      ? (weight > 0 ? actualBaseMin / weight : null)     // base/kg/min
      : actualBaseMin;                                   // base/min
    doseActual = actualDoseInBaseUnits == null
      ? null
      : actualDoseInBaseUnits / doseToBaseFactor;
  }

  $("verifyMainOut").textContent =
    (doseActual != null)
      ? `Dosis real: ${round(doseActual,3)} ${drug.doseUnit}`
      : "—";

  const delta = (doseActual != null && Number.isFinite(doseTarget)) ? (doseActual - doseTarget) : null;
  $("verifyEquivOut").textContent =
    (doseActual != null && actualBaseMin != null)
      ? `${round(actualBaseMin,2)} ${drug.baseUnit}/min · Δ vs objetivo: ${delta!=null ? round(delta,3) : "—"} ${drug.doseUnit}`
      : "—";

  // Tarjeta clínica
  $("drugSummary").textContent = drug.summary;
  $("doseRanges").textContent = `Baja ${drug.doseRange.low} · Media ${drug.doseRange.mid} · Alta ${drug.doseRange.high} (${drug.doseUnit})`;
  $("prepExample").textContent = `${drug.defaultPreparation.amount} ${drug.defaultPreparation.unit} en ${drug.defaultPreparation.volumeMl} mL`;

  // Alertas (usa dosis real si existe, si no usa objetivo)
  $("alerts").innerHTML = "";
  const doseForAlerts = (doseActual != null) ? doseActual : doseTarget;

  renderAccessAdvice(doseForAlerts, drug);
  renderDrugWarnings(doseForAlerts, drug);

  // Notas clínicas específicas (solo informativas)
  if(Array.isArray(drug.clinicalNotes)){
    drug.clinicalNotes.forEach(t => addAlert("info", t));
  }

  renderDrugReferences(drug);
}

function bindEvents(){
  $("drugSelect").addEventListener("change", () => {
    syncDrug();
    recalc();
  });

  ["weightKg","prepAmount","prepUnit","prepVol","doseTarget","pumpValue","pumpUnit"]
    .forEach(id => $(id).addEventListener("input", recalc));
}
