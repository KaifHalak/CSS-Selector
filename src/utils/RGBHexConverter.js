// Helper to convert RGB string to Hex
const ConvertRGBToHex = (rgbString) => {
  const rgbArray = rgbString.match(/\d+/g).map(Number) // Extract and convert each value to a number
  const [r, g, b] = rgbArray

  const toHex = (color) => {
    const hex = color.toString(16)
    return hex.length === 1 ? "0" + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

// Helper to convert Hex to RGB string
const ConvertHexToRGB = (hex) => {
  let r = 0,
    g = 0,
    b = 0

  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16)
    g = parseInt(hex[2] + hex[2], 16)
    b = parseInt(hex[3] + hex[3], 16)
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16)
    g = parseInt(hex[3] + hex[4], 16)
    b = parseInt(hex[5] + hex[6], 16)
  }

  return `rgb(${r}, ${g}, ${b})`
}

// Convert CSS object from RGB to Hex or vice versa
const ConvertCssColors = (cssObject, isToHex = true) => {
  const updatedCss = { ...cssObject }

  for (const property in updatedCss) {
    const value = updatedCss[property]

    if (typeof value === "string") {
      // Check if it's an RGB value
      if (isToHex && value.startsWith("rgb")) {
        updatedCss[property] = ConvertRGBToHex(value)
      }
      // Check if it's a Hex value
      else if (!isToHex && value.startsWith("#")) {
        updatedCss[property] = ConvertHexToRGB(value)
      }
    }
  }

  return updatedCss
}

// Convert Tailwind (tw) classes from RGB to Hex or vice versa
const ConvertTwColors = (twString, isToHex = true) => {
  let updatedTw = twString

  // Regex to match RGB values in Tailwind
  const rgbRegex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/g
  const hexRegex = /#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}/g

  if (isToHex) {
    // Replace RGB in Tailwind with Hex
    updatedTw = updatedTw.replace(rgbRegex, (match) => ConvertRGBToHex(match))
  } else {
    // Replace Hex in Tailwind with RGB
    updatedTw = updatedTw.replace(hexRegex, (match) => ConvertHexToRGB(match))
  }

  return updatedTw
}

// Main function to convert both CSS and Tailwind classes
export const RGBHexConverter = (styleValues, isToHex = true) => {
  let { cssObject, tw } = styleValues

  // Convert colors in the CSS object
  cssObject = ConvertCssColors(cssObject, isToHex)

  // Convert colors in the Tailwind string
  tw = ConvertTwColors(tw, isToHex)

  return { cssObject, tw }
}
