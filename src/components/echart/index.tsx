import React, { useEffect, useRef, useImperativeHandle } from 'react';
import white from '@/theme/echart/white.json';
import _ from 'lodash';

import * as echarts from 'echarts';
type OPTIONTYPE = echarts.EChartsOption | undefined;
interface Props {
  className?: string;
  style?: React.CSSProperties;
  option: OPTIONTYPE;
  getEchartObj?: (echart: any) => void;
}
const Echart = (props: Props, ref: React.Ref<unknown> | undefined) => {
  const echartRef = useRef(null);
  // 获取实例
  const getInstance = () => echartRef.current;
  const setOption = (chartObj: any) => {
    if (!chartObj) {
      return;
    }
    chartObj.resize();
    // option 为空
    if (_.isEmpty(props.option)) {
      chartObj.setOption({
        title: {
          text: '暂无数据',
          x: 'center',
          y: 'center',
        },
      });
      return;
    }
    console.log('echart option', _.isEmpty(props.option), props.option);
    chartObj.setOption(props.option, true);
  };
  const init = () => {
    // 判断ref是否存在
    if (!echartRef.current) {
      return false;
    }
    // 注册主题
    echarts.registerTheme('echart_theme', white);
    // 监测是否有echart示例
    let chart = echarts.getInstanceByDom(echartRef.current);
    if (!chart) {
      chart = echarts.init(echartRef.current, 'echart_theme');
    }
    props.getEchartObj?.(chart);
    setOption(chart);
    return;
  };
  // 监听echart容器和option变化
  useEffect(() => {
    init();
  }, [echartRef, props.option]);
  // 对父组件暴露获取ECharts实例的方法，可直接通过实例调用原生函数
  useImperativeHandle(ref, () => ({ getInstance }));
  return <div ref={echartRef} style={{ width: '100%', height: '100%' }}></div>;
};
export default React.memo(React.forwardRef(Echart));
