import React from "react"

import MenuBar from "./components/menubar/MenuBar"
import StylesText from "./components/StylesText"

// npx shadcn@latest add button
// radial-gradient(circle at 50% 125%, #171212, #302730, #3e3e47)

// bg-[#434343]/30
export default function App() {
  return (
    <div
      className="w-[375px] p-3 rounded-lg bg-main-bg m-auto my-10 "
      style={{
        background: "-webkit-linear-gradient(to right, #434343, #000000)",
      }}
    >
      <div className="p-1 px-2 rounded ">
        <MenuBar />
        <StylesText />
      </div>
    </div>
  )
}
