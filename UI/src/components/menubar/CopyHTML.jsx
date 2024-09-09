import React, { useState, useContext, useEffect } from "react"
import { MenubarContent, MenubarMenu, MenubarTrigger } from "../shadcn/menubar"

import { Toggle } from "../shadcn/toggle"
import { Button } from "../shadcn/button"

import { TOGGLE_PROPS } from "./commonValues"
import {
  CopyElement,
  SendMessageToBackground,
} from "../../../../src/contentScript"

export default function CopyHTML({ options }) {
  const [isHTML, setIsHTML] = useState(true)
  const [isIncludeChildren, setIsIncludeChildren] = useState(false)

  useEffect(() => {
    if (!options) {
      return
    }

    setIsHTML(options.isHTML)
    setIsIncludeChildren(options.isIncludeChildren)
  }, [options])

  const updateStorage = (data) => {
    SendMessageToBackground("update-copyHTML", data)
  }

  const customSetIsJSX = () => {

    if (!isHTML){
      return
    }

    updateStorage({ isHTML: false, isIncludeChildren })
    setIsHTML(false)
  }

  const customSetHTML = () => {
    if (isHTML){
      return
    }

    updateStorage({ isHTML: true, isIncludeChildren })
    setIsHTML(true)
  }

  const customSetIsIncludeChildren = () => {
    updateStorage({ isHTML, isIncludeChildren: !isIncludeChildren })
    setIsIncludeChildren(!isIncludeChildren)
  }

  const onClickCopy = () => {
    CopyElement(isHTML, isIncludeChildren)
  }

  const copyBtnProps = {
    size: "sm",
    className: "w-full",
    variant: "custom",
    onClick: onClickCopy,
  }

  return (
    <MenubarMenu>
      <MenubarTrigger>Copy HTML</MenubarTrigger>
      <MenubarContent>
        <div className="space-y-1">
          <div className="flex space-x-1">
            <Toggle
              pressed={isHTML}
              onPressedChange={customSetHTML}
              {...TOGGLE_PROPS}
            >
              HTML
            </Toggle>

            <Toggle
              pressed={!isHTML}
              onPressedChange={customSetIsJSX}
              {...TOGGLE_PROPS}
            >
              JSX
            </Toggle>
          </div>

          <Toggle
            pressed={isIncludeChildren}
            onPressedChange={customSetIsIncludeChildren}
            {...TOGGLE_PROPS}
          >
            Include Children
          </Toggle>

          <Button {...copyBtnProps}>Copy</Button>
        </div>
      </MenubarContent>
    </MenubarMenu>
  )
}
