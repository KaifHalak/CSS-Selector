export default function CopyToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    () => {
      console.log("Text copied to clipboard successfully!")
      console.log(text)
    },
    (err) => {
      console.error("Failed to copy text: ", err)
    }
  )
}
