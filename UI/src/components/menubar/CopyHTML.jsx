import React, { useState } from "react"
import { MenubarContent, MenubarMenu, MenubarTrigger } from "../shadcn/menubar"

import { Toggle } from "../shadcn/toggle"
import { Button } from "../shadcn/button"
import { Separator } from "../shadcn/separator"

import { TOGGLE_PROPS } from "./commonValues"

export default function CopyHTML() {
  const [isHTML, setIsHTML] = useState(true)
  const [isIncludeChildren, setIsIncludeChildren] = useState(false)

  const customSetIsJSX = () => {
    setIsHTML(false)
  }

  const customSetHTML = () => {
    setIsHTML(true)
  }

  const copyBtnProps = {
    size: "sm",
    className: "w-full",
    variant: "custom",
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

          <Separator />

          <Toggle
            isPressed={isIncludeChildren}
            onPressedChange={setIsIncludeChildren}
            {...TOGGLE_PROPS}
          >
            Include Children
          </Toggle>

          <Separator />

          <Button {...copyBtnProps}>Copy</Button>
        </div>
      </MenubarContent>
    </MenubarMenu>
  )
}
