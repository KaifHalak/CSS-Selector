import React, { useEffect, useState, createContext } from "react"

import MenuBar from "./components/menubar/MenuBar"
import StylesText from "./components/StylesText"
import Draggable from "react-draggable"

import { main } from "../../src/contentScript"

// npx shadcn@latest add button
// radial-gradient(circle at 50% 125%, #171212, #302730, #3e3e47)

// bg-[#434343]/30

export const CopyHTMLContext = createContext()

export default function App({ UIdoc }) {
  const [styleValues, setStyleValues] = useState({})

  // Copy HTML
  

  const onClickCopy = () => {

    const payload = {
      isHTML,
      isIncludeChildren
    }



  }

  useEffect(() => {
    let UIFunctions = {
      setStyleValues,
      getUIDoc: () => {
        return UIdoc
      },
    }

    main(UIFunctions)
  }, [])

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
        <div className="w-full handler z-[999999] items-center justify-center flex ">
          <img
            src="assets/handle-icon.svg"
            draggable="false"
            alt="handle to move the popup"
          />
        </div>

        <CopyHTMLContext.Provider value={""}>
          <MenuBar />
        </CopyHTMLContext.Provider>

        <StylesText {...styleValues} />
      </div>
    </Draggable>
  )
}
