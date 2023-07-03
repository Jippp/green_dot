declare module 'green_dot' {
  export interface DrawProps {
    /** 数据 */
    data: {
      isDone: boolean;
      doneTime: string;
    }[];
    /** 导出文件名称，带后缀 */
    outFileName: string;
    /** 是否是svg */
    isSvg?: boolean
  }

  export function fixDotSizeDraw(arg: DrawProps): void
}