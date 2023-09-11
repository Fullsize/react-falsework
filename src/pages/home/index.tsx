import React from 'react';
import EchartBar from '@/components/echart-bar';
import styles from './index.module.css';
// import bg from "@images/1.png";
import './index.css';
const Page = () => {
  return (
    <div className={styles['constainer']}>
      <div style={{ width: 300, height: 180 }}>
        <EchartBar
          data={[
            {
              time_name: '2020Q2',
              val: 2661.15,

              index_code_full_cname: '增长值',
              unit_name: '亿元',

              type: 'bar',
            },
            {
              time_name: '2020Q2',
              val: 0.7,

              index_code_full_cname: '增涨速度',
              unit_name: '%',

              type: 'line',
            },
            {
              time_name: '2020Q3',
              val: 4143.97,
              index_code_full_cname: '增长值',
              unit_name: '亿元',
              type: 'bar',
            },
            {
              time_name: '2020Q3',
              val: 1.4,
              index_code_full_cname: '增涨速度',
              unit_name: '%',
              type: 'line',
            },
            {
              time_name: '2020Q4',
              val: 6000.66,
              index_code_full_cname: '增长值',
              unit_name: '亿元',
              type: 'bar',
            },
            {
              time_name: '2020Q4',
              val: 3.3,
              index_code_full_cname: '增涨速度',
              unit_name: '%',
              type: 'line',
            },
            {
              time_name: '2021Q1',
              val: 1434.49,
              index_code_full_cname: '增长值',
              unit_name: '亿元',
              type: 'bar',
            },
            {
              time_name: '2021Q1',
              val: 17.4,
              index_code_full_cname: '增涨速度',
              unit_name: '%',
              type: 'line',
            },
            {
              time_name: '2021Q2',
              val: 3188.61,
              index_code_full_cname: '增长值',
              unit_name: '亿元',
              type: 'bar',
            },
            {
              time_name: '2021Q2',
              val: 13.7,
              index_code_full_cname: '增涨速度',
              unit_name: '%',
              type: 'line',
            },
            {
              time_name: '2021Q3',
              val: 4900.95,
              index_code_full_cname: '增长值',
              unit_name: '亿元',
              type: 'bar',
            },
            {
              time_name: '2021Q3',
              val: 11.4,
              index_code_full_cname: '增涨速度',
              unit_name: '%',
              type: 'line',
            },
            {
              time_name: '2021Q4',
              val: 6795.26,

              index_code_full_cname: '增长值',
              unit_name: '亿元',

              type: 'bar',
            },
            {
              time_name: '2021Q4',
              val: 8.7,
              index_code_full_cname: '增涨速度',
              unit_name: '%',
              type: 'line',
            },
            {
              time_name: '2022Q1',
              val: 1609.64,
              index_code_full_cname: '增长值',
              unit_name: '亿元',
              type: 'bar',
            },
            {
              time_name: '2022Q1',
              val: 5.3,
              index_code_full_cname: '增涨速度',
              unit_name: '%',
              type: 'line',
            },
            {
              time_name: '2022Q2',
              val: 3360.14,
              index_code_full_cname: '增长值',
              unit_name: '亿元',
              type: 'bar',
            },
            {
              time_name: '2022Q2',
              val: 3.2,
              index_code_full_cname: '增涨速度',
              unit_name: '%',
              type: 'line',
            },
            {
              time_name: '2022Q3',
              val: 5236.13,
              index_code_full_cname: '增长值',
              unit_name: '亿元',
              type: 'bar',
            },
            {
              time_name: '2022Q3',
              val: 4.3,
              index_code_full_cname: '增涨速度',
              unit_name: '%',
              type: 'line',
            },
            {
              time_name: '2022Q4',
              val: 7350.55,
              index_code_full_cname: '增长值',
              unit_name: '亿元',
              type: 'bar',
            },
            {
              time_name: '2022Q4',
              val: 4.4,
              index_code_full_cname: '增涨速度',
              unit_name: '%',
              type: 'line',
            },
            {
              time_name: '2023Q1',
              val: 1738.76,
              index_code_full_cname: '增长值',
              unit_name: '亿元',
              type: 'bar',
            },
            {
              time_name: '2023Q1',
              val: 6.1,
              index_code_full_cname: '增涨速度',
              unit_name: '%',
              type: 'line',
            },
            {
              time_name: '2023Q2',
              val: 3621.93,
              index_code_full_cname: '增长值',
              unit_name: '亿元',
              type: 'bar',
            },
            {
              time_name: '2023Q2',
              val: 7.9,
              index_code_full_cname: '增涨速度',
              unit_name: '%',
              type: 'line',
            },
          ]}
        />
      </div>
    </div>
  );
};
export default Page;
