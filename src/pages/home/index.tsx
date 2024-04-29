import React, { useEffect } from 'react';
import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import { accurate } from '@/utils';
// import WithAuth from '@/hocs/withAuth';
// import bg from '@images/1.png';
import './index.css';
const Page = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(accurate(5.01, 2));
  }, []);
  return <div className={styles['constainer']}></div>;
};
export default Page;
