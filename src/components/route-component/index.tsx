import React, { lazy, Suspense, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import routes from '@/routes';
const pages = import.meta.glob('../../pages/**/*.tsx');
type HOC = (component: React.ComponentType<any>) => React.ComponentType<any>;
type ROUTEITEM = {
  path: string;
  component?: string;
  to?: string;
  hoc?: HOC[];
  children?: ROUTEITEM[];
};
import _ from 'lodash-es';
const lazyComponent = (components?: string) => {
  const possiblePaths = [
    `../../pages/${components}/index.tsx`,
    `../../pages/${components}.tsx`,
  ];
  const foundPath = Object.keys(pages).find((path) =>
    possiblePaths.includes(path),
  );
  return foundPath ? lazy(pages[foundPath]) : null;
};

const renderRoute = (list?: ROUTEITEM[]) => {
  const data = list ?? routes;
  return data.map((item: ROUTEITEM) => {
    const Dashboard: any = useMemo(
      () => lazyComponent(item.component),
      [item.component],
    );
    const EnhancedDashboard = useMemo(
      () =>
        item.hoc
          ? item.hoc.reduce((acc: any, hoc: any) => hoc(acc), Dashboard)
          : Dashboard,
      [Dashboard, item.hoc],
    );
    const Replacement = () => {
      const content = item.to ? (
        <Navigate to={item.to} />
      ) : (
        <Suspense fallback={<div>...</div>}>
          <EnhancedDashboard />
        </Suspense>
      );
      return content;
    };
    return (
      <Route key={item.path} path={item.path} element={<Replacement />}>
        {item.children && item.children.length
          ? renderRoute(item.children)
          : null}
      </Route>
    );
  });
};

const Page = () => (
  <Routes>
    {renderRoute()}
    <Route path="*" element={<div>暂无</div>} />
  </Routes>
);

export default Page;
