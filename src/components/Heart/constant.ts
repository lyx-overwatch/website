export const colors = ['#266352', '#0090e2', '#c48480', '#00b300', '#00afc3', '#8c60da', '#ac004a', '#00aeff', '#feff75'];

export const getRandomVars = (rootWidth: number, length: number, index: number) => {
  const indexWidth = Math.floor((rootWidth / length));
  const curTextIndex = Math.floor(Math.random() * (length));
  const curTextColor = colors[Math.floor(Math.random() * (colors.length))];

  return {
    startAnimationTime: Math.floor(10 * Math.random() * 1000), // 动画开始时间
    frictionX: Math.random(), // 摩擦系数
    isPositive: Math.random() - 0.5 >= 0 ? true : false, // 飘移方向
    speed: (0.5 + 2 * Math.random()) / 3, // 下落速度
    curOffsetX: Math.floor(indexWidth * (index - 1) + indexWidth * Math.random()), // 当前心心offset的初始值,
    curTextIndex, // 当前文字的索引
    curTextColor, // 当前文字颜色
  }
}