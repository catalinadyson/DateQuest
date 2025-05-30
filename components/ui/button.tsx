import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-datequest-teal-500 text-black",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border-2 border-datequest-teal-200 bg-white text-datequest-teal-700",
        secondary: "bg-secondary text-secondary-foreground",
        ghost: "bg-datequest-teal-500 text-black",
        link: "text-datequest-teal-600 underline-offset-4 hover:underline",
        quest: "bg-datequest-teal-500 text-black border-2 border-datequest-teal-700 font-bold",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        style={{ opacity: 1 }} // Force full opacity
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
