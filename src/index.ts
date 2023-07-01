import DotItemClass, { DEFAULTCONFIG } from './dotClass.js'
import mock from './format.js'

/**
 * 获取第一天的y轴偏移量
 * @returns 
 */
const getFirstDayY = (firstDay: string) => {
  // 0-6, 周日到周六
  // @ts-ignore
  return dayjs(firstDay).day()
  // return {
  //   y: DEFAULTCONFIG.y + day * DEFAULTCONFIG.y + day * height,
  //   day
  // }
}


/**
 * 固定画布，会自动计算点的大小
 */
const fixCanvasDraw = () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  const ctx = canvas.getContext("2d");
  if(ctx) {
    const firstDay = getFirstDayY(mock[0].doneTime)

    const totalWidth = canvas.width
    const totalHeight = canvas.height
  
    // 行列多少个，一行固定7个，一列多少个
    // 一行col个
    const col = Math.ceil((mock.length + firstDay)/ DEFAULTCONFIG.row)
    const width = Math.floor((totalWidth - (col - 1) * DEFAULTCONFIG.gap - 2 * DEFAULTCONFIG.x) / col)
    const height = Math.floor((totalHeight - (DEFAULTCONFIG.row - 1) * DEFAULTCONFIG.gap - 2 * DEFAULTCONFIG.y) / DEFAULTCONFIG.row)
    const size = Math.min(width, height)
  
    const dotItem = new DotItemClass({
      size, width: size, height: size, cornerRadius: ~~(size / 5)
    } as DotItemClass)
  
    mock.forEach(({ isDone }, idx) => {
      // 计算出该点的位置
      const resIdx = firstDay + idx
      const x = ~~(resIdx / DEFAULTCONFIG.row), y = resIdx % DEFAULTCONFIG.row
  
      dotItem.drawDotItem({
        ctx, 
        x: dotItem.x! + x * dotItem.gap! + x * dotItem.height!, 
        y: dotItem.y! + y * dotItem.gap! + y * dotItem.width!, 
        color: isDone ? DEFAULTCONFIG.activeColor : undefined
      })
    })
    // ctx.getSerializedSvg()
  }
}

fixCanvasDraw()

/**
 * 固定点的大小，自动延伸画布
 */
const fixDotSizeDraw = () => {
  const firstDay = getFirstDayY(mock[0].doneTime)

  const canvasHeight = DEFAULTCONFIG.row * DEFAULTCONFIG.height + (DEFAULTCONFIG.row  - 1) * DEFAULTCONFIG.gap  + 2 * DEFAULTCONFIG.y
  /** 列数：day + length */
  const col = Math.ceil((mock.length + firstDay) / DEFAULTCONFIG.row)
  /** 画布宽度：列数 * 点width + (列数 - 1) * 间隔 + 2 * x */
  const canvasWidth = col * DEFAULTCONFIG.width + (col  - 1) * DEFAULTCONFIG.gap  + 2 * DEFAULTCONFIG.x

  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  canvas.width = canvasWidth
  canvas.height = canvasHeight
  const ctx = canvas.getContext("2d");

  if(ctx) {
    const dotItem = new DotItemClass({} as DotItemClass)
  
    mock.forEach(({ isDone }, idx) => {
      // 计算出该点的位置
      const resIdx = firstDay + idx
      const x = ~~(resIdx / DEFAULTCONFIG.row), y = resIdx % DEFAULTCONFIG.row
  
      dotItem.drawDotItem({
        ctx, 
        x: dotItem.x! + x * dotItem.gap! + x * dotItem.height!, 
        y: dotItem.y! + y * dotItem.gap! + y * dotItem.width!, 
        color: isDone ? DEFAULTCONFIG.activeColor : undefined
      })
    })
  }
}

// fixDotSizeDraw()
