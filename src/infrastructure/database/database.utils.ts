// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (field: any, next: any)  => {
  if (field.type == 'DATETIME') {
    const date = new Date(field.string())
    date.setUTCHours(date.getUTCHours() - 3)
    return date.toISOString()
  }
  return next()
}
