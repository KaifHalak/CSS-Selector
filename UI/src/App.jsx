import { useRef } from "react"
import Draggable from "react-draggable"
import "./App.css"

function App() {
  const nodeRef = useRef(null)

  return (
    <>
      <Draggable nodeRef={nodeRef}>
        <div ref={nodeRef} className="p-5 bg-blue-600 w-fit">
          I can now be moved around!
        </div>
      </Draggable>

    </>
  )
}

export default App
