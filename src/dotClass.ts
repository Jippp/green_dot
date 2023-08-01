interface DrawProps {
  // ctx: CanvasRenderingContext2D,
  ctx: any,
  x: number, 
  y: number,
  color?: string
}

export const DEFAULTCONFIG = {
  /** 起始x轴坐标 */
  x: 10,
  /** 起始y轴坐标 */
  y: 10,
  /** 尺寸大小 */
  size: 20,
  /** width */
  width: 20,
  /** height */
  height: 20,
  /** 圆角 */
  cornerRadius: 5,
  /** 间距 */
  gap: 10,
  /** 一列固定7天 */
  row: 7,
  /** 选中的颜色 */
  activeColor: 'green'
}

class DotItemClass {
  x?: number;
  y?: number;
  size?: number;
  width?: number;
  height?: number;
  cornerRadius?: number;
  gap?: number;
  
  constructor({
    x = DEFAULTCONFIG.x, 
    y = DEFAULTCONFIG.y, 
    size = DEFAULTCONFIG.size, 
    width = DEFAULTCONFIG.width, 
    height = DEFAULTCONFIG.height, 
    cornerRadius = DEFAULTCONFIG.cornerRadius, 
    gap = DEFAULTCONFIG.gap
  }: DotItemClass) {
    this.size = size
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.gap = gap
    this.cornerRadius = cornerRadius
  }

  // 绘制单独的一个点
  drawDotItem({
    ctx, x, y, color = '#ccc'
  }: DrawProps) {
    const width = this.width!
    const height = this.height!
    const cornerRadius = this.cornerRadius!

    ctx.beginPath()
    ctx.moveTo(x + cornerRadius, y);

    ctx.lineTo(x + width - cornerRadius, y);
    ctx.arcTo(x + width, y, x + width, y + cornerRadius, cornerRadius);
    ctx.lineTo(x + width, y + height - cornerRadius);
    ctx.arcTo(x + width, y + height, x + width - cornerRadius, y + height, cornerRadius);
    ctx.lineTo(x + cornerRadius, y + height);
    ctx.arcTo(x, y + height, x, y + height - cornerRadius, cornerRadius);
    ctx.lineTo(x, y + cornerRadius);
    ctx.arcTo(x, y, x + cornerRadius, y, cornerRadius);
    ctx.closePath()

    ctx.strokeStyle = color
    ctx.stroke()
    ctx.fillStyle = color; // 填充颜色
    ctx.fill(); // 填充方块
  }
}

export default DotItemClass