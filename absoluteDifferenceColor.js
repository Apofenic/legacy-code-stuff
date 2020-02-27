const getAbsoluteColor = () => {
  return shapeDemos.buckets.reduce(
    (acc: any, val: any) => {
      const countyData = val.party.buckets.reduce(
        (innerAcc: any, innerVal: any) => {
          if (innerVal.key === 'Republican') {
            innerAcc = { ...innerAcc, rep: innerVal.doc_count }
          }
          if (innerVal.key === 'Democratic') {
            innerAcc = { ...innerAcc, dem: innerVal.doc_count }
          }
          if (innerAcc.rep && innerAcc.dem) {
            const diff = innerAcc.rep - innerAcc.dem
            if (diff < 0) {
              innerAcc = {
                ...innerAcc,
                ...val,
                demDiff: Math.abs(diff),
              }
            } else {
              innerAcc = {
                ...innerAcc,
                ...val,
                repDiff: diff,
              }
            }
          }
          return innerAcc
        },
        {},
      )
      if (countyData.demDiff) {
        acc = { ...acc, demCounties: acc.demCounties.concat(countyData) }
      } else {
        acc = { ...acc, repCounties: acc.repCounties.concat(countyData) }
      }

      acc = {
        ...acc,
        demCounties: acc.demCounties.sort(
          (a: any, b: any) => a.demDiff - b.demDiff,
        ),
        repCounties: acc.repCounties.sort(
          (a: any, b: any) => a.repDiff - b.repDiff,
        ),
      }
      acc = {
        ...acc,
        counties: acc.counties.concat(normalizeAbsRGB(val, acc)),
      }
      return acc
    },
    { counties: [], repCounties: [], demCounties: [] },
  ).counties.filter((n: any) => n)
}
