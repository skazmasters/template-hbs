export function triggerInputChange(element) {
  if ('createEvent' in document) {
    const evt = document.createEvent('HTMLEvents')
    evt.initEvent('change', false, true)
    element.dispatchEvent(evt)
  } else element.fireEvent('onchange')
}

export function isClickOutsideElement(event, element) {
  let target = event.target

  if (element !== target) {
    do {
      target = target.parentNode
    } while (target && target !== element)
  }

  return !target
}

// window.isClickOutsideElement = triggerInputChange;
// window.triggerInputChange = triggerInputChange;
