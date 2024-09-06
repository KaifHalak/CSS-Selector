import React, { useState } from "react"

import MenuBar from "./components/menubar/MenuBar"
import StylesText from "./components/StylesText"
import Draggable from "react-draggable"

import { main } from "../../src/contentScript"

// npx shadcn@latest add button
// radial-gradient(circle at 50% 125%, #171212, #302730, #3e3e47)

// bg-[#434343]/30
export default function App({ UIdoc }) {

  const [styleValues, setStyleValues] = useState({})

  let UIFunctions = {
    setStyleValues,
    getUIDoc: () => { return UIdoc }
  }

  main(UIFunctions)

  return (
    <Draggable handle=".handler">
      <div
        className="w-[385px] max-w-[385px] pt-3 px-5 pb-5 rounded-lg bg-main-bg m-auto my-10 font-poppins font-normal fixed z-[999999]"
        style={{
          background:
            "radial-gradient(circle at 50% 125%, #171212, #302730, #3e3e47)",
        }}
      >
        {/* handle */}
        <div className="absolute top-0 left-0 w-full p-3 handler z-[999999]"></div>
        
        <MenuBar />
        <StylesText {...styleValues}/>
      </div>
    </Draggable>
  )
}
