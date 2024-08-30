// https://github.com/Jackardios/css-to-tailwindcss

import { TailwindConverter } from "css-to-tailwindcss"

const converter = new TailwindConverter({
  remInPx: 16, // set null if you don't want to convert rem to pixels
  postCSSPlugins: [], // add any postcss plugins to this array
  arbitraryPropertiesIsEnabled: "false", //defines whether non-convertible properties should be converted as "arbitrary properties"
  tailwindConfig: {
    // your tailwind config here
    content: [],
    theme: {
      //   extend: {
      //     colors: {
      //       "custom-color": {
      //         100: "#123456",
      //         200: "hsla(210, 100%, 51.0%, 0.016)",
      //         300: "#654321",
      //         gold: "hsl(41, 28.3%, 79.8%)",
      //         marine: "rgb(4, 55, 242, 0.75)",
      //       },
      //     },
      //     screens: {
      //       "custom-screen": { min: "768px", max: "1024px" },
      //     },
      //   },
      //   supports: {
      //     grid: "display: grid",
      //     flex: "display: flex",
      //   },
    },
  },
})

async function ConvertCSSToTw(styles) {
  let css = ConvertStyleObjToCSS(styles)
  let { convertedRoot, nodes } = await converter.convertCSS(css)

  return nodes[0].tailwindClasses.join(" ")
}

function ConvertStyleObjToCSS(styles) {
  let css = ".foo { \n"
  Object.entries(styles).forEach(([key, value]) => {
    css = css + `${key}: ${value}; \n`
  })

  css += "}"

  return css
}

export default ConvertCSSToTw
