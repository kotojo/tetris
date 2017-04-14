export function actualResizeHandler(canvasId) {
  const canvas = document.getElementById(canvasId);
  let { width } = document.defaultView.getComputedStyle(canvas);
  width = Number(width.slice(0, width.length - 2));
  canvas.style.height = `${width * 2}px`;
}

let resizeTimeout;
export function resizeThrottler(canvasId) {
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      actualResizeHandler(canvasId);
    }, 66); // 15 fps
  }
}
