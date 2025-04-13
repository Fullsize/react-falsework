export default function deepClone(obj: any) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  const cObj: any = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      cObj[key] = deepClone(obj[key]);
    }
  }
  return cObj;
}
