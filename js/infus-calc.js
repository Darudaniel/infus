// Convierte distintas unidades a una "unidad base" pequeña:
// mg -> mcg
// mcg -> mcg
// UI -> mUI
// mUI -> mUI
export function toBaseUnits(amount, unit){
  if(unit === "mg") return amount * 1000;
  if(unit === "mcg") return amount;
  if(unit === "UI") return amount * 1000;
  if(unit === "mUI") return amount;
  return null;
}

// Concentración en (unidad base / mL)
export function concentrationBasePerMl(totalBase, volumeMl){
  if(totalBase == null || volumeMl == null) return null;
  if(volumeMl <= 0) return null;
  return totalBase / volumeMl;
}

// Dosis objetivo -> unidades base por minuto
// Si weightBased: inputDose = (base/kg/min)
// Si no: inputDose = (base/min)
export function targetBasePerMin(inputDose, weightKg, weightBased){
  if(inputDose == null) return null;
  if(weightBased){
    if(weightKg == null || weightKg <= 0) return null;
    return inputDose * weightKg;
  }
  return inputDose;
}

// (base/min) + (base/mL) -> mL/min
export function basePerMinToFlowMlMin(basePerMin, concBasePerMl){
  if(basePerMin == null || concBasePerMl == null) return null;
  if(concBasePerMl <= 0) return null;
  return basePerMin / concBasePerMl;
}

// Convierte lo que muestra la bomba a (base/min)
export function pumpToBasePerMin(value, unit, concBasePerMl){
  if(value == null || value < 0) return null;

  if(unit === "unit_min") return value; // ya viene en base/min

  if(concBasePerMl == null || concBasePerMl <= 0) return null;
  if(unit === "ml_h") return (value/60) * concBasePerMl;
  if(unit === "ml_min") return value * concBasePerMl;

  return null;
}
