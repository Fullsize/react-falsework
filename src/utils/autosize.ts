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
const autosize: Autosize = {
  el: null,
  init(options = {}) {
    const {
      width = 1920,
      height = 1080,
      el = 'body',
      resize = true,
    } = options as Options;
    this.el = typeof el === 'string' ? document.querySelector(el) : el;
    const bodyEl = document.querySelector<HTMLElement>('body');
    if (bodyEl) {
      bodyEl.style.overflow = 'hidden';
    }
    if (this.el) {
      this.el.style.height = `${height}px`;
      this.el.style.width = `${width}px`;
      this.el.style.transformOrigin = `0 0`;
      this.el.style.overflow = 'hidden';

      keepFit(width, height, this.el);
      resize &&
        window.addEventListener('resize', () => {
          if (this.el) {
            keepFit(width, height, this.el);
          }
        });
    }
  },
};
export default autosize;
