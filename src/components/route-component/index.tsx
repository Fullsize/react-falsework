/*
 * @Date: 2023-06-30 17:20:51
 * @LastEditors: Fullsize
 * @LastEditTime: 2023-12-14 16:43:11
 * @FilePath: /xinjiang-16-9/src/components/route-component/index.tsx
 * @Author: Fullsize
 */
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import routes from '@/routes';
const pages = import.meta.glob('../../pages/**/*.tsx');
const lazyComponent = (components?: string) => {
  const a = `../../pages/${components}/index.tsx`;
  const b = `../../pages/${components}.tsx`;
  let c = null;
  Object.entries(pages).map(([path, page]: any) => {
    if (path === a || path == b) {
      c = lazy(page);
    }
  });
  return c;
};

// console.log(13, pages);
const Page = () => {
  const renderRoute = (
    list?: {
      path: string;
      component?: string;
      to?: string;
      children?: { path: string; component?: string; to?: string }[];
    }[],
  ) => {
    const data = list ?? routes;
    return data.map(
      (item: {
        path: string;
        component?: string;
        to?: string;
        children?: { path: string; component?: string; to?: string }[];
      }) => {
        const Dashboard = lazyComponent(item.component);
        // const Dashboard = lazy(() => import(`../../pages/${item.component}`));
        if (item.children) {
          return (
            <Route
              key={item.path}
              path={item.path}
              element={
                item.to ? (
                  <Navigate to={item.to} />
                ) : (
                  <Suspense fallback={<>...</>}>
                    <Dashboard />
                  </Suspense>
                )
              }
            >
              {renderRoute(item.children)}
            </Route>
          );
        }

        return (
          <Route
            key={item.path}
            path={item.path}
            element={
              item.to ? (
                <Navigate to={item.to} />
              ) : (
                <Suspense fallback={<>...</>}>
                  <Dashboard />
                </Suspense>
              )
            }
          />
        );
      },
    );
  };
  return (
    <Routes>
      {renderRoute()}
      <Route path="*" element={<>暂无</>} />
    </Routes>
  );
};
export default Page;
