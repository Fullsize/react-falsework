import React, { useEffect, useState, useContext } from 'react';
import * as echarts from 'echarts';
import ThemeContext, { EchartTheme } from '@/theme';
interface Props {
  style?: React.CSSProperties;
  className?: string;
  options?: echarts.EChartsOption;
}
const Echarts = (props: Props) => {
  const { theme } = useContext<{ theme: 'light' | 'dark' }>(ThemeContext);
  const [element, ref] = useState<any>(null);
  const [chatRef, setchatRef] = useState<echarts.ECharts | null>(null);

  useEffect(() => {
    if (element) {
      const obj = EchartTheme[theme];
      echarts.registerTheme(theme, obj);
      const chat = echarts.init(element, theme);
      setchatRef(chat);
      chat.setOption(props.options ?? {});
    }
    return () => {
      chatRef?.dispose();
    };
  }, [element, theme]);
  useEffect(() => {
    if (chatRef) {
      chatRef?.setOption(props?.options ?? {});
    }
  }, [props.options]);
  return (
    <div
      className={props.className}
      ref={ref}
      style={{ width: '100%', height: '100%', ...props.style }}
    />
  );
};

export default Echarts;
