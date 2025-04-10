// 1. 实现一个 PromiseValue 类型, 用于获取 Promise 的返回值类型

// type A = PromiseValue<Promise<string>>; // string
// type B = PromiseValue<Promise<number>>; // number
// type C = PromiseValue<boolean>; // boolean (非 Promise 直接返回)
// type D = PromiseValue<Promise<Promise<boolean>>>; // Promise<boolean>
// type PromiseValue<T> = T extends Promise<infer R> ? R : T
// 2. 实现一个深拷贝函数
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
