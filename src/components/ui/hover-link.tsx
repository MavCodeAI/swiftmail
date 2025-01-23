import * as React from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface HoverLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  children: React.ReactNode
  className?: string
}

export const HoverLink = React.forwardRef<HTMLAnchorElement, HoverLinkProps>(
  ({ className, children, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)

    return (
      <motion.div
        className="relative"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Link
          ref={ref}
          className={cn(
            "relative inline-block py-1 px-2 text-foreground/90 transition-colors hover:text-foreground/100",
            className
          )}
          {...props}
        >
          {children}
          <motion.span
            className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-violet-500 to-cyan-500"
            animate={{
              width: isHovered ? "100%" : "0%",
            }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 30,
            }}
          />
        </Link>
        {isHovered && (
          <motion.div
            className="absolute -inset-1 -z-10 rounded-lg bg-gradient-to-r from-violet-500/20 to-cyan-500/20 blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.div>
    )
  }
)
HoverLink.displayName = "HoverLink"
