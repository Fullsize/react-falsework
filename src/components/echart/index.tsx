import React, { useEffect, useRef, useState } from 'react';
import { useMeasure } from 'react-use';
import white from '@/theme/echart/white.json';
import _ from 'lodash';

import * as ehcart from 'echarts';
type OPTIONTYPE = ehcart.EChartsOption | undefined;
interface Props {
  className?: string;
  style?: React.CSSProperties;
  option: OPTIONTYPE;
  getEchartObj?: (echart: any) => void;
}
const Echart = (props: Props) => {
  const [constainerRef, { width: w, height: h }] = useMeasure<any>();
  const [echartObj, setEchartObj] = useState<any>(null);
  const echartRef = useRef(null);
  const init = () => {
    // 判断ref是否存在
    if (!echartRef.current) {
      return false;
    }
    // echart初始化
    ehcart.registerTheme('echart_theme', white);
    const chart = ehcart.init(echartRef.current, 'echart_theme');
    props.getEchartObj?.(chart);
    setEchartObj(chart);
    return;
  };
  // 初始化 即父级宽高确认后再初始化
  useEffect(() => {
    init();
  }, [w, h]);
  // option 更新
  useEffect(() => {
    setOption(props.option);
  }, [props.option, echartObj]);
  const setOption = (option: OPTIONTYPE) => {
    if (!echartObj) {
      return;
    }

    // option 为空
    if (_.isEmpty(option)) {
      echartObj.setOption({
        title: {
          text: '暂无数据',
          x: 'center',
          y: 'center',
        },
      });
      return;
    }
    console.log('echart option', _.isEmpty(option), option);
    echartObj.setOption(option, true);
  };
  return (
    <div
      className={props.className}
      style={{
        height: '100%',
        width: '100%',
        position: 'relative',
        ...props.style,
      }}
      ref={constainerRef}
    >
      <div ref={echartRef} style={{ width: w, height: h }}></div>
    </div>
  );
};
export default Echart;
