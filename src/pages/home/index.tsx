import React from 'react';
import { Link } from 'react-router-dom';
// 定义页面数据
const pages = [
  { name: '静态资源', path: '/image' },
  { name: '主题', path: '/theme' },
  // 你可以继续添加其他页面
];

const Sitemap = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>网页地图</h1>
      <ul>
        {pages.map((page, index) => (
          <li key={index}>
            <Link to={page.path}>{page.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sitemap;
