import React from "react"
import {
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
  } from "../shadcn/menubar"

export default function TW() {
  return (
    <MenubarMenu>
      <MenubarTrigger>Tailwind</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>Upload config file</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  )
}
