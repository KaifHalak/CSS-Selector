import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./index.css"

let UIdoc = document.createElement("div")
UIdoc.id = "css-selector-root-9524"
UIdoc.style.position = "absolute"
UIdoc.style.top = "10px"
UIdoc.style.maxWidth = "385px"
UIdoc.style.display = "block"
document.body.appendChild(UIdoc)

let menuContainer = document.createElement("div")
menuContainer.id = "data-radix-popper-content-wrapper"
document.body.appendChild(menuContainer)

createRoot(UIdoc).render(
  <StrictMode>
    <App {...{ UIdoc }} />
  </StrictMode>
)
