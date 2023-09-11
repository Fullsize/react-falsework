import React, { useEffect, useRef, useImperativeHandle } from 'react';
import classNames from 'classnames';
import white from '@/theme/echart/white.json';
import dark from '@/theme/echart/dark.json';
import _ from 'lodash';
import styles from './index.module.css';
import * as echarts from 'echarts';
type OPTIONTYPE = echarts.EChartsOption | undefined;
interface Props {
  className?: string;
  style?: React.CSSProperties;
  option: OPTIONTYPE;
}
const Echart = (props: Props, ref: React.Ref<unknown> | undefined) => {
  const echartRef = useRef<any>(null);
  // 获取实例
  const getInstance = () => echartRef.current;

  const init = () => {
    // 判断ref是否存在
    if (!echartRef.current) {
      return false;
    }
    console.log(dark);
    // 注册主题
    echarts.registerTheme('echart_theme', white);
    // 监测是否有echart示例,没有实例就创建
    let chart = echarts.getInstanceByDom(echartRef.current);
    if (!chart) {
      chart = echarts.init(echartRef.current, 'echart_theme');
    }
    // setOption
    setOption(chart);
    return;
  };
  const setOption = (chartObj: any) => {
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
  // 窗口自适应并开启过渡动画
  // useEffect(() => {
  //   window.addEventListener('resize', () => {
  //     if (echartRef.current) {
  //       echartRef.current.resize({
  //         animation: { duration: 300 },
  //       });
  //     }
  //   });
  //   return () => {
  //     window.removeEventListener('resize', () => {});
  //   };
  // }, []);
  // 监听echart容器和option变化
  useEffect(() => {
    init();
  }, [echartRef, props.option]);

  // 对父组件暴露获取ECharts实例的方法，可直接通过实例调用原生函数
  useImperativeHandle(ref, () => ({ getInstance }));
  return (
    <div
      ref={echartRef}
      className={classNames(styles['echart_a131e131'], props.className)}
      style={props.style}
    ></div>
  );
};
export default React.memo(React.forwardRef(Echart));
