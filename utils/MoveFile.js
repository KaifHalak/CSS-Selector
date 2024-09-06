// move-dist.js
import { promises as fs, existsSync, rmSync } from "fs"
import path from "path"
import { fileURLToPath } from "url"


const distDir =
  "D:/My Stuff/NodeJS/Currently Doing/CSS Selector/css-selector/UI/dist"
const targetDir =
  "D:/My Stuff/NodeJS/Currently Doing/CSS Selector/css-selector/build"

async function moveDist() {
  try {
    // Ensure the target directory exists
    await fs.mkdir(targetDir, { recursive: true })

    // Read contents of the dist directory
    const files = await fs.readdir(distDir)

    if (existsSync(targetDir + "/assets")) {
      rmSync(targetDir + "/assets", { recursive: true, force: true })
    }

    for (const file of files) {
      const srcPath = path.join(distDir, file)
      const destPath = path.join(targetDir, file)

      // Move file
      await fs.rename(srcPath, destPath)
    }

    console.log("Dist folder moved successfully")
  } catch (error) {
    console.error("Error moving dist folder:", error)
  }
}

moveDist()
