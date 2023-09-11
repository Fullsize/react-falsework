import React from 'react';
import Echart from '@/components/echart';
import styles from './index.module.css';
// import bg from "@images/1.png";
import './index.css';
const Page = () => {
  return (
    <div className={styles['constainer']}>
      <div style={{ width: 300, height: 180 }}>
        <Echart option={{}} />
      </div>
    </div>
  );
};
export default Page;
