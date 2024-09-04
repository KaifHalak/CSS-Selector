import React from "react"

import MenuBar from "./components/menubar/MenuBar"
import StylesText from "./components/StylesText"

// npx shadcn@latest add button

export default function App() {
  return (
    <div className="w-[375px] p-3 rounded-lg bg-main-bg m-auto my-10 ">
      <MenuBar />
      <StylesText />
    </div>
  )
}
