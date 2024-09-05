import React, { useState } from "react"

export default function StylesText() {
  const [isCSSHover, setIsCSSHover] = useState(false)
  const [isTWHover, setIsTWHover] = useState(false)

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
    "items-center w-full p-2 text-sm font-medium leading-6  whitespace-pre-wrap bg-stylingText-bg font-normal text-xs text-stylingText-text-color rounded rounded-b-none"

  let commonContainerStyles = ""

  let titleStyles = "text-sm font-normal"

  return (
    <>
      <div className="w-full pt-3 space-y-1 text-white">
        <div className={commonContainerStyles}>
          <div className="flex justify-between">
            <span className={titleStyles}>Tailwind</span>

            <button
              className="p-[1px] pointer-cursor hover:bg-menubar-menu-hover rounded"
              onMouseEnter={() => {
                setIsTWHover(true)
              }}
              onMouseLeave={() => {
                setIsTWHover(false)
              }}
            >
              <img src="/assets/stylesText/copy-icon.svg" alt="copy tailwind" />
            </button>
          </div>

          <div
            className={
              commonPtagStyles +
              " max-h-[120px] " +
              (isTWHover ? "bg-menubar-menu-hover" : "")
            }
          >
            {TW}
          </div>
        </div>

        <div className="w-2/5 h-px m-auto bg-white"></div>

        <div className={commonContainerStyles}>
          <div className="flex justify-between">
            <span className={titleStyles}>CSS</span>

            <button
              className="p-[1px] pointer-cursor hover:bg-menubar-menu-hover rounded"
              onMouseEnter={() => {
                setIsCSSHover(true)
              }}
              onMouseLeave={() => {
                setIsCSSHover(false)
              }}
            >
              <img src="/assets/stylesText/copy-icon.svg" alt="copy css" />
            </button>
          </div>

          <div
            className={
              commonPtagStyles +
              " max-h-[340px] border-b-2 " +
              (isCSSHover ? "bg-menubar-menu-hover" : "")
            }
          >
            {css}
          </div>
        </div>
      </div>
    </>
  )
}
