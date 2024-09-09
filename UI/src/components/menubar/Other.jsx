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
import { SendMessageToBackground } from "../../../../src/contentScript"

// TODO: Store the toggle settings

let storageData = {
  isHex: true,
  isREM: false,
}

function UpdateStorage(data) {
  SendMessageToBackground("update-other", data)
}

function RGBOrHex({ isHex, setIsHex }) {
  const elementStyle = useContext(ElementStylesContext)

  const styleValues = elementStyle[0]
  const setStyleValues = elementStyle[1]

  // let { cssObject, tw } = styleValues

  const customSetIsRGB = () => {
    if (!styleValues || !isHex) {
      return
    }

    let { cssObject, tw } = RGBHexConverter(styleValues, false)

    storageData.isHex = false
    UpdateStorage(storageData)

    setStyleValues({ cssObject, tw })
    setIsHex(false)
  }

  const customSetIsHex = () => {
    if (!styleValues || isHex) {
      return
    }

    storageData.isHex = true
    UpdateStorage(storageData)

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

function DisplayGridLines({ displayGridLines, setdisplayGridLines }) {
  const applyGridLines = () => {
    let styleElement = document.querySelector("#injected-grid-lines-css")

    if (!styleElement) {
      styleElement = document.createElement("style")
      styleElement.id = "injected-grid-lines-css"
      document.head.appendChild(styleElement)
    }

    styleElement.textContent = displayGridLines
      ? `
      *:not(body):not(html):not(#css-selector-root-9524):not(#data-radix-popper-content-wrapper):not(#css-selector-root-9524 *):not(#data-radix-popper-content-wrapper *) {
        border: 1px solid red !important;
      }
    `
      : ``
  }

  const customSetDisplayGridLines = () => {
    setdisplayGridLines(!displayGridLines)
  }

  useEffect(() => {
    applyGridLines()
  }, [displayGridLines])

  return (
    <Toggle
      pressed={displayGridLines}
      onPressedChange={customSetDisplayGridLines}
      {...TOGGLE_PROPS}
    >
      Grid lines
    </Toggle>
  )
}

function PxOrRM({ isREM, setIsREM }) {
  const elementStyle = useContext(ElementStylesContext)

  const styleValues = elementStyle[0]
  const setStyleValues = elementStyle[1]

  let { cssObject, tw } = styleValues

  const customSetIsPx = () => {
    if (!styleValues || !isREM) {
      return
    }

    storageData.isREM = false
    UpdateStorage(storageData)

    cssObject = ConvertRemToPx(cssObject)
    tw = ConvertRemToPx(tw)
    setStyleValues({ cssObject, tw }) // Update context with new values
    setIsREM(false)
  }

  const customSetIsREM = () => {
    if (!styleValues || isREM) {
      return
    }

    storageData.isREM = true
    UpdateStorage(storageData)

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

export default function Other({ options }) {
  // TODO: Is it better to combine these into 1?
  const [isHex, setIsHex] = useState(true)
  const [displayGridLines, setdisplayGridLines] = useState(false)
  const [isREM, setIsREM] = useState(false)

  useEffect(() => {
    if (!options) {
      return
    }

    setIsHex(options.isHex)
    setIsREM(options.isREM)
  }, [options])

  return (
    <MenubarMenu>
      <MenubarTrigger>Other</MenubarTrigger>
      <MenubarContent>
        <div className="space-y-1">
          {/* It will get unmounted when the menu is closed. So the states should be in this function instead */}
          <RGBOrHex {...{ isHex, setIsHex }} />
          <PxOrRM {...{ isREM, setIsREM }} />
          <DisplayGridLines {...{ displayGridLines, setdisplayGridLines }} />
        </div>
      </MenubarContent>
    </MenubarMenu>
  )
}
