export default function outputDate(long: number): string {
  const date = new Date(long)
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear().toString().slice(2)} (${date.getHours()}:${date.getMinutes()})`
}
