import React, { useState } from "react"
import {
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "../shadcn/menubar"

import { Toggle } from "../shadcn/toggle"
import { Button } from "../shadcn/button"

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
  }

  const commonPropsCopyHTML = {
    variant: "green",
    size: "sm",
    className: "w-full",
  }

  return (
    <MenubarMenu>
      <MenubarTrigger>Copy HTML</MenubarTrigger>
      <MenubarContent>
        <div className="space-y-1">
          <div className="flex">
            <Toggle
              pressed={isHTML}
              onPressedChange={customSetHTML}
              {...commonPropsCopyHTML}
            >
              HTML
            </Toggle>

            <Toggle
              pressed={!isHTML}
              onPressedChange={customSetIsJSX}
              {...commonPropsCopyHTML}
            >
              JSX
            </Toggle>
          </div>

          <Toggle
            isPressed={isIncludeChildren}
            onPressedChange={setIsIncludeChildren}
            {...commonPropsCopyHTML}
          >
            Include Children
          </Toggle>

          <Button {...copyBtnProps}>Copy</Button>
        </div>
      </MenubarContent>
    </MenubarMenu>
  )
}
