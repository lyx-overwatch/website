export const getRandomVars = (rootWidth: number, length: number, index: number) => {
  const indexWidth = Math.floor((rootWidth / length));
  const curTextIndex = Math.floor(Math.random() * (length));

  return {
    frictionX: Math.random(), // 摩擦系数
    isPositive: Math.random() - 0.5 >= 0 ? true : false, // 飘移方向
    speed: (0.5 + 2 * Math.random()) / 3, // 下落速度
    curOffsetX: Math.floor(indexWidth * (index - 1) + indexWidth * Math.random()), // 当前心心offset的初始值,
    curTextIndex, // 当前文字的索引
  }
}