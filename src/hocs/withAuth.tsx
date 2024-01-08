/* eslint-disable react/display-name */
import React from 'react';
import { userToken } from '@/utils/user';
import { Navigate } from 'react-router-dom';
const WithAuth = (Component: any) => () => {
  const isLogin = userToken.get();
  if (isLogin) {
    return <Component />;
  } else {
    return <Navigate to="/login" />;
  }
};
export default WithAuth;
