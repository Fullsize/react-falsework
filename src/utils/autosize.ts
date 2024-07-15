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
    } = options as Options;
    currentElement = typeof el === 'string' ? document.querySelector(el) : el;
    currentWidth = width;
    currentHeight = height;
    const bodyEl = document.querySelector<HTMLElement>('body');
    if (bodyEl) {
      bodyEl.style.overflow = 'hidden';
    }
    if (currentElement) {
      currentElement.style.height = `${height}px`;
      currentElement.style.width = `${width}px`;
      currentElement.style.transformOrigin = `0 0`;
      currentElement.style.overflow = 'hidden';

      keepFit(currentWidth, currentHeight, currentElement);
      resize && window.addEventListener('resize', this.resizeKeepFit);
    }
  },
  resizeKeepFit() {
    if (currentElement) {
      keepFit(currentWidth, currentHeight, currentElement);
    }
  },
  off() {
    if (currentElement) {
      currentElement.style.height = ``;
      currentElement.style.width = ``;
      currentElement.style.transformOrigin = ``;
      currentElement.style.overflow = '';
      currentElement.style.transform = '';
      window.removeEventListener('resize', this.resizeKeepFit);
    }
  },
};
export default autosize;
