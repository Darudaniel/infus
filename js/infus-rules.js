export const DRUGS = {

  norepinephrine: {
    label: "Norepinefrina",
    unitsAllowed: ["mg","mcg"],
    summary: "Vasopresor α1/β1. Primera línea en shock vasodilatado.",
    weightBased: true,
    doseUnit: "mcg/kg/min",
    baseUnit: "mcg",
    doseRange: { low: 0.02, mid: 0.10, high: 0.30 },
    defaultPreparation: { amount: 4, unit: "mg", volumeMl: 250 },
    access: { centralRecommendedAbove: 0.20, centralStronglyAbove: 0.30 },
    warnings: []
  },

  epinephrine: {
    label: "Adrenalina",
    unitsAllowed: ["mg","mcg"],
    summary: "Agonista α/β. Mayor riesgo de taquiarritmias y aumento de lactato.",
    weightBased: true,
    doseUnit: "mcg/kg/min",
    baseUnit: "mcg",
    doseRange: { low: 0.02, mid: 0.10, high: 0.30 },
    defaultPreparation: { amount: 4, unit: "mg", volumeMl: 250 },
    access: { centralRecommendedAbove: 0.20, centralStronglyAbove: 0.30 },
    warnings: []
  },

  oxytocin: {
    label: "Oxitocina",
    unitsAllowed: ["UI", "mUI"],
    summary: "Uterotónico para posparto/código obstétrico y conducción del trabajo de parto (según protocolo).",
    weightBased: false,          // ✅ NO es por kg en tu regla
    doseUnit: "mUI/min",
    baseUnit: "mUI",
    doseRange: { low: 5, mid: 10, high: 20 },

    // Default: conducción TDP
    defaultPreparation: { amount: 10, unit: "UI", volumeMl: 500 },

    access: null, // no aplica
    warnings: [
      { severity: "info", when: () => true, text: "Usar siempre según protocolo obstétrico institucional y respuesta clínica." }
    ],

    // Solo informativo (tu regla)
    clinicalNotes: [
      "Postparto (default): 30 UI en 500 mL SSN para pasar en 4 horas.",
      "Código obstétrico: 40 UI en 500 mL SSN para pasar en 30 minutos.",
      "Conducción TDP: 10 UI en 500 mL; objetivo hasta 20 mUI/min."
    ]
  }

};
