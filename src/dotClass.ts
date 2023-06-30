interface DrawProps {
  ctx: CanvasRenderingContext2D,
  x: number, 
  y: number,
  color?: string
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
    x = 10, y = 10, size = 50, width = 50, height = 50, cornerRadius = 10, gap = 10
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
    ctx, x, y, color = '#fff'
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

    ctx.strokeStyle = '#ccc'
    ctx.stroke()
    ctx.fillStyle = color; // 填充颜色为红色
    ctx.fill(); // 填充方块
  }
}

export default DotItemClass