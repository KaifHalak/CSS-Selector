import React, { useState } from "react"

// import { GetElementStyles } from "../../../src/contentScript"

export default function StylesText({ cssObject = {}, tw }) {
  const [isCSSHover, setIsCSSHover] = useState(false)
  const [isTWHover, setIsTWHover] = useState(false)

  let formattedCSS = ""

  Object.entries(cssObject).forEach(([key, value]) => {
    formattedCSS += `${key}: ${value}; \n`
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
            {tw}
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
            {formattedCSS}
          </div>
        </div>
      </div>
    </>
  )
}
