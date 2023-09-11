import React from 'react';
import classnames from 'classnames';
import { useMeasure } from 'react-use';
import icons from './icon.json';
import styles from './index.module.css';
interface Props {
  className?: string;
  style?: React.CSSProperties;
  icon?: string;
  imgWidth?: number | string | undefined;
  data: {
    name: string;
    value: string | number;
    unit?: string;
    time?: string | number;
  };
}
const Circle = (props: Props) => {
  const [imgRef, { width: w, height: h }] = useMeasure<any>();
  return (
    <div
      style={props.style}
      className={classnames(styles['circle'], props.className ?? '')}
    >
      <img
        style={{ width: props.imgWidth }}
        ref={imgRef ?? null}
        src={props.icon ?? icons.circle}
        alt=""
      />
      <div className={styles['info']} style={{ minWidth: w, top: h * 0.2 }}>
        <div className={styles['value']}>{props.data.value}</div>
        <div className={styles['unit']}>{props.data?.unit}</div>
        <div className={styles['name']}>{props.data.name}</div>
        <div className={styles['time']}>{props.data?.time}</div>
      </div>
    </div>
  );
};
export default Circle;
