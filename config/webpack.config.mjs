"use strict"

import { merge } from "webpack-merge"

import common from "./webpack.common.mjs"
import PATHS from "./paths.js"

// Merge webpack configuration files
const config = (env, argv) =>
  merge(common, {
    entry: {
      popup: PATHS.src + "/popup.js",
      contentScript: PATHS.src + "/contentScript.js",
      background: PATHS.src + "/background.js",
    },
    devtool: argv.mode === "production" ? false : "source-map",
  })

export default config
