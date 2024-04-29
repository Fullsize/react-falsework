import withAuth from '@/hocs/withAuth';
type HOC = (component: React.ComponentType<any>) => React.ComponentType<any>;
export type ROUTEITEM = {
  path: string; // 路径
  component?: string; // 对应的组件名，可选
  to?: string; // 重定向路径，可选
  hoc?: HOC[]; // 高阶组件数组，可选
  children?: ROUTEITEM[]; // 子路由项数组，可选
  name?: string; // 页面标识或名称
};
export default [
  {
    path: '',
    name: '首页',
    component: 'home',
    hoc: [withAuth],
    children: [],
  },
] as ROUTEITEM[];
