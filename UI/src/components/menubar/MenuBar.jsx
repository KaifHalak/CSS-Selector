import React, { useEffect, useState } from "react"
import { Menubar } from "../shadcn/menubar"

import CopyHTML from "./CopyHTML"
import TW from "./TW"
import UpDownSelector from "./UpDownSelector"
import Other from "./Other"
import { SendMessageToBackground } from "../../../../src/contentScript"

// TODO: useState does not take in the default values

export default function MenuBar() {
  const [options, setOptions] = useState({})

  useEffect(async () => {
    let response = await SendMessageToBackground("get-options")
    setOptions(response)
  }, [])

  let copyHTMLOptions = options.copyHTML
  let otherOptions = options.other

  return (
    <>
      <Menubar className="border-b-2">
        <TW />
        <CopyHTML {...{ options: copyHTMLOptions }} />
        <Other {...{ options: otherOptions }} />
        <UpDownSelector />
      </Menubar>
    </>
  )
}
