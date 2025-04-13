interface Options {
  width?: number;
  height?: number;
  el?: HTMLElement | string;
  resize?: boolean;
  minWidth?: number;
  minHeight?: number;
}
interface Autosize {
  el: HTMLElement | null;
  init: (options?: Options) => void;
  resizeKeepFit: () => void;
  off: () => void;
}
function keepFit(dw: number, dh: number, dom: HTMLElement) {
  const clientHeight = document.documentElement.clientHeight;
  const clientWidth = document.documentElement.clientWidth;
  const currScale =
    clientWidth / clientHeight < dw / dh ? clientWidth / dw : clientHeight / dh;
  const height = Math.round(clientHeight / Number(currScale));
  const width = Math.round(clientWidth / Number(currScale));
  dom.style.height = `${height}px`;
  dom.style.width = `${width}px`;
  dom.style.transform = `scale(${currScale})`;
}

let currentElement: HTMLElement | null = null;
let currentWidth = 0;
let currentHeight = 0;
const autosize: Autosize = {
  el: null,
  init(options = {}) {
    const {
      width = 1920,
      height = 1080,
      el = 'body',
      resize = true,
      minWidth = 0,
      minHeight = 0,
    } = options as Options;

    // 验证输入参数
    if (width <= 0 || height <= 0) {
      throw new Error('Width and height must be positive numbers');
    }

    // 使用ResizeObserver替代resize事件,性能更好
    const resizeObserver = new ResizeObserver(() => {
      this.resizeKeepFit();
    });

    // 获取目标元素
    currentElement = typeof el === 'string' ? document.querySelector(el) : el;
    if (!currentElement) {
      throw new Error('Target element not found');
    }

    currentWidth = Math.max(width, minWidth);
    currentHeight = Math.max(height, minHeight);

    // 使用 CSS 变量存储关键值，方便样式复用和维护
    document.documentElement.style.setProperty(
      '--target-width',
      `${currentWidth}px`,
    );
    document.documentElement.style.setProperty(
      '--target-height',
      `${currentHeight}px`,
    );

    // 设置 body 样式
    const bodyEl = document.querySelector<HTMLElement>('body');
    if (bodyEl) {
      bodyEl.style.overflow = 'hidden';
    }

    // 使用 CSS transform 实现缩放，性能更好
    const styles = {
      height: 'var(--target-height)',
      width: 'var(--target-width)',
      transformOrigin: '0 0',
      overflow: 'hidden',
      position: 'absolute',
      left: '50%',
      top: '50%',
      willChange: 'transform', // 优化渲染性能
    };
    Object.assign(currentElement.style, styles);

    // 初始化自适应
    this.resizeKeepFit();

    // 添加 ResizeObserver 监听
    if (resize) {
      resizeObserver.observe(document.documentElement);
      // 保存 observer 实例以便后续清理
      (this as any).resizeObserver = resizeObserver;
    }
  },

  resizeKeepFit() {
    if (!currentElement) return;

    const { clientHeight, clientWidth } = document.documentElement;
    const ratio = Math.min(
      clientWidth / currentWidth,
      clientHeight / currentHeight,
    );

    // 使用 transform: translate 优化定位性能
    currentElement.style.transform = `
      translate(-50%, -50%) 
      scale(${ratio})
    `;
  },

  off() {
    if (!currentElement) return;

    // 清理 CSS 变量
    document.documentElement.style.removeProperty('--target-width');
    document.documentElement.style.removeProperty('--target-height');

    // 重置所有样式
    const styles = {
      height: '',
      width: '',
      transformOrigin: '',
      overflow: '',
      transform: '',
      position: '',
      left: '',
      top: '',
      willChange: '',
    };
    Object.assign(currentElement.style, styles);

    // 清理 ResizeObserver
    if ((this as any).resizeObserver) {
      (this as any).resizeObserver.disconnect();
      (this as any).resizeObserver = null;
    }
  },
};
export default autosize;
