import dayjs from 'dayjs'
import dayjsPluginRelativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(dayjsPluginRelativeTime)

export const formatRelativeTime = (time: string) => {
  return dayjs(time).fromNow()
}

export const formatTimeShort = (time: string) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm')
}

export const formatTimeLong = (time: string) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss.SSS')
}
