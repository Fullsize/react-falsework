/*
 * @Date: 2023-06-30 17:20:51
 * @LastEditors: Fullsize
 * @LastEditTime: 2024-01-08 17:51:34
 * @FilePath: /react-falsework/src/components/route-component/index.tsx
 * @Author: Fullsize
 */
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import routes from '@/routes';
import _ from 'lodash';
const pages = import.meta.glob('../../pages/**/*.tsx');
type ROUTEITEM = {
  path: string;
  component?: string;
  to?: string;
  hoc?: any;
  children?: { path: string; component?: string; to?: string }[];
};
const lazyComponent = (components?: string) => {
  const a = `../../pages/${components}/index.tsx`;
  const b = `../../pages/${components}.tsx`;
  let c: any = null;
  Object.entries(pages).map(([path, page]: any) => {
    if (path === a || path == b) {
      c = lazy(page);
    }
  });
  return c;
};

// console.log(13, pages);
const Page = () => {
  const renderRoute = (list?: ROUTEITEM[]) => {
    const data = list ?? routes;
    return data.map((item: ROUTEITEM) => {
      const Dashboard = lazyComponent(item.component);
      return (
        <Route
          key={item.path}
          path={item.path}
          element={
            item.to ? (
              <Navigate to={item.to} />
            ) : (
              <>
                <Suspense fallback={<>...</>}>
                  <Dashboard />
                </Suspense>
              </>
            )
          }
        >
          {_.isEmpty(item.children) ? <></> : renderRoute(item.children)}
        </Route>
      );
    });
  };
  return (
    <Routes>
      {renderRoute()}
      <Route path="*" element={<>暂无</>} />
    </Routes>
  );
};
export default Page;
