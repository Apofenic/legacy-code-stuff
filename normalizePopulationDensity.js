
const normalizeDensity = () => {
  const { doc_count } = countyData
  const val = Math.log(doc_count - min) / Math.log(max - min)
  const newVal = (val - scaledMin) / (scaledMax - scaledMin)
  if (val < 0.3) return 0.1
  if (val > 0.9) return 1
  return newVal
}



const scaledDist =
      sortedShapes &&
      sortedShapes
      .map((bk: any) => {
        const min = sortedShapes[0].doc_count
        const max = sortedShapes[sortedShapes.length - 1].doc_count
        const val = Math.log(bk.doc_count - min) / Math.log(max - min)
        if (val >= 0) return val
        return 0
      })
      .filter((n: any) => n)
      .sort()
