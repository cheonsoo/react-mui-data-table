export const testNumberRegex = (value) => {
  const onlyNumbersRegex = /^[0-9\b]+$/
  return value === '' || onlyNumbersRegex.test(value)
}

export const testFloatRegex = (value) => {
  const regex = /^[0-9]*(?:\.[0-9]*)?$/
  return value === '' || regex.test(value)
}
