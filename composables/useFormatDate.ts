export default (timestamp: Date | string): string => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  // const taipeiDate = new Date(date.getTime() + 8 * 60 * 60 * 1000)
  const taipeiDateString = date.toLocaleString('zh-TW', {
    timeZone: 'Asia/Taipei',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    weekday: 'short',
    hourCycle: 'h23'
  })
  
  return taipeiDateString.replace(/\//g, '-')
  // return date
}
