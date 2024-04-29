import { floor } from 'lodash-es';
import qs from 'qs';
import Decimal from 'decimal.js';
/**
 * @description: px to vw = 100vw/设计图宽度*指定px
 * @param {number} px 宽度px
 * @return {*}
 */
export const px2vw = (px: number) => `${floor((100 / 1920) * px)}vw`;
export const deconstruction = (
  data: any[],
  deconstructionJSON: { [x: string]: any },
) => {
  return data.map((item: { [x: string]: any }) => {
    const json: any = {};
    for (const i in deconstructionJSON) {
      if (Array.isArray(deconstructionJSON[i])) {
        const arr: any = [];
        deconstructionJSON[i].map((a: any) => {
          arr.push(item[a] ?? a);
        });
        json[i] = arr;
      } else {
        json[i] = item[deconstructionJSON[i]] ?? deconstructionJSON[i];
      }

      json['originData'] = item;
    }
    return json;
  });
};

/**
 * @description: 修改地址栏参数
 * @param {string} name key
 * @param {any} val 数值
 * @param {any} href 地址
 * @return {*}
 */
export function changeURLArg(name?: string, val?: any, href?: any) {
  const url = href || window.location.href;
  const pattern = name + '=([^&]*)';
  const replaceText = name + '=' + val;
  if (!name) {
    return url;
  }
  if (url.match(pattern)) {
    let tmp = '/(' + name + '=)([^&]*)/gi';
    tmp = url.replace(eval(tmp), replaceText);
    return tmp;
  }
  if (url.match('[?]')) {
    return `${url}&${replaceText}`;
  }
  return `${url}?${replaceText}`;
  return url + '\n' + name + '\n' + val;
}
/**
 * @description: 获取query参数
 * @param {string} search 地址栏参数
 * @return {*}
 */
export const getQueryString = (search?: string) => {
  search =
    search ||
    window.location.search.substring(1) ||
    window.location.hash.split('?')[1];
  return qs.parse(search);
};
/**
 * @description: 获取物理分辨率
 * @param {*} containRatio 是否获取
 * @param {*} baseWidth 物理分辨率(px)
 * @return {*}
 */
export const getScale = (containRatio = true, baseWidth = 1920) => {
  const currentScale = document.documentElement.clientWidth / baseWidth;
  const formattedScale = currentScale > 1 ? currentScale : 1;
  const resultScale = containRatio
    ? formattedScale * window.devicePixelRatio
    : formattedScale;
  return Math.ceil(resultScale);
};
/**
 * @description: 精度转换方法
 * @param {number} num 需要转换的数值
 * @param {*} precision 保留精度位数
 * @return {*}
 */
export const accurate = (num: number, precision = 2) => {
  const decimalNum = new Decimal(num);
  const strippedNum = decimalNum.toDecimalPlaces(precision);
  return +strippedNum.toString();
};
