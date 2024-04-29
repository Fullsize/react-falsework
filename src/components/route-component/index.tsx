import React, { lazy, Suspense, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import routes, { ROUTEITEM } from '@/routes';
const pages = import.meta.glob('../../pages/**/*.tsx');

import _ from 'lodash-es';
const lazyComponent = (components?: string) => {
  // / 增强参数校验：确保 components 是一个字符串且不为空
  if (typeof components !== 'string' || components.trim() === '') {
    throw new Error('Invalid component path.');
  }
  // 使用模板字符串并转义路径参数，防止路径注入
  const escapePath = (path: string) => path.replace(/\//g, '');
  const possiblePaths = [
    `../../pages/${escapePath(components)}/index.tsx`,
    `../../pages/${escapePath(components)}.tsx`,
  ];
  // 使用 find 方法找到匹配的路径
  const foundPath = possiblePaths.find((path) =>
    Object.keys(pages).includes(path),
  );
  // 异常处理改进：当没有找到路径时抛出异常，而不是返回 null
  if (!foundPath) {
    throw new Error(`Component path not found: ${components}`);
  }
  return lazy(pages[foundPath]);
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
