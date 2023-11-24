import { floor } from 'lodash';
import qs from 'qs';
// px to vw = 100vw/设计图宽度*指定px
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

// 修改 url 里面的指定参数
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

export const getQueryString = (search?: string) => {
  search =
    search ||
    window.location.search.substring(1) ||
    window.location.hash.split('?')[1];
  return qs.parse(search);
};

export const getScale = (containRatio = true, baseWidth = 1920) => {
  const currentScale = document.documentElement.clientWidth / baseWidth;
  const formattedScale = currentScale > 1 ? currentScale : 1;
  const resultScale = containRatio
    ? formattedScale * window.devicePixelRatio
    : formattedScale;
  return Math.ceil(resultScale);
};
