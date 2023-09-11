import React from 'react';
import Echart from '@/components/echart';
import styles from './index.module.css';
// import bg from "@images/1.png";
import './index.css';
const Page = () => {
  return (
    <div className={styles['constainer']}>
      <div style={{ width: 300, height: 180 }}>
        <Echart
          option={{
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            yAxis: {
              type: 'value',
            },
            series: [
              {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line',
              },
            ],
          }}
        />
      </div>
    </div>
  );
};
export default Page;
