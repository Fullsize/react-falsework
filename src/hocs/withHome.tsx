/* eslint-disable react/display-name */
import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
const WithHome = (Component: any) => () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex flex-col overflow-hidden gap-[20px]">
      <Button className="w-max" onClick={() => navigate('/')}>
        返回首页
      </Button>
      <div className="flex-1">
        <Component />
      </div>
    </div>
  );
};
export default WithHome;
