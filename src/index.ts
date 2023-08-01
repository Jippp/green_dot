import { createCanvas } from 'canvas'
import dayjs from 'dayjs'
import fs from 'fs'
import DotItemClass, { DEFAULTCONFIG } from './dotClass'
import mock from './format'

/**
 * 获取第一天的y轴偏移量
 * @returns 
 */
const getFirstDayY = (firstDay: string) => {
  // 0-6, 周日到周六
  return dayjs(firstDay).day()
}


/**
 * 固定画布，会自动计算点的大小
 */
const fixCanvasDraw = ({ data, outFileName, isSvg }: {
  /** 数据 */
  data: {
    isDone: boolean;
    doneTime: string;
  }[];
  /** 导出文件名称，带后缀 */
  outFileName: string;
  /** 是否是svg */
  isSvg?: boolean
}) => {
  const totalWidth = 600
  const totalHeight = 400
  const canvas = createCanvas(totalWidth, totalHeight, isSvg ? 'svg' : undefined)
  // const canvas = document.getElementById('canvas') as HTMLCanvasElement
  const ctx = canvas.getContext("2d");
  if(ctx) {
    const firstDay = getFirstDayY(data[0].doneTime)
  
    // 行列多少个，一行固定7个，一列多少个
    // 一行col个
    const col = Math.ceil((data.length + firstDay)/ DEFAULTCONFIG.row)
    const width = Math.floor((totalWidth - (col - 1) * DEFAULTCONFIG.gap - 2 * DEFAULTCONFIG.x) / col)
    const height = Math.floor((totalHeight - (DEFAULTCONFIG.row - 1) * DEFAULTCONFIG.gap - 2 * DEFAULTCONFIG.y) / DEFAULTCONFIG.row)
    const size = Math.min(width, height)
  
    const dotItem = new DotItemClass({
      size, width: size, height: size, cornerRadius: ~~(size / 5)
    } as DotItemClass)
  
    data.forEach(({ isDone }, idx) => {
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

    fs.writeFileSync(outFileName, canvas.toBuffer())

    // 清除内存，防止过多占用内存
    ctx.clearRect(0, 0, totalWidth, totalHeight)
  }
}

// fixCanvasDraw({ data: mock, outFileName: 'green_fixcanvas.png' })

/**
 * 固定点的大小，自动延伸画布
 */
export const fixDotSizeDraw = ({ data, isSvg }: {
  /** 数据 */
  data: {
    isDone: boolean;
    doneTime: string;
  }[];
  /** 是否是svg */
  isSvg?: boolean
}) => {
  const firstDay = getFirstDayY(data[0].doneTime)

  const canvasHeight = DEFAULTCONFIG.row * DEFAULTCONFIG.height + (DEFAULTCONFIG.row  - 1) * DEFAULTCONFIG.gap  + 2 * DEFAULTCONFIG.y
  /** 列数：day + length */
  const col = Math.ceil((data.length + firstDay) / DEFAULTCONFIG.row)
  /** 画布宽度：列数 * 点width + (列数 - 1) * 间隔 + 2 * x */
  const canvasWidth = col * DEFAULTCONFIG.width + (col  - 1) * DEFAULTCONFIG.gap  + 2 * DEFAULTCONFIG.x

  // const canvas = document.getElementById('canvas') as HTMLCanvasElement
  // canvas.width = canvasWidth
  // canvas.height = canvasHeight
  const canvas = createCanvas(canvasWidth, canvasHeight, isSvg ? 'svg' : undefined)
  const ctx = canvas.getContext("2d");

  if(ctx) {
    const dotItem = new DotItemClass({} as DotItemClass)

    // 背景色
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  
    data.forEach(({ isDone }, idx) => {
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

    const buffer = canvas.toBuffer()

    // 清除内存，防止过多占用内存
    if(!isSvg) ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    return buffer
  }
}

const fileBuffer = fixDotSizeDraw({ data: mock })
if(fileBuffer) fs.writeFileSync('green.png', fileBuffer)