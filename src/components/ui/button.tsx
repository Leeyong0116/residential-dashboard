import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost" | "glass" | "destructive"
    size?: "default" | "sm" | "lg" | "icon"
}

export const getButtonClasses = (variant: string = "default", size: string = "default", className?: string) => {
    return cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50",
        {
            "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/20": variant === "default",
            "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-500/20": variant === "destructive",
            "border border-white/10 bg-white/5 hover:bg-white/10 text-white backdrop-blur-md": variant === "glass",
            "border border-slate-700 bg-transparent hover:bg-slate-800 text-slate-100": variant === "outline",
            "hover:bg-slate-800 hover:text-slate-100 text-slate-300": variant === "ghost",
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-md px-3": size === "sm",
            "h-11 rounded-md px-8": size === "lg",
            "h-10 w-10": size === "icon",
        },
        className
    )
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={getButtonClasses(variant, size, className)}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
