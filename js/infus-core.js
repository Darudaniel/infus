export function isFiniteNumber(x){
  return typeof x==="number" && Number.isFinite(x);
}
export function round(x,d=3){
  if(!isFiniteNumber(x)) return "—";
  const p=10**d; return Math.round(x*p)/p;
}
