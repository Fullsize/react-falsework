import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import routes from '@/routes';
const pages = import.meta.glob('../../pages/**/*.tsx');

type ROUTEITEM = {
  path: string;
  component?: string;
  to?: string;
  hoc?: any;
  children?: ROUTEITEM[];
};

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
    const Dashboard: any = lazyComponent(item.component);
    const Replacement = () => {
      const content = item.to ? (
        <Navigate to={item.to} />
      ) : (
        <Suspense fallback={<div>...</div>}>
          <Dashboard />
        </Suspense>
      );
      return item.hoc ? item.hoc(content)() : content;
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
