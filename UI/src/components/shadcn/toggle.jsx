import * as React from "react"
import { useState } from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        selected:
          "bg-transparent text-toggle-unselected-text-color hover:bg-toggle-unselected-hover hover:text-toggle-unselected-text-color   font-poppins data-[state=on]:bg-toggle-selected-bg data-[state=on]:text-toggle-selected-text-color",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// const Toggle = React.forwardRef(
//   ({ className, variant, size, ...props }, ref) => (
//     <TogglePrimitive.Root
//       ref={ref}
//       className={cn(toggleVariants({ variant, size, className }))}
//       {...props}
//     />
//   )
// )

// Custom Logic as default logic breaks on vite build

const Toggle = React.forwardRef(
  ({ className, size, variant, pressed, onPressedChange, ...props }, ref) => {

    const handleClick = () => {
      onPressedChange(!pressed)
    }

    return (
      <button
        {...props}
        ref={ref}
        onClick={handleClick}
        aria-pressed={pressed}
        data-state={pressed ? "on" : "off"}
        className={cn(toggleVariants({ variant, size, className }))}
      >
        {props.children}
      </button>
    )
  }
)

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
