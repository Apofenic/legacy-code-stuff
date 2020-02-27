
const normalizeAbsRGB = (county: any, data: any) => {
  const getRgb = (max: any, min: any, diff: any, party: any) => {
    diff = Math.abs(diff)
    const val = ((diff - min) * (255 - 0)) / (max - min) + 0
    const rgbVal =
      party === 'rep'
      ? { r: 255, g: 255 - val, b: 255 - val }
      : { r: 255 - val, g: 255 - val, b: 255 }
    return rgbToHex(rgbVal)
  }
  const { demCounties, repCounties } = data
  if (
    repCounties &&
    repCounties[0] &&
    repCounties[0].repDiff &&
    demCounties &&
    demCounties[0] &&
    demCounties[0].demDiff
  ) {
    const repMin = repCounties[0].repDiff
    const repMax = repCounties[repCounties.length - 1].repDiff
    const demMin = demCounties[0].demDiff
    const demMax = demCounties[demCounties.length - 1].demDiff
    const countyName = county.key
    const countyParty = county.party.buckets.reduce((acc: any, val: any) => {
      if (val.key === 'Democratic') acc = { ...acc, demVal: val.doc_count }
      if (val.key === 'Republican') acc = { ...acc, repVal: val.doc_count }
      if (acc.repVal && acc.demVal) {
        const diffVal = acc.demVal - acc.repVal
        const majorParty = diffVal < 0 ? 'rep' : 'dem'
        const rgbVal =
          acc.majorParty === 'rep'
          ? getRgb(repMax, repMin, diffVal, majorParty)
          : getRgb(demMax, demMin, diffVal, majorParty)
        acc = {
          ...acc,
          diffVal: Math.abs(diffVal),
          majorParty,
          rgbVal,
        }
      }
      return acc
    }, {})
    return {
      ...county,
      color: countyParty.rgbVal,
    }
  }
}
