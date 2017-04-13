/* global document,window */

import './main.scss';

const canvas = document.getElementById('canvas');

function actualResizeHandler() {
  let { width } = document.defaultView.getComputedStyle(canvas);
  width = Number(width.slice(0, width.length - 2));
  canvas.style.height = `${width * 2}px`;
}

let resizeTimeout;
function resizeThrottler() {
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      actualResizeHandler();
    }, 66); // 15 fps
  }
}

window.addEventListener('resize', resizeThrottler, false);
actualResizeHandler(); // fire on init
