import React, { useState } from "react"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "../shadcn/menubar"
import { Toggle } from "../shadcn/toggle"
import { Separator } from "../shadcn/separator"

import { TOGGLE_PROPS } from "./commonValues"

function RGBOrHex() {
  const [isHex, setIsHex] = useState(true)

  const customSetIsRGB = () => {
    setIsHex(false)
  }

  const customSetIsHex = () => {
    setIsHex(true)
  }

  return (
    <div className="space-y-1">
      <div className="flex space-x-1">
        <Toggle
          pressed={isHex}
          onPressedChange={customSetIsHex}
          {...TOGGLE_PROPS}
        >
          Hex
        </Toggle>

        <Toggle
          pressed={!isHex}
          onPressedChange={customSetIsRGB}
          {...TOGGLE_PROPS}
        >
          RGB
        </Toggle>
      </div>
    </div>
  )
}

function DisplayGridLines() {
  const [displayGridLines, setdisplayGridLines] = useState(true)

  return (
    <Toggle
      pressed={displayGridLines}
      onPressedChange={setdisplayGridLines}
      {...TOGGLE_PROPS}
    >
      Grid lines
    </Toggle>
  )
}

function PxOrRM() {
  const [isREM, setIsREM] = useState(true)

  const customSetIsPx = () => {
    setIsREM(false)
  }

  const customSetIsREM = () => {
    setIsREM(true)
  }

  return (
    <div className="space-y-1">
      <div className="flex space-x-1">
        <Toggle
          pressed={isREM}
          onPressedChange={customSetIsREM}
          {...TOGGLE_PROPS}
        >
          rem
        </Toggle>

        <Toggle
          pressed={!isREM}
          onPressedChange={customSetIsPx}
          {...TOGGLE_PROPS}
        >
          px
        </Toggle>
      </div>
    </div>
  )
}

export default function Other() {
  return (
    <MenubarMenu>
      <MenubarTrigger>Other</MenubarTrigger>
      <MenubarContent>
        <div className="space-y-1">
          <RGBOrHex />
          <Separator />
          <PxOrRM />
          <Separator />
          <DisplayGridLines />
        </div>
      </MenubarContent>
    </MenubarMenu>
  )
}
