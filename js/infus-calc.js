export function toMicrograms(a,u){
  if(u==="mg") return a*1000;
  if(u==="mcg") return a;
  return null;
}

export function concentrationMcgPerMl(t,v){
  if(!t || !v) return null;
  if(v<=0) return null;
  return t/v;
}

export function doseToMcgPerMin(d,w){
  if(!d || !w) return null;
  if(w<=0) return null;
  return d*w;
}

export function mcgPerMinToFlowMlMin(m,c){
  if(!m || !c) return null;
  if(c<=0) return null;
  return m/c;
}

export function flowToMcgPerMin(value, unit, conc){
  if(value==null) return null;
  if(value<0) return null;

  if(unit==="mcg_min") return value;

  if(!conc || conc<=0) return null;
  if(unit==="ml_h") return (value/60)*conc;
  if(unit==="ml_min") return value*conc;

  return null;
}
