/* @vite-ignore */
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import routes from '@/routes';

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
        const Dashboard = lazy(
          () => import(`../../pages/${item.component}/index.tsx`),
        );
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
