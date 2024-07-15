import React, { useEffect } from 'react';
import { useSetState } from 'react-use';
import Routes from '@/components/route-component';
import styles from './index.module.css';
import autosize from '@/utils/autosize';

const Page = () => {
  useEffect(() => {
    autosize.init({
      el: '#app',
    });
  }, []);
  return (
    <div className={styles['main']}>
      <Routes />
    </div>
  );
};
export default Page;
