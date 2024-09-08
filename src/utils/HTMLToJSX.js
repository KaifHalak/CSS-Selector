// TODO: Add styling + tw

const mapObj = {
  "class=": "className=",
  "for=": "htmlFor=",
  "<!--": "{/*",
  "-->": "*/}",
  "tabindex=": "tabIndex=",
}

function ConvertToCamelCase(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
}

function ConvertInlineStyleToJSX(style) {
  return style
    .split(";")
    .filter((s) => s.trim())
    .reduce((result, styleProp) => {
      const [key, value] = styleProp.split(":")
      if (key && value) {
        const camelCaseKey = ConvertToCamelCase(key.trim())
        result[camelCaseKey] = value.trim()
      }
      return result
    }, {})
}

export default function ConvertHTMLToJSX(html) {
  let jsx = html.outerHTML
  // Replace the basic attributes using mapObj
  for (const [key, value] of Object.entries(mapObj)) {
    jsx = jsx.replace(new RegExp(key, "g"), value)
  }

  // Convert style attribute to JSX object syntax
  jsx = jsx.replace(/style="([^"]*)"/g, (match, style) => {
    const styleObj = ConvertInlineStyleToJSX(style)
    const styleString = JSON.stringify(styleObj).replace(/"([^"]+)":/g, "$1:")
    return `style={${styleString}}`
  })

  // Add self-closing tags where needed
  jsx = jsx.replace(
    /<(img|input|br|hr|meta|link|base|area|col|param|source|embed|track)([^>]*)>/g,
    "<$1$2 />"
  )

  return jsx
}
