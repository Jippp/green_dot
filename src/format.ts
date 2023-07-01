const start = '2023-06-01'

const mock = Array.from(new Array(30).fill({}).map((_, idx) => ({
  isDone: Math.random() > 0.5,
  // @ts-ignore
  doneTime: dayjs(start).add(idx + 1, 'day').format('YYYY-MM-DD')
})))

export default mock