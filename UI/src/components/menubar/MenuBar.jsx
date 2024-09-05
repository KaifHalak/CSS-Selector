import React from "react"
import { Menubar } from "../shadcn/menubar"

import CopyHTML from "./CopyHTML"
import TW from "./TW"
import UpDownSelector from "./UpDownSelector"
import Other from "./Other"

export default function MenuBar() {
  return (
    <>
      <Menubar className="border-b-2">
        <TW />
        <CopyHTML />
        <Other />
        <UpDownSelector />
      </Menubar>
    </>
  )
}
