// I left some of the "right" and "vertical" variants
// TODO: Take into accounts the key/values that are objects

import TraditionalToLogicalCSS from "./constants/Traditional-Logical-CSS.js"

function SwapToTraditionalCSS(styles) {
  let logicalCSS = Object.values(TraditionalToLogicalCSS)
  let swappedToTradionalCSS = {}

  let currentCSSStyles = Object.keys(styles)

  currentCSSStyles.forEach((eachCurrentStyle) => {
    if (logicalCSS.includes(eachCurrentStyle)) {
      // Swap the logical CSS to traditional CSS
      let traditioanlStyleKey = Object.keys(TraditionalToLogicalCSS).find(
        (key) => TraditionalToLogicalCSS[key] === eachCurrentStyle
      )
      swappedToTradionalCSS[traditioanlStyleKey] = styles[eachCurrentStyle]
    } else {
      // Leave the style as is if its already traditional
      swappedToTradionalCSS[eachCurrentStyle] = styles[eachCurrentStyle]
    }
  })

  return swappedToTradionalCSS
}

function CleanUp(style) {
  let excludeTheseStyles = [
    "border-block-end-color",
    "border-block-start-color",
    "border-inline-end-color",
    "border-inline-start-color",

    "border-inline-end-style",
    "border-inline-start-style",
    "border-block-end-style",
    "border-block-start-style",

    "border-inline-end-width",
    "border-inline-start-width",
    "border-block-end-width",
    "border-block-start-width",

    "unicode-bidi",
  ]

  let cleanUpCSS = {}

  let allStyleKeys = Object.entries(style)

  allStyleKeys.forEach(([styleKey, value]) => {
    if (!excludeTheseStyles.includes(styleKey)) {
      cleanUpCSS[styleKey] = value
    }
  })

  return cleanUpCSS
}

function FormatFourSideStyles(style) {
  // This function is to combine the seperate css to one line (if applicable)
  let fourSidesStyles = {}
  let stylesWhichHaveTheKeyword = {}
  let formattedStyle = {}

  let allStyleKeys = Object.entries(style)

  allStyleKeys.forEach(([styleKey, value]) => {
    if (
      styleKey.includes("top") ||
      styleKey.includes("bottom") ||
      styleKey.includes("left") ||
      styleKey.includes("right")
    ) {
      let currentStyle = styleKey

      if (styleKey.includes("top")) {
        styleKey = styleKey.replace("-top", "")
      } else if (styleKey.includes("bottom")) {
        styleKey = styleKey.replace("-bottom", "")
      } else if (styleKey.includes("left")) {
        styleKey = styleKey.replace("-left", "")
      } else if (styleKey.includes("right")) {
        styleKey = styleKey.replace("-right", "")
      }

      if (!stylesWhichHaveTheKeyword[styleKey]) {
        stylesWhichHaveTheKeyword[styleKey] = []
      }

      stylesWhichHaveTheKeyword[styleKey].push(currentStyle)

      if (!fourSidesStyles[styleKey]) {
        fourSidesStyles[styleKey] = []
      }

      fourSidesStyles[styleKey].push(value)
    } else {
      formattedStyle[styleKey] = value
    }
  })

  let allFourSidesStyleKeys = Object.entries(fourSidesStyles)

  allFourSidesStyleKeys.forEach(([styleKey, value]) => {
    const uniqueValues = new Set(value)
    if (value.length === 4 && uniqueValues.size === 1) {
      // This css style can be combined into 1
      formattedStyle[styleKey] = value[0]
    } else {
      // Put the remaining styles back
      let stylesToAddBack = stylesWhichHaveTheKeyword[styleKey]
      for (let i = 0; i < value.length; i++) {
        formattedStyle[stylesToAddBack[i]] = value[i]
      }
    }
  })

  return formattedStyle
}

function EdgeCases(style) {
  // border-radius

  let stylesWhichHaveTheKeywordValues = {}
  let formattedStyles = {}

  let allStyleEntries = Object.entries(style)
  allStyleEntries.forEach(([styleKey, value]) => {
    if (styleKey.includes("border") && styleKey.includes("radius")) {
      stylesWhichHaveTheKeywordValues[styleKey] = value
    } else {
      formattedStyles[styleKey] = value
    }
  })
  let allBorderRadiusValues = Object.values(stylesWhichHaveTheKeywordValues)
  const uniqueValues = new Set(allBorderRadiusValues)

  if (uniqueValues.size === 1 && allBorderRadiusValues.length == 4) {
    formattedStyles["border-radius"] = uniqueValues.values().next().value
  } else {
    Object.entries(stylesWhichHaveTheKeywordValues).forEach(
      ([styleKey, value]) => {
        formattedStyles[styleKey] = value
      }
    )
  }

  return formattedStyles
}

function FormatCSS(styles) {
  let formattedStyles = SwapToTraditionalCSS(styles)
  formattedStyles = CleanUp(formattedStyles)
  formattedStyles = FormatFourSideStyles(formattedStyles)
  formattedStyles = EdgeCases(formattedStyles)
  return formattedStyles
}

export default FormatCSS
