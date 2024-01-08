import React from 'react';
import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import Outlet from '@/pages/outlet';
// import WithAuth from '@/hocs/withAuth';
// import bg from '@images/1.png';
import './index.css';
const Page = () => {
  const navigate = useNavigate();
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
