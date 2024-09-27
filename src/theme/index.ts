import { createContext, useState } from 'react';
import EWhite from './echarts/white.json';
import EDark from './echarts/dark.json';
// 默认值
export const defaultTheme: 'light' | 'dark' = 'light';
//创建context
const ThemeContext = createContext<any>(null);
//导出
export default ThemeContext;
// echarts 主题
export const EchartTheme: any = {
  light: EWhite,
  dark: EDark,
};
