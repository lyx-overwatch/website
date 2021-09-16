export const requestAnimationFrame = function (callback: any) {
  if (window.requestAnimationFrame) {
    return window.requestAnimationFrame(callback);
  }
  return window.setTimeout(callback, 1000 / 60);
}

export const cancelAnimationFrame = function (timer: any) {
  if (window.cancelAnimationFrame) {
    return window.cancelAnimationFrame(timer);
  }
  return function () {
    clearTimeout(timer);
  }
}