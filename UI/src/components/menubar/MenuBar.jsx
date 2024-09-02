import React from "react"
import { Menubar } from "../shadcn/menubar"

import CopyHTML from "./CopyHTML"
import TW from "./TW"

export default function MenuBar() {
  return (
    <>
      <Menubar>
        <TW />
        <CopyHTML />
      </Menubar>
    </>
  )
}
