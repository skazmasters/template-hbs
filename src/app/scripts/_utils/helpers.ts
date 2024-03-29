export function buildThresholdList(numSteps = 10) {
  const thresholds = []

  for (let i = 1; i <= numSteps; i++) {
    let ratio = i / numSteps
    thresholds.push(ratio)
  }

  thresholds.push(0)
  return thresholds
}

export function isLocalhost() {
  return (
    document.location.href.indexOf('localhost') !== -1 ||
    document.location.href.indexOf('192.168') !== -1
  )
}

// window.isLocalhost = isLocalhost
// window.buildThresholdList = buildThresholdList
