import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Button } from "./button"

interface HoverButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  glowColor?: string
}

export const HoverButton = React.forwardRef<HTMLButtonElement, HoverButtonProps>(
  ({ className, children, glowColor = "rgba(147, 51, 234, 0.3)", ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    return (
      <Button
        ref={ref}
        className={cn(
          "relative overflow-hidden bg-background/80 border border-border/50 hover:border-primary/50 transition-colors",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        {isHovered && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 50%)`,
            }}
          />
        )}
        <div className="absolute inset-0 transition-opacity opacity-0 hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-transparent to-cyan-500/10" />
        </div>
      </Button>
    )
  }
)
HoverButton.displayName = "HoverButton"
