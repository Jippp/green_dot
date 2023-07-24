declare module 'green_dot' {
  export interface DrawProps {
    /** 数据 */
    data: {
      isDone: boolean;
      doneTime: string;
    }[];
    /** 是否是svg */
    isSvg?: boolean
  }

  export function fixDotSizeDraw(arg: DrawProps): Buffer | undefined
}