import dayjs from 'dayjs'

export const formdate = (val) => {
  return dayjs(val).format('YYYY-MM-DD')
}
