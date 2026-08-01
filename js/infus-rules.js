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
     VASODILATADORES
     ====================== */

  nitroglycerin: {
    label: "Nitroglicerina",
    unitsAllowed: ["mg","mcg"],
    baseUnit: "mcg",
    weightBased: false,
    doseUnit: "mcg/min",
    summary: "Vasodilatador venoso y coronario. Titular según respuesta clínica y hemodinámica.",
    defaultDose: 5,
    doseRange: { low: 5, mid: 20, high: 200 },
    defaultPreparation: { amount: 50, unit: "mg", volumeMl: 250 },
    access: null,
    warnings: [
      { severity: "warn", when: ({dose}) => dose >= 200, text: "Dosis elevada: vigilar estrechamente hipotensión y respuesta hemodinámica." },
      { severity: "high", when: () => true, text: "Contraindicada con inhibidores de PDE-5 (p. ej., sildenafil, tadalafil o vardenafil) y riociguat por riesgo de hipotensión grave." },
      { severity: "info", when: () => true, text: "Administrar con bomba y equipo de infusión no adsorbente; monitorizar presión arterial y frecuencia cardiaca." }
    ],
    clinicalNotes: [
      "Inicio habitual: 5 mcg/min; aumentar 5 mcg/min cada 3–5 min hasta 20 mcg/min y luego en incrementos de 10–20 mcg/min según respuesta."
    ]
  },

  sodiumNitroprusside: {
    label: "Nitroprusiato de sodio",
    unitsAllowed: ["mg","mcg"],
    baseUnit: "mcg",
    weightBased: true,
    doseUnit: "mcg/kg/min",
    summary: "Vasodilatador arterial y venoso de acción rápida para control hemodinámico estrecho.",
    defaultDose: 0.3,
    doseRange: { low: 0.3, mid: 3, high: 10 },
    defaultPreparation: { amount: 50, unit: "mg", volumeMl: 250 },
    access: null,
    warnings: [
      { severity: "high", when: ({dose}) => dose >= 10, text: "Máximo recomendado: 10 mcg/kg/min. No mantener esta velocidad por más de 10 minutos; suspender si no se logra control." },
      { severity: "warn", when: ({dose}) => dose >= 3, text: "Dosis altas o prolongadas aumentan el riesgo de toxicidad por cianuro y tiocianato." },
      { severity: "high", when: () => true, text: "Requiere monitorización continua de presión arterial y administración mediante bomba volumétrica." },
      { severity: "info", when: () => true, text: "Proteger la solución de la luz; no usar si presenta color azul, verde o rojo, ni si contiene partículas." }
    ],
    clinicalNotes: [
      "Inicio: 0.3 mcg/kg/min; titular cada pocos minutos según respuesta.",
      "Si eGFR < 30 mL/min/1.73 m², limitar la velocidad media a < 3 mcg/kg/min; en anuria, a 1 mcg/kg/min."
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
