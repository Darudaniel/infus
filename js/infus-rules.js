// ✅ Todo lo “clínico” y configurable vive aquí.
// Agregar fármacos = agregar entradas a DRUGS. Nada más.

export const DRUGS = {
  norepinephrine: {
    label: "Norepinefrina",
    unitsAllowed: ["mg", "mcg"],
    summary: "Vasopresor α1/β1. Primera línea en shock vasodilatado.",
    doseUnit: "mcg/kg/min", // por ahora todos iguales en este MVP
    doseRange: { low: 0.02, mid: 0.10, high: 0.30, typicalMax: 0.30, veryHigh: 0.50 },
    defaultPreparation: { amount: 8, unit: "mg", volumeMl: 125, note: "Ejemplo estándar" },

    // Umbrales para aviso de acceso central (editables por fármaco)
    access: { centralRecommendedAbove: 0.20, centralStronglyAbove: 0.30 },

    // Alertas opcionales “clínicas” basadas en dosis (mcg/kg/min)
    warnings: [
      {
        severity: "warn",
        when: ({ dose }) => dose >= 0.30,
        text: "Dosis alta de norepinefrina: reevaluar causa de shock y perfusión."
      }
    ]
  },

  epinephrine: {
    label: "Adrenalina",
    unitsAllowed: ["mg", "mcg"],
    summary: "Agonista α/β. Mayor riesgo de taquiarritmias y lactato.",
    doseUnit: "mcg/kg/min",
    doseRange: { low: 0.02, mid: 0.10, high: 0.30, typicalMax: 0.30, veryHigh: 0.50 },
    defaultPreparation: { amount: 4, unit: "mg", volumeMl: 250, note: "Ejemplo estándar" },
    access: { centralRecommendedAbove: 0.20, centralStronglyAbove: 0.30 },
    warnings: [
      {
        severity: "warn",
        when: ({ dose }) => dose >= 0.30,
        text: "Dosis alta de adrenalina: vigilar taquiarritmias y perfusión."
      }
    ]
  }

  // ✅ Para agregar otro fármaco:
  // 1) copia un bloque como los de arriba
  // 2) cambia: label, summary, doseRange, defaultPreparation, access, warnings
};
