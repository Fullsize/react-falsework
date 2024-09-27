import React, { useEffect, useState } from 'react';
import { useSetState } from 'react-use';
import Routes from '@/components/route-component';
import styles from './index.module.css';
import autosize from '@/utils/autosize';
import classNames from 'classnames';
import ThemeContext, { defaultTheme } from '@/theme';
const Page = () => {
  const [theme, setTheme] = useState(defaultTheme);
  useEffect(() => {
    autosize.init({
      el: '#app',
    });
    autosize.off();
  }, []);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={classNames(styles['main'], theme)}>
        <Routes />
      </div>
    </ThemeContext.Provider>
  );
};
export default Page;
