
const getRatioColor = () => {
  if (countyData && countyData.party) {
    return countyData.party.buckets.reduce(
      (acc: any, val: any) => {
        if (val.key === 'Republican') {
          acc = {
            ...acc,
            total: acc.total + val.doc_count,
            rep: val.doc_count,
          }
        }
        if (val.key === 'Democratic') {
          acc = {
            ...acc,
            total: acc.total + val.doc_count,
            dem: val.doc_count,
          }
        }
        acc = {
          ...acc,
          countyColor: rgbToHex({
            r: acc.rep ? (acc.rep / acc.total) * 255 : 0,
            g: 0,
            b: acc.dem ? (acc.dem / acc.total) * 255 : 0,
          }),
        }
        return acc
      },
      { total: 0, rep: 0, dem: 0 },
    )
  }
  return {
    countyColor: 'white',
  }
}
