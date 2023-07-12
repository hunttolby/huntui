const scalingObj = [...Array(1000)].reduce((acc, _, index) => {
  acc[index] = `${index}px`
  return acc
}, {})

module.exports = {
  scalingObj
}