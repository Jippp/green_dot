import DotItemClass from './dotClass.js'
import mock from './format.js'

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext("2d");

if(ctx) {
  const totalWidth = canvas.width
  const totalHeight = canvas.height

  // TODO 问题检查？？？？？
  // 行列多少个，一行固定7个，一列多少个
  const row = 7
  const col = Math.ceil(mock.length / 7)
  // 一行col个
  const width = Math.ceil((totalWidth - (col - 1) * 10 - 20) / col)
  // 一列固定7天
  const height = Math.ceil((totalHeight - 80) / row)
  const size = Math.min(width, height)

  const dotItem = new DotItemClass({
    size, width: size, height: size, cornerRadius: ~~(size / 5)
  } as DotItemClass)

  console.log(size)

  mock.forEach(({ isDone }, idx) => {
    // 计算出该点的位置
    const x = ~~(idx / row), y = idx % row

    dotItem.drawDotItem({
      ctx, 
      x: dotItem.x! + x * dotItem.gap! + x * dotItem.height!, 
      y: dotItem.y! + y * dotItem.gap! + y * dotItem.width!, 
      color: isDone ? 'green' : undefined
    })
  })
  // ctx.getSerializedSvg()
}
