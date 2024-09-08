const pxToRemRatio = 16

export function ConvertPxToRem(styleObjOrTw) {
  // Function to convert px to rem
  const convertValue = (value) => {
    if (typeof value === "string" && value.endsWith("px")) {
      const pxValue = parseFloat(value)
      return `${pxValue / pxToRemRatio}rem`
    }
    return value
  }

  // If the input is a style object, convert all px values to rem
  if (typeof styleObjOrTw === "object") {
    const convertedStyleObj = {}
    for (const key in styleObjOrTw) {
      if (styleObjOrTw.hasOwnProperty(key)) {
        convertedStyleObj[key] = convertValue(styleObjOrTw[key])
      }
    }
    return convertedStyleObj
  }

  // If the input is a Tailwind class string, convert hardcoded px values to rem
  if (typeof styleObjOrTw === "string") {
    return styleObjOrTw.replace(/\[(\d+(\.\d+)?)px\]/g, (match, pxValue) => {
      const remValue = parseFloat(pxValue) / pxToRemRatio
      return `[${remValue}rem]`
    })
  }

  return styleObjOrTw
}

// Function to convert rem to px in a CSS style object and Tailwind classes
export function ConvertRemToPx(styleObjOrTw) {
  // Function to convert rem to px
  const convertValue = (value) => {
    if (typeof value === "string" && value.endsWith("rem")) {
      const remValue = parseFloat(value)
      return `${remValue * pxToRemRatio}px`
    }
    return value
  }

  // If the input is a style object, convert all rem values to px
  if (typeof styleObjOrTw === "object") {
    const convertedStyleObj = {}
    for (const key in styleObjOrTw) {
      if (styleObjOrTw.hasOwnProperty(key)) {
        convertedStyleObj[key] = convertValue(styleObjOrTw[key])
      }
    }
    return convertedStyleObj
  }

  // If the input is a Tailwind class string, convert hardcoded rem values to px
  if (typeof styleObjOrTw === "string") {
    return styleObjOrTw.replace(/\[(\d+(\.\d+)?)rem\]/g, (match, remValue) => {
      const pxValue = parseFloat(remValue) * pxToRemRatio
      return `[${pxValue}px]`
    })
  }

  return styleObjOrTw
}
