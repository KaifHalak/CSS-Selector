import React from "react"

import MenuBar from "./components/menubar/MenuBar"
import StylesText from "./components/StylesText"
import { ThemeProvider } from "./components/shadcn/themeProvider.jsx"

// npx shadcn@latest add button

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="w-[375px] p-1 bg-card  m-auto my-10 ">
        <MenuBar />
        <StylesText />
      </div>
    </ThemeProvider>
  )
}
