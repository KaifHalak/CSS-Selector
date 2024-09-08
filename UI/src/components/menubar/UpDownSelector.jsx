import React from "react"
import { MenubarMenu } from "../shadcn/menubar"
import { Button } from "../shadcn/button"

import { GoUpSelector, GoDownSelector } from "../../../../src/contentScript"

export default function UpDownSelector() {
  return (
    <MenubarMenu>
      <div className="flex justify-center flex-grow space-x-1">
        <Button variant="custom" size="xs" onClick={GoUpSelector}>
          <img
            src="assets/menubar/up-arrow-head.svg"
            alt="go up the selector"
          />
        </Button>

        <Button variant="custom" size="xs" onClick={GoDownSelector}>
          <img
            src="assets/menubar/down-arrow-head.svg"
            alt="go down the selector"
          />
        </Button>
      </div>
    </MenubarMenu>
  )
}
