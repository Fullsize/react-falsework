/* eslint-disable react/display-name */
import React from 'react';
import { userToken } from '@/utils/user';
import { Navigate } from 'react-router-dom';
const WithAuth = (Component: any) => () => {
  const isLogin = userToken.get();
  console.log(7);
  // if (isLogin) {
  //   return <Component />;
  // } else {
  //   return <Navigate to="/login" />;
  // }
  return <Component />;
};
export default WithAuth;
