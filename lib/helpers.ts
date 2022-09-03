export const removeDuplicates = (array: Array<any>) => {
  return array.filter((val, idx, arr) => {
    return arr.indexOf(val) === idx
  })
}

// makes a color transparent
export const makeTransparent = (color: string) => {
  let transparent: any = color.slice(0, 3) + 'a(' + color.slice(4, color.length - 1) + ', 0.4)'
  if (color === 'rgb(27, 28, 31)' || color === 'rgb(255, 255, 255)') transparent = null

  return transparent
}

// makes a transparent color solid
export const makeSolid = (color: string): string => {
  try {
    const solid = color.replace(', 0.4', '')
    return solid
  } catch (error) {
    return color
  }
}