import React, { useEffect } from 'react';
import { useSetState } from 'react-use';
import Routes from '@/components/route-component';
import styles from './index.module.css';
const resetScale = (w: number, h: number) => {
  const cW = window.document.body.clientWidth;
  const cH = window.document.body.clientHeight;
  const designWidth = w;
  const designHeight = h;
  if (cW / cH > designWidth / designHeight) {
    return {
      hr: cH / designHeight,
      vr: cH / designHeight,
      marginLeft: (cW - (designWidth * cH) / designHeight) / 2,
      marginTop: null,
    };
  } else {
    return {
      hr: cW / designWidth,
      vr: cW / designWidth,
      marginLeft: null,
      marginTop: (cH - (designHeight * cW) / designWidth) / 2,
    };
  }
};
const Page = ({
  width = 1920,
  height = 1080,
  conversion,
}: {
  conversion?: boolean;
  width?: number;
  height?: number;
}) => {
  const [scale, setScale] = useSetState<{
    hr: number;
    vr: number;
    marginLeft: number | null | undefined;
    marginTop: number | null | undefined;
  }>({
    hr: 0,
    vr: 0,
    marginLeft: 0,
    marginTop: 0,
  });
  useEffect(() => {
    setScale(resetScale(width, height));
    window.addEventListener('resize', () => {
      setScale(resetScale(width, height));
    });
    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, []);
  const conversionStyle = {
    width,
    height,
    WebkitTransform: `scale(${scale.hr}, ${scale.vr})`,
    MozTransformOrigin: `scale(${scale.hr}, ${scale.vr})`,
    msTransform: `scale(${scale.hr}, ${scale.vr})`,
    transform: `scale(${scale.hr}, ${scale.vr})`,
    marginLeft: scale.marginLeft ?? '',
    marginTop: scale.marginTop ?? '',
  };
  return (
    <div className={styles['main']} style={conversion ? conversionStyle : {}}>
      <Routes />
    </div>
  );
};
export default Page;
