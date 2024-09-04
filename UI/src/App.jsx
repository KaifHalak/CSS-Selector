import React from "react"

import MenuBar from "./components/menubar/MenuBar"
import StylesText from "./components/StylesText"

// npx shadcn@latest add button
// radial-gradient(circle at 50% 125%, #171212, #302730, #3e3e47)

// bg-[#434343]/30
export default function App() {
  return (
    <div
      className="w-[385px] pt-3 px-5 pb-5 rounded-lg bg-main-bg m-auto my-10 font-poppins font-normal"
      style={{
        background:
          "radial-gradient(circle at 50% 125%, #171212, #302730, #3e3e47)",
      }}
    >
      <MenuBar />
      <StylesText />
    </div>
  )
}
