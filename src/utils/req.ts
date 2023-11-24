import request from '@/service/request';
import { to } from '@/utils/to';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

/**请求封装  */
export const req = async (
  config: AxiosRequestConfig,
  callback?: (
    succces: AxiosResponse<any, any> | undefined,
    error: Error | null,
  ) => void,
) => {
  const [err, res] = await to(
    request({ ...config, method: config.method ?? 'post' }),
  );
  callback?.(res, err);
  return [err, res];
};

/** 拆包  */
export const wrapperedReq = async (
  config: AxiosRequestConfig,
  callback?: (
    succces: AxiosResponse<any, any> | undefined,
    error: Error | null,
  ) => void,
) => {
  const [err, res] = await to(
    request({ ...config, method: config.method ?? 'post' }),
  );
  callback?.(res?.data, err);
  return [err, res?.data];
};

export default req;
