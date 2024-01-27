import { ComponentProps, forwardRef} from "react"
import { cn } from "@renderer/utils"

export const MainContent = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
    ({ className, children, ...props}, ref) => (
        <main {...props} ref={ref} className={cn("overflow-scroll grow", className)} >
            {children}
        </main >
    )
)

MainContent.displayName = 'MainContent'
