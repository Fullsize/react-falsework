import { createContext, useState } from 'react';
import EWhite from './echarts/white.json';
import EDark from './echarts/dark.json';
import AWhite from './antd/white';
import ADark from './antd/dark';
// 默认值
export const defaultTheme: 'light' | 'dark' = 'light';
//创建context
const ThemeContext = createContext<any>(null);
//导出
export default ThemeContext;
// echarts 主题
export const EchartTheme = {
  light: EWhite,
  dark: EDark,
};

// antd 主题
export const AntdTheme = {
  light: AWhite,
  dark: ADark,
};
