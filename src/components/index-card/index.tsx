import React from 'react';
import classnames from 'classnames';
import icons from './icon.json';
import styles from './index.module.css';
import Circle from './circle';
interface Props {
  className?: string;
  style?: React.CSSProperties;
  icon?: string;
  data: {
    name: string;
    value: string | number;
    unit?: string;
  };
}
const IndexCard = (props: Props) => {
  return (
    <div
      style={props.style}
      className={classnames(styles['card'], props.className ?? '')}
    >
      <div className={styles['icon']}>
        <img src={props.icon ?? icons.card} alt="" />
      </div>
      <div className={styles['info']}>
        <div className={styles['name']}>{props.data.name}</div>
        <div className={styles['footer']}>
          <span className={styles['value']}>{props.data.value}</span>
          <span className={styles['unit']}>{props.data?.unit}</span>
        </div>
      </div>
    </div>
  );
};
IndexCard.Circle = Circle;
export default IndexCard;
