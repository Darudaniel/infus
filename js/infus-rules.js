export const DRUGS = {

  /* ======================
     VASOPRESORES / INÓTROPOS
     ====================== */

  norepinephrine: {
    label: "Norepinefrina",
    unitsAllowed: ["mg","mcg"],
    baseUnit: "mcg",
    weightBased: true,
    doseUnit: "mcg/kg/min",
    summary: "Vasopresor α1/β1. Primera línea en shock vasodilatado.",
    doseRange: { low: 0.02, mid: 0.10, high: 0.30 },
    defaultPreparation: { amount: 8, unit: "mg", volumeMl: 125 },
    access: { centralRecommendedAbove: 0.20, centralStronglyAbove: 0.30 },
    warnings: []
  },

  epinephrine: {
    label: "Adrenalina",
    unitsAllowed: ["mg","mcg"],
    baseUnit: "mcg",
    weightBased: true,
    doseUnit: "mcg/kg/min",
    summary: "Agonista α/β. Riesgo de taquiarritmias y aumento de lactato.",
    doseRange: { low: 0.02, mid: 0.10, high: 0.30 },
    defaultPreparation: { amount: 4, unit: "mg", volumeMl: 250 },
    access: { centralRecommendedAbove: 0.20, centralStronglyAbove: 0.30 },
    warnings: []
  },

  dobutamine: {
    label: "Dobutamina",
    unitsAllowed: ["mg"],
    baseUnit: "mcg",
    weightBased: true,
    doseUnit: "mcg/kg/min",
    summary: "Inótropo β1. Útil en bajo gasto con presión adecuada.",
    doseRange: { low: 2, mid: 5, high: 20 },
    defaultPreparation: { amount: 250, unit: "mg", volumeMl: 250 },
    access: null,
    warnings: [
      { severity: "warn", when: ({dose}) => dose > 10, text: "Dosis altas aumentan riesgo de taquiarritmias." }
    ]
  },

  dopamine: {
    label: "Dopamina",
    unitsAllowed: ["mg"],
    baseUnit: "mcg",
    weightBased: true,
    doseUnit: "mcg/kg/min",
    summary: "No recomendada de rutina por mayor riesgo de arritmias.",
    doseRange: { low: 2, mid: 5, high: 20 },
    defaultPreparation: { amount: 400, unit: "mg", volumeMl: 250 },
    access: null,
    warnings: [
      { severity: "high", when: () => true, text: "Evitar dopamina si hay alternativas." }
    ]
  },

  /* ======================
     SEDANTES / ANALGÉSICOS
     ====================== */

  midazolam: {
    label: "Midazolam",
    unitsAllowed: ["mg"],
    baseUnit: "mcg",
    weightBased: true,
    doseUnit: "mcg/kg/h",
    summary: "Benzodiacepina para sedación continua.",
    doseRange: { low: 20, mid: 50, high: 200 },
    defaultPreparation: { amount: 100, unit: "mg", volumeMl: 100 },
    access: null,
    warnings: []
  },

  fentanyl: {
    label: "Fentanilo",
    unitsAllowed: ["mcg"],
    baseUnit: "mcg",
    weightBased: true,
    doseUnit: "mcg/kg/h",
    summary: "Opioide potente para analgesia/sedación.",
    doseRange: { low: 0.5, mid: 1, high: 5 },
    defaultPreparation: { amount: 2500, unit: "mcg", volumeMl: 50 },
    access: null,
    warnings: []
  },

  remifentanil: {
    label: "Remifentanilo",
    unitsAllowed: ["mg"],
    baseUnit: "mcg",
    weightBased: true,
    doseUnit: "mcg/kg/min",
    summary: "Opioide ultracorto. Requiere bomba dedicada.",
    doseRange: { low: 0.05, mid: 0.1, high: 0.5 },
    defaultPreparation: { amount: 2, unit: "mg", volumeMl: 50 },
    access: null,
    warnings: []
  },

  dexmedetomidine: {
    label: "Dexmedetomidina",
    unitsAllowed: ["mcg"],
    baseUnit: "mcg",
    weightBased: true,
    doseUnit: "mcg/kg/h",
    summary: "Agonista α2. Sedación cooperativa.",
    doseRange: { low: 0.2, mid: 0.5, high: 1.5 },
    defaultPreparation: { amount: 200, unit: "mcg", volumeMl: 50 },
    access: null,
    warnings: [
      { severity: "warn", when: ({dose}) => dose > 1, text: "Riesgo de bradicardia e hipotensión." }
    ]
  },

  ketamine: {
    label: "Ketamina",
    unitsAllowed: ["mg"],
    baseUnit: "mcg",
    weightBased: true,
    doseUnit: "mg/kg/h",
    summary: "Analgosedación. Útil en shock.",
    doseRange: { low: 0.5, mid: 1, high: 3 },
    defaultPreparation: { amount: 500, unit: "mg", volumeMl: 250 },
    access: null,
    warnings: []
  },

  /* ======================
     BLOQUEADORES NEUROMUSCULARES
     ====================== */

  rocuronium: {
    label: "Rocuronio",
    unitsAllowed: ["mg"],
    baseUnit: "mcg",
    weightBased: true,
    doseUnit: "mcg/kg/min",
    summary: "Bloqueador neuromuscular no despolarizante.",
    doseRange: { low: 5, mid: 10, high: 20 },
    defaultPreparation: { amount: 100, unit: "mg", volumeMl: 100 },
    access: null,
    warnings: [
      { severity: "high", when: () => true, text: "Usar solo con sedación adecuada y monitoreo." }
    ]
  },

  cisatracurium: {
    label: "Cisatracurio",
    unitsAllowed: ["mg"],
    baseUnit: "mcg",
    weightBased: true,
    doseUnit: "mcg/kg/min",
    summary: "Bloqueador neuromuscular. Útil en SDRA.",
    doseRange: { low: 1, mid: 3, high: 10 },
    defaultPreparation: { amount: 150, unit: "mg", volumeMl: 150 },
    access: null,
    warnings: [
      { severity: "high", when: () => true, text: "Requiere sedación profunda y monitoreo TOF." }
    ]
  },

  /* ======================
     OBSTETRICIA
     ====================== */

  oxytocin: {
    label: "Oxitocina",
    unitsAllowed: ["UI","mUI"],
    baseUnit: "mUI",
    weightBased: false,
    doseUnit: "mUI/min",
    summary: "Uterotónico para posparto y conducción del trabajo de parto.",
    doseRange: { low: 5, mid: 10, high: 20 },
    defaultPreparation: { amount: 10, unit: "UI", volumeMl: 500 },
    access: null,
    warnings: [
      { severity: "info", when: () => true, text: "Ajustar siempre según protocolo obstétrico institucional." }
    ],
    clinicalNotes: [
      "Postparto: 30 UI en 500 mL en 4 h.",
      "Código obstétrico: 40 UI en 500 mL en 30 min.",
      "Conducción: 10 UI en 500 mL, titular hasta 20 mUI/min."
    ]
  }

};
