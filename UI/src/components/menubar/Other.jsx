import React, { useState, useContext, useEffect } from "react"
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
import { ElementStylesContext } from "@/src/App"
import {
  ConvertPxToRem,
  ConvertRemToPx,
} from "../../../../src/utils/PxRMConversion"

import { RGBHexConverter } from "../../../../src/utils/RGBHexConverter"

// TODO: Store the toggle settings

function RGBOrHex() {
  const elementStyle = useContext(ElementStylesContext)

  const styleValues = elementStyle[0]
  const setStyleValues = elementStyle[1]

  // let { cssObject, tw } = styleValues

  const [isHex, setIsHex] = useState(true)

  const customSetIsRGB = () => {
    if (!styleValues) {
      return
    }

    let { cssObject, tw } = RGBHexConverter(styleValues, false)
    setStyleValues({ cssObject, tw })
    setIsHex(false)
  }

  const customSetIsHex = () => {
    if (!styleValues) {
      return
    }

    let { cssObject, tw } = RGBHexConverter(styleValues, true)
    setStyleValues({ cssObject, tw })
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
  const elementStyle = useContext(ElementStylesContext)

  const styleValues = elementStyle[0]
  const setStyleValues = elementStyle[1]

  let { cssObject, tw } = styleValues

  const [isREM, setIsREM] = useState(false)

  const customSetIsPx = () => {
    if (!styleValues) {
      return
    }

    cssObject = ConvertRemToPx(cssObject)
    tw = ConvertRemToPx(tw)
    setStyleValues({ cssObject, tw }) // Update context with new values
    setIsREM(false)
  }

  const customSetIsREM = () => {
    if (!styleValues) {
      return
    }

    cssObject = ConvertPxToRem(cssObject)
    tw = ConvertPxToRem(tw) // Notice this was wrong before (rem -> rem); updated it
    setStyleValues({ cssObject, tw })

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
