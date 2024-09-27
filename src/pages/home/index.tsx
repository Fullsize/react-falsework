import React, { useEffect, useContext } from 'react';
import ThemeContext from '@/theme';
import Echarts from '@/components/echarts';
import { Select } from 'antd';
import './index.css';
const Page = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className="w-full h-full">
      <div>
        {/* <button onClick={() => setTheme('light')}>白色主题</button>
        <button onClick={() => setTheme('dark')}>黑色主题</button> */}
        <Select
          value={theme}
          options={[
            { label: '白色主题', value: 'light' },
            { label: '黑色主题', value: 'dark' },
          ]}
          onChange={(value) => setTheme(value)}
        />
      </div>
      <h1 style={{ margin: 0 }}>文字</h1>

      <Echarts
        style={{ width: 500, height: 400 }}
        options={{
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'line',
            },
          ],
        }}
      />
    </div>
  );
};
export default Page;
