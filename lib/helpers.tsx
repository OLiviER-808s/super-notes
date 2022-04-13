export const removeDuplicates = (array: Array<any>) => {
  return array.filter((val, idx, arr) => {
    return arr.indexOf(val) === idx
  })
}