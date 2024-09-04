import React from "react"

export default function StylesText() {
  const TW =
    "items-center h-14 box-border flex max-w-screen-2xl border-zinc-800 px-4 border-solid border-0"
  const CSSObject = {
    "align-items": "center",
    height: "56px",
    "box-sizing": "border-box",
    display: "flex",
    "max-width": "1536px",
    "border-color": "rgb(39, 39, 42)",
    "border-style": "solid",
    "border-width": "0px",
    "padding-right": "16px",
    "padding-left": "16px",
  }

  let css = ""

  Object.entries(CSSObject).forEach((key, value) => {
    css += `${key}: ${value}; \n`
  })

  let commonPtagStyles =
    "items-center w-full p-2 rounded-lg text-sm font-medium leading-6  whitespace-pre-wrap bg-stylingText-bg border-b-2" 

  let commonContainerStyles = "space-y-1"

  let titleStyles = "text-base font-semibold"

  return (
    <>
      <div className="w-full pt-3 space-y-3 text-white ">
        
        <div className={commonContainerStyles}>
          <span className={titleStyles}>Tailwind</span>
          <p className={commonPtagStyles + " max-h-[120px]"}>{TW}</p>
        </div>

        <div className={commonContainerStyles}>
          <span className={titleStyles}>CSS</span>
          <div className={commonPtagStyles + " max-h-[340px]"}>
            <p>{css}</p>
          </div>
        </div>
      </div>
    </>
  )
}
