import React, { useEffect } from 'react';
import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import Outlet from '@/pages/outlet';
import { accurate } from '@/utils';
// import WithAuth from '@/hocs/withAuth';
// import bg from '@images/1.png';
import './index.css';
const Page = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(accurate(5.01, 2));
  }, []);
  return (
    <div className={styles['constainer']}>
      <div className="name">home</div>
      <div className={styles['name']}>home</div>
      <button onClick={() => navigate('/abc')}>a</button>
      {/* <img src={bg} alt="" /> */}
      <Outlet></Outlet>
    </div>
  );
};
export default Page;
