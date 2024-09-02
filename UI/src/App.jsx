import React from "react"

import { Button } from "./components/shadcn/button"
import MenuBar from "./components/menubar/MenuBar"

// npx shadcn@latest add button

export default function App() {
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

  return (
    <div className="w-[375px] p-1 bg-blue-700 m-auto my-10">
      <MenuBar />

      <div className="w-full p-3 bg-purple-600">
        <span>Tailwind</span>
        <div className="items-center w-full p-2 bg-orange-600 max-h-[120px]">
          {TW}
        </div>

        <span>CSS</span>
        <div className="items-center w-full p-2 bg-orange-600 max-h-[340px]">
          <pre>{css}</pre>
        </div>
      </div>
    </div>
  )
}
