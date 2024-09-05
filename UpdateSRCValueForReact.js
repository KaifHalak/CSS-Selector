import { promises as fs } from "fs"
import path from "path"
import { fileURLToPath } from "url"

// Get the current file path (useful for running in ES modules)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Directory where your .js files are located (adjust 'src' if necessary)
const directoryPath = path.join(__dirname, "UI/dist/assets/")

// Function to process each .js file
async function processFile(filePath) {
  try {
    // Read the file content
    let data = await fs.readFile(filePath, "utf8")

    // Regex to find src attributes and replace with chrome.runtime.getURL()
    const srcRegex = /src\s*[:=]\s*["']([^"']+)["']/g

    // Replace src value with chrome.runtime.getURL
    const updatedData = data.replace(srcRegex, (match, filePath) => {
      return `src:chrome.runtime.getURL('${filePath}')`
    })

    // Write the updated content back to the file
    await fs.writeFile(filePath, updatedData, "utf8")
    console.log(`Updated file: ${filePath}`)
  } catch (error) {
    console.error(`Error processing file: ${filePath}`, error)
  }
}

// Function to process all .js files in a directory
async function processDirectory(directoryPath) {
  try {
    const files = await fs.readdir(directoryPath)

    for (const file of files) {
      const filePath = path.join(directoryPath, file)

      // Check if it's a .js file
      if (filePath.endsWith(".js")) {
        await processFile(filePath)
      }
    }
  } catch (error) {
    console.error(`Error reading directory: ${directoryPath}`, error)
  }
}

// Start processing the directory
processDirectory(directoryPath)
