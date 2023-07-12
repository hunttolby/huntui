export const generateItemArray = <T extends unknown>(length: number, item: (idx: number) => T): T[] => {
  return [...Array.from(Array(length))].map((_, x) => item(x))
}